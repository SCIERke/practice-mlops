export interface Message {
   id: string,
   role: string,
   content: string
}

export interface MessagePayload extends Message  {
   userId: string,
}