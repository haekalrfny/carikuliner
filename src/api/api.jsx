import axios from "axios";
const instance = axios.create({
  baseURL: 'https://carikuliner.muhammadiyahexpo.com/api',
}); 

export default instance;