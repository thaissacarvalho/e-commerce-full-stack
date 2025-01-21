import Product, { IProduct } from '../models/product.model';

export const createProduct = async (name: string, description: string, price: number, imageUrl: string): Promise<IProduct> => {
  const newProduct = new Product({
    name,
    description,
    price,
    imageUrl,
  });

  await newProduct.save();
  return newProduct;
};

export const getProducts = async (): Promise<IProduct[]> => {
  return Product.find();
};

export const getProductById = async (productId: string): Promise<IProduct | null> => {
  return Product.findById(productId);
};

export const updateProduct = async (productId: string, updates: Partial<IProduct>): Promise<IProduct | null> => {
  const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });
  return updatedProduct;
};

export const deleteProduct = async (productId: string): Promise<void> => {
  await Product.findByIdAndDelete(productId);
};
