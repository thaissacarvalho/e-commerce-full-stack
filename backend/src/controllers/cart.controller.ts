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
        if (error.message) {
          return;
        }
        res.status(500).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
  }

  async addItemToCart(req: Request, res: Response) {
    try {
      const { userId, productId, quantity } = req.body;
      const updatedCart = await this.cartService.addToCart(userId, productId, quantity);
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

  async getCartByUserId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'ID is required' })
        return;
      }

      const cartId = await this.cartService.getCartByUserId(id);

      res.status(200).json(cartId);
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
  }
  
  async updateCartItem(req: Request, res: Response): Promise<void> {
    try {
      const { userId, productId } = req.params;
      const { quantity } = req.body;

      const updatedCart = await this.cartService.updateCartItemQuantity(userId, productId, quantity);

      res.status(200).json(updatedCart);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message) {
          res.status(401).json(error.message);
          return;
        }
        res.status(500).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
  }

  async removeFromCart(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { productId } = req.body;

      const cart = await this.cartService.removeFromCart(id, productId);

      if (cart === null || cart === undefined) {
        res.status(404).json({ error: 'Item not found' });
        return;
      }
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message) {
          res.status(401).json(error.message);
          return;
        }
        res.status(500).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
  }

}