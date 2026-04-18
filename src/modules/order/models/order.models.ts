// import mongoose, { Schema, Document, Types } from "mongoose";

// export interface IOrderItem {
//   menuId: Types.ObjectId;
//   quantity: number;
// }

// export interface IOrder extends Document {
//   userId: Types.ObjectId;
//   items: IOrderItem[];
//   totalAmount: number;
//   status: "pending" | "completed";
//   createdAt: Date;
// }

// const orderItemSchema = new Schema<IOrderItem>(
//   {
//     menuId: { type: Schema.Types.ObjectId, ref: "Menu", required: true },
//     quantity: { type: Number, required: true, min: 1 },
//   },
//   { _id: false },
// );

// const orderSchema = new Schema<IOrder>(
//   {
//     userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     items: {
//       type: [orderItemSchema],
//       required: true,
//       validate: [
//         (v: IOrderItem[]) => v.length > 0,
//         "Order must have at least one item",
//       ],
//     },
//     totalAmount: { type: Number, required: true, min: 0 },
//     status: {
//       type: String,
//       enum: ["pending", "completed"],
//       default: "pending",
//     },
//   },
//   { timestamps: true },
// );

// export const OrderModel = mongoose.model<IOrder>("Order", orderSchema);

import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOrderItem {
  menuId: Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  userId: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  status: "pending" | "completed";
  orderType: "dine-in" | "take-away";
  paymentMethod: "upi" | "cash";
  createdAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    menuId: { type: Schema.Types.ObjectId, ref: "Menu", required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: [
        (v: IOrderItem[]) => v.length > 0,
        "Order must have at least one item",
      ],
    },
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    orderType: { type: String, enum: ["dine-in", "take-away"], required: true },
    paymentMethod: { type: String, enum: ["upi", "cash"], required: true },
  },
  { timestamps: true },
);

export const OrderModel = mongoose.model<IOrder>("Order", orderSchema);
