import { Request, Response } from 'express';
import Product from '../models/product.model';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
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

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const newProduct = new Product({ name, description, price, imageUrl });
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully' });
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
