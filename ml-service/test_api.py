import requests
import sys

def test_api():
    # Use a dummy text file as an image just to see if it hits the exception or returns a valid response
    # We expect Gemini to say "not an animal" or something.
    with open("test_dummy.txt", "w") as f:
        f.write("This is a dummy image content")
        
    url = "http://localhost:8000/analyze"
    with open("test_dummy.txt", "rb") as f:
        files = {"image": ("test_dummy.jpg", f, "image/jpeg")}
        response = requests.post(url, files=files)
        
    print("Status:", response.status_code)
    print("Response:", response.text)

if __name__ == "__main__":
    test_api()
