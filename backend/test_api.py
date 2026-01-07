import requests
import json

try:
    # 1. Health Check
    print("Testing / (Health Check)...")
    r = requests.get("http://127.0.0.1:8005/")
    print(f"Status: {r.status_code}")
    print(f"Response: {r.json()}")
    
    # 2. Translation Check
    print("\nTesting /translate (Translation)...")
    payload = {
        "text": "Hello friend",
        "source_lang": "en",
        "target_lang": "es"
    }
    r = requests.post("http://127.0.0.1:8005/translate", json=payload)
    print(f"Status: {r.status_code}")
    print(f"Response: {r.json()}")

except Exception as e:
    print(f"\nFailed to connect: {e}")
