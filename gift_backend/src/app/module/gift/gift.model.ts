import { Schema, model } from 'mongoose';
import { TGift } from './gift.interface';

const giftSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  occasion: { type: String },
  recipient: { type: String },
  category: { type: String },
  theme: { type: String },
  brand: { type: String },
});

export const Gift = model<TGift>('Gift', giftSchema);
