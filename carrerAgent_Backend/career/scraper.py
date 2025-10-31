# scraper.py
import requests
from bs4 import BeautifulSoup


def scrape_roadmap(career_name):
    """
    Scrape roadmap.sh for the given career name.
    Returns a dict with steps and source_url.
    """
    try:
        # Prepare URL format (replace spaces with hyphens)
        career_slug = career_name.lower().replace(" ", "-")
        url = f"https://roadmap.sh/{career_slug}"

        response = requests.get(url)
        if response.status_code != 200:
            print(f"Failed to fetch roadmap: {url}")
            return None

        soup = BeautifulSoup(response.text, "html.parser")

        # Find all roadmap steps (example selector, adjust if HTML changes)
        steps = {}
        step_nodes = soup.find_all("li")  # roadmap.sh uses <li> for steps
        for i, node in enumerate(step_nodes, start=1):
            text = node.get_text(strip=True)
            if text:
                steps[f"Step {i}"] = text

        if not steps:
            # fallback if no steps found
            steps = {"Step 1": "Use online resources to learn fundamentals of this career."}

        return {
            "name": career_name,
            "steps": steps,
            "source_url": url
        }

    except Exception as e:
        print("Error scraping roadmap.sh:", e)
        return None
