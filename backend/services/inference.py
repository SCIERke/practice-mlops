import httpx
import uuid
from schemas.chat import MessageResponse
import os

INFERENCE_URL = os.getenv("INFERENCE_URL")

async def get_inference(content: str) -> MessageResponse:
    data = {"content": content}

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(INFERENCE_URL, json=data, timeout=10.0)
            response.raise_for_status()
        except httpx.HTTPStatusError as exc:
            return MessageResponse(
                id=str(uuid.uuid4()),
                role="system",
                error=f"Error response {exc.response.status_code}: {exc.response.text}"
            )
        except httpx.RequestError as exc:
            return MessageResponse(
                id=str(uuid.uuid4()),
                role="system",
                error=f"Request error: {str(exc)}"
            )

    try:
        response_data = response.json()
    except Exception:
        return MessageResponse(
            id=str(uuid.uuid4()),
            role="system",
            error="Invalid JSON response from inference server"
        )

    if not isinstance(response_data, list) or len(response_data) == 0 or "label" not in response_data[0]:
        return MessageResponse(
            id=str(uuid.uuid4()),
            role="system",
            error="Malformed response data"
        )

    return MessageResponse(
        id=str(uuid.uuid4()),
        role="system",
        content=response_data[0]["label"]
    )
