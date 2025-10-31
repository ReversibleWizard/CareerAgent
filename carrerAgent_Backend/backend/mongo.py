from mongoengine import connect
import os
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/carrer_agent_db")
connect(host=MONGO_URI)
