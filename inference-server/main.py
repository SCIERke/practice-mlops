from fastapi import FastAPI
from contextlib import asynccontextmanager
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware
import torch
from schemas.emotion import PredictRequest

model = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global model
    print("🔥 Loading model...")
    model = pipeline("text-classification", model="boltuix/bert-emotion")
    yield
    print("💤 Shutting down...")

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

@app.post("/predict" , status_code=200)
async def predict(req: PredictRequest):
    return model(req.content)