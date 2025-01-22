import mongoose from 'mongoose';
import Cart, { ICart } from '../models/cart.model';
import { IProduct } from '../models/product.model';

export class CartService {
  async createCart(userId: string): Promise<ICart> {
    const newCart = new Cart({
      userId,
      items: [],
    });

    await newCart.save();
    return newCart;
  }

  async getCartByUserId(userId: string): Promise<ICart | null> {
    return Cart.findOne({ userId }).populate('items.productId');
  }

  async addToCart(userId: string, productId: string, quantity: number): Promise<ICart | null> {
    const cart = await Cart.findOne({ userId });

    if (!cart) throw new Error('Cart not found');

    const objectIdProduct = new mongoose.Types.ObjectId(productId);

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === objectIdProduct.toString());

    if (itemIndex >= 0) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId: objectIdProduct, quantity });
    }

    await cart.save();
    return cart;
  };

  async removeFromCart(userId: string, productId: string): Promise<ICart | null> {
    const cart = await Cart.findOne({ userId });

    if (!cart) throw new Error('Cart not found');

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
    if (itemIndex < 0) throw new Error('Item not found in cart');

    cart.items.splice(itemIndex, 1);

    await cart.save();
    return cart;
  };

  async updateCartItemQuantity(userId: string, productId: string, quantity: number): Promise<ICart | null> {
    const cart = await Cart.findOne({ userId });

    if (!cart) throw new Error('Cart not found');

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
    if (itemIndex < 0) throw new Error('Item not found in cart');

    cart.items[itemIndex].quantity = quantity;

    await cart.save();
    return cart;
  };
}