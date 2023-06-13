import axios from "axios";
const instance = axios.create({
  baseURL: 'https://6b16-36-68-64-156.ngrok-free.app/api',
}); 

export default instance;