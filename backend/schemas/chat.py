from pydantic import BaseModel

class Message(BaseModel):
  id: str
  role: str
  content: str

class MessagePayload(Message):
  userId: str