from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import random
import asyncio

app = FastAPI(title="AgriTech Disease Scanner AI", version="1.0.0")

# Allow CORS since the Node gateway or React frontend will hit this
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to the Node backend IP
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "ML Disease Scanner"}

import os
import json
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

# Initialize Gemini Client dynamically inside the route so we don't need to restart the server
@app.post("/analyze")
async def analyze_image(image: UploadFile = File(...)):
    """
    Real AI Disease Analysis Endpoint using Google Gemini Vision.
    """
    load_dotenv(override=True)
    api_key = os.getenv("GEMINI_API_KEY")
    
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image.")
    
    if not api_key or api_key == "your_gemini_api_key_here":
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY is not configured in the ML service. Please add it to ml-service/.env")

    client = genai.Client(api_key=api_key)

    # Read image bytes
    image_bytes = await image.read()

    prompt = """
    You are an expert veterinary pathologist and AI diagnostic system designed for farmers.
    Analyze this image of livestock/animals for any visible diseases, skin conditions, or abnormalities. 
    
    CRITICAL INSTRUCTIONS:
    1. Provide the ACTUAL real-world diagnosis based on what you see in the pixels. Do not limit yourself to a small list.
    2. Use the COMMON NAME for the disease if one exists (e.g., "Cowpox", "Warts", "Ringworm", "Lumpy Skin Disease") alongside the scientific name, so it is easy to understand.
    3. If the animal looks perfectly clean with no visual defects, diagnose as "Healthy".
    4. Provide a highly accurate confidence score based on the visual evidence.
    
    Respond EXACTLY with a JSON object in this format (no markdown, no backticks, just the JSON):
    {
        "name": "Exact Name of the Disease (or 'Healthy')",
        "confidence": 92.5,
        "severity": "High", // Can be Critical, High, Medium, Low, or None
        "category": "Cattle", // e.g., Cattle, Poultry, Pig, General
        "description": "2-3 sentences explaining exactly what visual symptoms you detected in the image to arrive at this diagnosis.",
        "treatment": "2-3 sentences suggesting immediate practical veterinary action or biosecurity measures.",
        "isHealthy": false // true if healthy, false if disease detected
    }
    """

    try:
        # We pass the image bytes and mime type to Gemini
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[
                types.Part.from_bytes(data=image_bytes, mime_type=image.content_type),
                prompt
            ]
        )
        
        # Clean the response text (Gemini sometimes wraps JSON in markdown blocks)
        result_text = response.text.strip()
        if result_text.startswith("```json"):
            result_text = result_text[7:]
        if result_text.startswith("```"):
            result_text = result_text[3:]
        if result_text.endswith("```"):
            result_text = result_text[:-3]
            
        result_json = json.loads(result_text.strip())

        return {
            "success": True,
            "data": result_json
        }

    except Exception as e:
        print("Gemini API Error:", str(e))
        # Fallback if Gemini fails or returns invalid JSON
        return {
            "success": False,
            "message": f"AI Analysis failed: {str(e)}"
        }
