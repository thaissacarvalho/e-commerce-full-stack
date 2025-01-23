import mongoose from 'mongoose';
import Cart, { ICart } from '../models/cart.model';
import { client } from '../config/redis.config';  // Redis Client

export class CartService {
  async createCart(userId: string): Promise<ICart> {
    const newCart = new Cart({
      userId,
      items: [],
    });

    await newCart.save();

    await client.set(`cart:${userId}`, JSON.stringify(newCart));

    return newCart;
  }

  async getCartByUserId(userId: string): Promise<ICart | null> {
    const cachedCart = await client.get(`cart:${userId}`);
    if (cachedCart) {
      return JSON.parse(cachedCart);
    }

    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (cart) {
      await client.set(`cart:${userId}`, JSON.stringify(cart));
    }

    return cart;
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

    await client.set(`cart:${userId}`, JSON.stringify(cart));

    return cart;
  }

  async removeFromCart(userId: string, productId: string): Promise<ICart | null> {
    const cart = await Cart.findOne({ userId });

    if (!cart) throw new Error('Cart not found');

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
    if (itemIndex < 0) throw new Error('Item not found in cart');

    cart.items.splice(itemIndex, 1);

    await cart.save();

    await client.set(`cart:${userId}`, JSON.stringify(cart));

    return cart;
  }

  async updateCartItemQuantity(userId: string, productId: string, quantity: number): Promise<ICart | null> {
    const cart = await Cart.findOne({ userId });

    if (!cart) throw new Error('Cart not found');

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
    if (itemIndex < 0) throw new Error('Item not found in cart');

    cart.items[itemIndex].quantity = quantity;

    await cart.save();

    await client.set(`cart:${userId}`, JSON.stringify(cart));

    return cart;
  }
}