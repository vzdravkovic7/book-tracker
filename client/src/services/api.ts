import axios from "axios";
import { getApiBaseUrl } from "../utils/getApiBaseUrl";

const instance = axios.create({
  baseURL: getApiBaseUrl(),
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
