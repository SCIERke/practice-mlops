from fastapi import FastAPI
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

from schemas.chat import MessagePayload

load_dotenv()
DEVICE = os.getenv('DEVICE', 'cpu').lower()
MODEL_NAME = os.getenv("MODEL_NAME" ,"Qwen/Qwen3-1.7B-Base")
CACHE_DIR = os.getenv("CACHE_DIR" , "./models")

if DEVICE not in ['cpu', 'cuda']:
    DEVICE = 'cpu'

model_bundle = {}

app = FastAPI()

"""
  DEV ONLY
"""

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

"""
  DEV ONLY
"""

@app.get("/health-check") # need to add response model
def show_health_status():
  return {"status": "Yeah Yeah, It's working!"}

@app.post("/message") # need to add response model
def create_message(message_payload: MessagePayload):
  messages = [
      {"role": "user", "content": message_payload.content},
  ]
  return {"message": "outputs_decode"}