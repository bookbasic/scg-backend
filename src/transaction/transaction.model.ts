import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
  stock: { type: mongoose.Types.ObjectId, ref: 'Stock', required: true },
  add: { type: Number, required: true },
  sub: { type: Number, required: true },
  remain: { type: Number, required: true },
  diff: { type: Number, required: true },
  datetime: { type: Date },
}, { versionKey: false });

export interface Transaction extends mongoose.Document {
  id: string;
  stock: string,
  add: number;
  sub: number;
  remain: number;
  diff: number;
  datetime: Date;
}