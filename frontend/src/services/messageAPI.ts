import axios from 'axios';
import type { MessagePayload } from '../interfaces/Message';
import { getApiUrl } from './config';

export const sendMessage = async ( messageData: MessagePayload ) => {
  try {
      const response = await axios.post(getApiUrl(), messageData,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response;
  } catch (e) {
    console.error("Send Message Services Error:" , e);
  }
}