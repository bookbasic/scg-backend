import * as mongoose from 'mongoose';

export const MachineSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  active: { type: Boolean, required: true },
  isDelete: { type: Boolean, required: true },
  datetime: { type: Date},
}, { versionKey: false });

export interface Machine extends mongoose.Document {
  id: string;
  code: string;
  name: string;
  lat: number;
  lng: number;
  active: boolean;
  isDelete: boolean;
  datetime: Date;
}