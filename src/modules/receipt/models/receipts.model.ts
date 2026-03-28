import mongoose, { Schema, Document, Types } from "mongoose";

export interface IReceiptItem {
  menuId: Types.ObjectId;
  menuName: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface IReceipt extends Document {
  orderId: Types.ObjectId;
  userId: Types.ObjectId;
  items: IReceiptItem[];
  totalAmount: number;
  generatedAt: Date;
}

const receiptItemSchema = new Schema<IReceiptItem>(
  {
    menuId: { type: Schema.Types.ObjectId, ref: "Menu", required: true },
    menuName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true },
  },
  { _id: false },
);

const receiptSchema = new Schema<IReceipt>({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
    unique: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [receiptItemSchema],
  totalAmount: { type: Number, required: true },
  generatedAt: { type: Date, default: Date.now },
});

export const ReceiptModel = mongoose.model<IReceipt>("Receipt", receiptSchema);
