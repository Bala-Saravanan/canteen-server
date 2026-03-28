import mongoose, { Schema, Document } from "mongoose";

export interface IMenu extends Document {
  name: string;
  price: number;
  category: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const menuSchema = new Schema<IMenu>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const MenuModel = mongoose.model<IMenu>("Menu", menuSchema);
