import * as mongoose from 'mongoose';

export const StockSchema = new mongoose.Schema({
  product: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
  machine: { type: mongoose.Types.ObjectId, ref: 'Machine', required: true },
  remain: { type: Number, required: true },
  active: { type: Boolean, required: true },
  isDelete: { type: Boolean, required: true },
  datetime: { type: Date},
}, { versionKey: false });

export interface Stock extends mongoose.Document {
  id: string;
  product: string,
  machine: string;
  remain: number;
  active: boolean;
  isDelete: boolean;
  datetime: Date;
}