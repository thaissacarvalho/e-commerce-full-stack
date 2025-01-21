import mongoose, { Document, Schema } from 'mongoose';

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: Array<{ productId: mongoose.Types.ObjectId; quantity: number }>;
}

const CartSchema = new Schema<ICart>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: { type: Number, required: true } }],
});

const Cart = mongoose.model<ICart>('Cart', CartSchema);

export default Cart;
