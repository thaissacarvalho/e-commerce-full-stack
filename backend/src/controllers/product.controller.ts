import { Request, Response } from 'express';
import Product from '../models/product.model';
import { ProductService } from '../services/product.service';

export class ProductController {
  private productService: ProductService; 

  constructor() {
    this.productService = new ProductService();
  }

  async addProduct(req: Request, res: Response) {
    try {
      const { name, description, price, stock, category, imageUrl } = req.body;
      const newProduct = await this.productService.createProduct(name, description, price, stock, category, imageUrl);
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

  async getProducts(req: Request, res: Response) {
    try {
      const products = await this.productService.getProducts();
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
  }

  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'ID is required' })
        return;
      }

      const productId = await this.productService.getProductById(id);

      res.status(200).json(productId);
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

  async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;

      if (!updates || Object.keys(updates).length === 0) {
        res.status(400).json({ message: 'No fields provided for update' });
        return;
      }

      const updateProduct = await this.productService.updateProduct(id, updates);

      if (!updateProduct) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }

      res.status(200).json({
        message: 'Product updated successfully',
        product: updateProduct
      });
      return;
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

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {

      const { id } = req.params;

      const product = await this.productService.deleteProduct(id);
      if (product === null || product === undefined) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message) {
          res.status(401).json(error.message);
        }
        res.status(500).json({ message: error.message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
