import axios from 'axios';
import type { MessagePayload } from '../interfaces/Message'

export const sendMessage = async ( messageData: MessagePayload) => {
  try {
      const response = await axios.post(import.meta.env.VITE_API_URL, messageData,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response;
  } catch (e) {
    console.error("Send Message Services Error:" , e);
  }
}