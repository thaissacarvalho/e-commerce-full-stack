import { client } from '../config/redis.config';
import Product, { IProduct } from '../models/product.model';

export class ProductService {
  async createProduct(
    name: string,
    description: string,
    price: number,
    stock: number,
    imageUrl: string,
    category: string
  ): Promise<IProduct> {
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      imageUrl,
      category,
    });

    await newProduct.save();

    const products = await Product.find();
    await client.set('products', JSON.stringify(products), { EX: 60 });

    return newProduct;
  }

  async getProducts(): Promise<IProduct[]> {
    try {
      const cachedProducts = await client.get('products');

      if (cachedProducts) {
        return JSON.parse(cachedProducts);
      }

      console.log('Cache não encontrado, buscando no MongoDB...');
      const products = await Product.find();

      await client.set('products', JSON.stringify(products), { EX: 60 });  // 60 segundos

      return products;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw new Error('Erro ao buscar produtos');
    }
  }

  async getProductById(productId: string): Promise<IProduct | null> {
    const cachedProduct = await client.get(`product:${productId}`);

    if (cachedProduct) {
      return JSON.parse(cachedProduct);
    }

    const product = await Product.findById(productId);

    if (product) {
      await client.set(`product:${productId}`, JSON.stringify(product), { EX: 60 });
    }

    return product;
  }

  async updateProduct(
    productId: string,
    updates: Partial<IProduct>
  ): Promise<IProduct | null> {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });

    if (updatedProduct) {
      const products = await Product.find();
      await client.set('products', JSON.stringify(products), { EX: 60 });

      await client.set(`product:${productId}`, JSON.stringify(updatedProduct), { EX: 60 });
    }

    return updatedProduct;
  }

  async deleteProduct(productId: string): Promise<boolean> {
    const result = await Product.findByIdAndDelete(productId);

    if (result) {
      await client.del('products');

      await client.del(`product:${productId}`);
    }

    return result !== null;
  }
}