import axios from "axios";
const instance = axios.create({
  baseURL: 'https://122c-114-10-10-154.ngrok-free.app/api',
});

export default instance;