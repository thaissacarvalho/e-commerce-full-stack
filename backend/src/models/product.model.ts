import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true}
}, { timestamps: true });

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
