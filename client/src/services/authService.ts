import type { LoginDTO } from '../types';
import axios from './api';

const login = async (credentials: LoginDTO) => {
  const res = await axios.post('/auth/login', credentials);
  localStorage.setItem('token', res.data.token);
};

const registerFormData = async (data: FormData) => {
  await axios.post("/auth/register", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export default { login, registerFormData };
