import { Request, Response } from 'express';
import Cart from '../models/cart.model';
import { addToCart } from '../services/cart.service';

export const getCart = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }
    res.status(200).json(cart);
    return;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message) {
        return;
      }
      res.status(500).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};

export const addItemToCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;
    const updatedCart = await addToCart(userId, productId, quantity); 
    res.status(200).json(updatedCart);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message) {
        return;
      }
      res.status(500).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};
