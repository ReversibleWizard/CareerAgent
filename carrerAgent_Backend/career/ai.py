# ai.py
import os
import json
from openai import OpenAI

# Initialize client with Hugging Face router
client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.getenv("HF_TOKEN"),
)

def generate_ai_roadmap(user_id, career_name, reference_content=None, preferences={}):
    """
    Generate a personalized roadmap using LLaMA 4 Scout via Hugging Face OpenAI-compatible API.
    Returns a dict with roadmap steps.
    """
    # Prepare user text
    if reference_content:
        steps_text = json.dumps(reference_content.get("steps", {}))
        if steps_text == "{}":
            steps_text = "No steps available in reference."
        user_text = (
            f"Career: {career_name}.\n"
            f"Reference roadmap steps: {steps_text}\n"
            f"Personalize according to user preferences: {json.dumps(preferences)}\n"
            "Return a structured JSON roadmap with steps."
        )
    else:
        user_text = (
            f"Career: {career_name}.\n"
            "No reference roadmap is available.\n"
            f"Personalize according to user preferences: {json.dumps(preferences)}\n"
            "Return a structured JSON roadmap with steps."
        )

    messages = [
        {"role": "system", "content": "You are an expert career mentor. Respond in JSON format only."},
        {"role": "user", "content": user_text},
    ]

    try:
        completion = client.chat.completions.create(
            model="meta-llama/Llama-4-Scout-17B-16E-Instruct",
            messages=messages,
            max_tokens=512,
            temperature=0.7,
        )

        ai_message = completion.choices[0].message.content

        # Parse JSON safely
        try:
            roadmap_dict = json.loads(ai_message)
        except json.JSONDecodeError:
            roadmap_dict = {"steps": {"Step 1": ai_message}}

        return roadmap_dict

    except Exception as e:
        print("❌ Hugging Face API error:", e)
        return {"steps": {"Step 1": "AI generation failed, try again."}}
