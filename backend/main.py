from fastapi import FastAPI
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from schemas.chat import MessagePayload ,MessageResponse
from services.inference import get_inference

load_dotenv()
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

@app.get("/health-check")
def show_health_status():
  return {"status": "Yeah Yeah, It's working!"}

@app.post("/message", response_model=MessageResponse, status_code=201)
async def create_message(message_payload: MessagePayload):
    print(f"Received content: {message_payload.content}")
    return await get_inference(message_payload.content)

# @app.post("/message", response_model=MessageResponse, status_code=201)
# async def create_message(message_payload: MessagePayload):
#     print(f"Received content: {message_payload.content}")
#     print(f"Sending request to: {INFERENCE_URL}")

#     data = {"content": message_payload.content}

#     async with httpx.AsyncClient() as client:
#         try:
#             response = await client.post(INFERENCE_URL, json=data, timeout=10.0)
#             response.raise_for_status()
#         except httpx.HTTPStatusError as exc:
#             return MessageResponse(
#                 id=str(uuid.uuid4()),
#                 role="system",
#                 error=f"Error response {exc.response.status_code}: {exc.response.text}"
#             )
#         except httpx.RequestError as exc:
#             return MessageResponse(
#                 id=str(uuid.uuid4()),
#                 role="system",
#                 error=f"Request error: {str(exc)}"
#             )

#     try:
#         data = response.json()
#     except Exception:
#         return MessageResponse(
#             id=str(uuid.uuid4()),
#             role="system",
#             error="Invalid JSON response from inference server"
#         )

#     if not isinstance(data, list) or len(data) == 0 or "label" not in data[0]:
#         return MessageResponse(
#             id=str(uuid.uuid4()),
#             role="system",
#             error="Malformed response data"
#         )

#     label = data[0]["label"]

#     return MessageResponse(
#         id=str(uuid.uuid4()),
#         role="system",
#         content=label
#     )
