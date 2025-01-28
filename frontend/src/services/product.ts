import api from './api';
import { Product } from '../types/product'; 
import { AxiosError } from 'axios';

export const getAllProducts = async () => {
  try {
    const response = await api.get('/products/all');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar produto');
    } else {
      throw new Error('Erro desconhecido');
    } 
  }
};

export const createProduct = async (product: Product) => {
  try {
    const response = await api.post('/products/register', product);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Erro ao criar produto');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};

export const getProductById = async (_id: string) => {
  try {
    const response = await api.get(`/products/${_id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar produto por ID.');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};

export const updateProduct = async (id: string, product: Product) => {
  try {
    const response = await api.patch(`/products/edit/${id}`, product);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar produto');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await api.delete(`/products/delete/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Erro ao deletar produto');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};