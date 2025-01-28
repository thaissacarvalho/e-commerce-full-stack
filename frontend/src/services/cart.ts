import api from './api';
import { CartItemPopulated } from '../types/cart';
import { AxiosError } from 'axios';

export const createCart = async (userId: string) => {
  try {
    const response = await api.post('/carts/create-cart', { userId });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Erro ao criar carrinho');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};

export const addItemToCart = async (userId: string, item: CartItemPopulated) => {
  try {
    const response = await api.post('/carts/add-item', { userId, item });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Erro ao adicionar item ao carrinho');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};

export const getCartByUserId = async (userId: string) => {
  try {
    const response = await api.get(`/carts/${userId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar carrinho');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};

export const editCartItem = async (userId: string, item: CartItemPopulated) => {
  try {
    const response = await api.patch(`/carts/edit-cart-item`, { userId, item });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Erro ao editar item do carrinho');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};

export const clearCart = async (userId: string) => {
  try {
    const response = await api.delete(`/carts/clear-cart/${userId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Erro ao limpar carrinho');
    } else {
      throw new Error('Erro desconhecido');
    }
  }
};
