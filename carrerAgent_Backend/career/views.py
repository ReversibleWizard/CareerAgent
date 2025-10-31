import json
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import CareerRoadmap, RoadmapReference
from .ai import generate_ai_roadmap
from .scraper import scrape_roadmap  # your scraper function


class CareerRoadmapView(APIView):
    def get(self, request, career_name):
        user = request.user
        # Get user preferences from query params
        preferences = request.GET.get("preferences", "{}")
        try:
            preferences = json.loads(preferences)
        except json.JSONDecodeError:
            preferences = {}

        # 1️⃣ Check if user already has this roadmap
        roadmap_obj = CareerRoadmap.objects.filter(user=user, career_name=career_name).first()
        if roadmap_obj:
            return Response({
                "roadmap": {
                    "name": career_name,
                    "steps": roadmap_obj.roadmap,
                    "source_url": roadmap_obj.reference.source_url if roadmap_obj.reference else None,
                    "personalized_for": str(user.id)
                },
                "source": "user_db"
            })

        # 2️⃣ Check if a reference roadmap exists
        reference = RoadmapReference.objects.filter(name__iexact=career_name).first()
        if reference:
            reference_content = reference.content
        else:
            # 3️⃣ Scrape roadmap.sh if no reference
            try:
                reference_content = scrape_roadmap(career_name)
                reference = None  # don't create reference yet; can create later if needed
            except Exception:
                reference_content = None

        # 4️⃣ Generate roadmap using AI
        ai_roadmap = generate_ai_roadmap(
            user_id=user.id,
            career_name=career_name,
            reference_content=reference_content,
            preferences=preferences
        )

        # 5️⃣ Save generated roadmap to DB
        roadmap_obj = CareerRoadmap.objects.create(
            user=user,
            career_name=career_name,
            roadmap=ai_roadmap.get("steps", {}),
            reference=reference
        )

        return Response({
            "roadmap": {
                "name": career_name,
                "steps": ai_roadmap.get("steps", {}),
                "source_url": reference.source_url if reference else None,
                "personalized_for": str(user.id)
            },
            "source": "ai_generated"
        })
