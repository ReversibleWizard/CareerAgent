from mongoengine import Document, StringField, DictField, ReferenceField, DateTimeField
from datetime import datetime


class RoadmapReference(Document):
    name = StringField(required=True, unique=True)
    content = DictField()  # structured steps
    source_url = StringField()
    created_at = DateTimeField(default=datetime.utcnow)


class CareerRoadmap(Document):
    user_id = StringField(required=True)
    career_name = StringField(required=True)
    roadmap = DictField()
    reference = ReferenceField(RoadmapReference)
    preferences = DictField()  # store user preferences
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
