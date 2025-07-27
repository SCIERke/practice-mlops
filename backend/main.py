from fastapi import FastAPI
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

from schemas.chat import MessagePayload
from load_model import load_model

load_dotenv()
DEVICE = os.getenv('DEVICE', 'cpu').lower()
MODEL_NAME = os.getenv("MODEL_NAME" ,"Qwen/Qwen3-1.7B-Base")
CACHE_DIR = os.getenv("CACHE_DIR" , "./models")

if DEVICE not in ['cpu', 'cuda']:
    DEVICE = 'cpu'

model_bundle = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
      model_bundle["model"] ,model_bundle["tokenizer"] = await load_model(MODEL_NAME , CACHE_DIR, DEVICE)
    except Exception as e:
      print(f"Error loading model: {e}")
      raise e
    print(f"Model and tokenizer loaded on {DEVICE}")
    yield
    print("Cleaning up model...")
    model_bundle.clear()

app = FastAPI(lifespan=lifespan)


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
  inputs = model_bundle['tokenizer'].apply_chat_template(
    messages,
    add_generation_prompt=True,
    tokenize=True,
    return_dict=True,
    return_tensors="pt",
  ).to(model_bundle['model'].device)

  inputs = {k: v.to(model_bundle['model'].device) for k, v in inputs.items()}

  outputs = model_bundle['model'].generate(
    **inputs,
    max_new_tokens=40,
    pad_token_id=model_bundle['tokenizer'].pad_token_id or model_bundle['tokenizer'].eos_token_id
    )
  outputs_decode = model_bundle['tokenizer'].decode(outputs[0][inputs["input_ids"].shape[-1]:])
  return {"message": outputs_decode}