from django.urls import path
from .views import CareerRoadmapView

urlpatterns = [
    path('roadmap/<path:career_name>/', CareerRoadmapView.as_view(), name='career_roadmap'),
]
