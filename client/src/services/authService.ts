import axios from './api';

interface LoginDTO {
  email: string;
  password: string;
}

interface RegisterDTO {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  username: string;
  email: string;
  password: string;
  profileImageUrl?: string;
}

const login = async (credentials: LoginDTO) => {
  const res = await axios.post('/auth/login', credentials);
  localStorage.setItem('token', res.data.token);
};

const register = async (credentials: RegisterDTO) => {
  await axios.post('/auth/register', credentials);
};

export default { login, register };
