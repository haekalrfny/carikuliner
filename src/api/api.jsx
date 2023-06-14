import axios from "axios";
const instance = axios.create({
  baseURL: 'https://1907-2001-448a-404b-1e88-63a8-9ce5-f9b-30a5.ngrok-free.app/api',
}); 

export default instance;