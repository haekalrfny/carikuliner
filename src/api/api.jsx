import axios from "axios";
const instance = axios.create({
  baseURL: 'https://0e3f-2001-448a-404b-1e88-b049-76a8-c1c8-a622.ngrok-free.app/api',
}); 

export default instance;