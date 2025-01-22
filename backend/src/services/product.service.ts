import Product, { IProduct } from '../models/product.model';

export class ProductService {
  async createProduct(name: string, description: string, price: number, imageUrl: string): Promise<IProduct> {
    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl,
    });

    await newProduct.save();
    return newProduct;
  };

  async getProducts(): Promise<IProduct[]> {
    return Product.find();
  };


  async getProductById(productId: string): Promise<IProduct | null> {
    return Product.findById(productId);
  };

  async updateProduct(productId: string, updates: Partial<IProduct>): Promise<IProduct | null> {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });
    return updatedProduct;
  };

  async deleteProduct(productId: string): Promise<void> {
    await Product.findByIdAndDelete(productId);
  };
}