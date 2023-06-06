import axios from "axios";
const instance = axios.create({
  baseURL: 'https://ace0-2001-448a-4041-6d4e-d824-b5cf-5077-2207.ngrok-free.app/api',
});

export default instance;