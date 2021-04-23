import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  active: { type: Boolean, required: true },
  isDelete: { type: Boolean, required: true },
  datetime: { type: Date},
}, { versionKey: false });

export interface Product extends mongoose.Document {
  id: string;
  code: string;
  name: string;
  price: number;
  active: boolean;
  isDelete: boolean;
  datetime: Date;
}