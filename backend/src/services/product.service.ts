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

      if (cachedProducts !== null) {
        console.log('Dados encontrados no Redis Cache.');
        return JSON.parse(cachedProducts);
      }

      console.log('Buscando dados no MongoDB...');
      const products = await Product.find();

      // Armazenar no cache do Redis
      await client.set('products', JSON.stringify(products), { EX: 60 });

      return products;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw new Error('Erro ao buscar produtos');
    }
  }

  async getProductById(productId: string): Promise<IProduct | null> {
    return Product.findById(productId);
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
    }

    return updatedProduct;
  }

  async deleteProduct(productId: string): Promise<void> {
    await Product.findByIdAndDelete(productId);

    const products = await Product.find();
    await client.set('products', JSON.stringify(products), { EX: 60 });
  }
}