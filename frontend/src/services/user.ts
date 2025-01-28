import api from './api';
import { User } from '../types/user';
import { AxiosError } from 'axios';

export const registerUser = async (user: User) => {
  try {
    const response = await api.post('/users/register', user);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Erro ao criar usuário');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};

export const updateUser = async (id: string, user: User) => {
  try {
    const response = await api.patch(`/users/update/${id}`, user);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar usuário');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await api.delete(`/users/delete/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Erro ao deletar usuário');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};
