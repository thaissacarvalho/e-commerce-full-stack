import { AxiosError } from 'axios';
import api from './api';

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Erro ao logar usuário');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};
