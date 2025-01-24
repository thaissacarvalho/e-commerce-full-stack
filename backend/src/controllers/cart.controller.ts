import { Request, Response } from 'express';
import Cart from '../models/cart.model';
import { CartService } from '../services/cart.service';

export class CartController {

  private cartService: CartService;

  constructor() {
    this.cartService = new CartService();
  }

  async createCart(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      const createCart = await this.cartService.createCart(userId);

      res.status(201).json(createCart);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async addItemToCart(req: Request, res: Response) {
    try {
      const { userId, productId, quantity } = req.body;
      const updatedCart = await this.cartService.addToCart(userId, productId, quantity);
      res.status(200).json(updatedCart);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getCart(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const cart = await Cart.findOne({ userId: userId }).populate('items.productId');
      if (!cart) {
        res.status(404).json({ message: 'Cart not found' });
        return;
      }
      res.status(200).json(cart);
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
  };

  async getCartByUserId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: 'ID is required' });
        return;
      }

      const cartId = await this.cartService.getCartByUserId(id);

      if (!cartId) {
        res.status(404).json({ message: 'Cart not found' });
        return;
      }

      res.status(200).json(cartId);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateCartItem(req: Request, res: Response): Promise<void> {
    try {
      const { userId, productId } = req.params;
      const { quantity } = req.body;
  
      const updatedCart = await this.cartService.updateCartItemQuantity(userId, productId, quantity);
  
      res.status(200).json(updatedCart);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Cart not found' || error.message === 'Item not found in cart') {
          res.status(404).json(error.message); // Alterado para retornar 404 nesses casos
          return;
        }
        res.status(500).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }  

  async removeFromCart(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { productId } = req.body;
  
      const cart = await this.cartService.removeFromCart(id, productId);
  
      if (!cart) {
        res.status(404).json({ error: 'Item not found' }); // Retorno correto para item não encontrado
        return;
      }
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Item not found in cart') {
          res.status(404).json({ error: error.message }); // Alterado para status 404
          return;
        }
        res.status(500).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }  
}