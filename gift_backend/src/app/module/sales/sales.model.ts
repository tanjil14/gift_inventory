import mongoose, { Schema, model } from 'mongoose';
import { TSale } from './sales.interface';

const saleSchema = new Schema({
  productId: {
    type: mongoose.Types.ObjectId,
    ref: 'Gift',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  buyerName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Sale = model<TSale>('Sale', saleSchema);
