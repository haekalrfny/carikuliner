import axios from "axios";
const instance = axios.create({
  baseURL: 'https://aeca-2001-448a-4041-6d4e-4b2-e912-b3b8-f721.ngrok-free.app/api',
}); 

export default instance;