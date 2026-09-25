import httpx
import logging
from typing import Dict, Any

class OpenFDAClient:
    """
    Client for interacting with the FDA's openFDA API to fetch FAERS 
    (FDA Adverse Event Reporting System) data for specific drugs.
    """
    BASE_URL = "https://api.fda.gov/drug/event.json"

    def __init__(self, api_key: str = None):
        self.api_key = api_key

    async def get_drug_adverse_events(self, drug_name: str, limit: int = 5) -> Dict[str, Any]:
        """
        Queries the FAERS database to find the most commonly reported 
        adverse events for a specific drug.
        """
        # Note: openFDA API limits query strings, we use count to get aggregate frequencies
        query_url = f"{self.BASE_URL}?search=patient.drug.medicinalproduct:{drug_name}&count=patient.reaction.reactionmeddrapt.exact&limit={limit}"
        
        headers = {}
        if self.api_key:
            headers['Authorization'] = f'Bearer {self.api_key}'

        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(query_url, headers=headers)
                response.raise_for_status()
                data = response.json()
                
                # Format the response
                results = []
                for item in data.get('results', []):
                    results.append({
                        "event_term": item.get('term'),
                        "report_count": item.get('count')
                    })
                
                return {
                    "drug": drug_name,
                    "top_adverse_events": results
                }
                
        except httpx.HTTPStatusError as e:
            logging.error(f"openFDA API Error: {e.response.status_code} - {e.response.text}")
            return {"error": "Failed to fetch data from openFDA", "details": str(e)}
        except Exception as e:
            logging.error(f"Error querying openFDA: {str(e)}")
            return {"error": "Internal Client Error"}

fda_client = OpenFDAClient()
