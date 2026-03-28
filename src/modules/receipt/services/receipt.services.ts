import { ReceiptModel, IReceipt } from "./../models";
import { OrderModel } from "./../../order/models";
import { MenuModel } from "./../../menu/models";
import { UserModel } from "./../../auth/models";
import { GenerateReceiptInput, ReceiptResponse } from "./../types";
import { Types } from "mongoose";

const formatReceipt = async (receipt: IReceipt): Promise<ReceiptResponse> => {
  const user = await UserModel.findById(receipt.userId).select("name email");
  return {
    id: receipt._id.toString(),
    orderId: receipt.orderId.toString(),
    userId: receipt.userId.toString(),
    userName: user?.name || "Unknown",
    userEmail: user?.email || "Unknown",
    items: receipt.items.map((item) => ({
      menuId: item.menuId.toString(),
      menuName: item.menuName,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.subtotal,
    })),
    totalAmount: receipt.totalAmount,
    generatedAt: receipt.generatedAt,
  };
};

export const generateReceipt = async (
  input: GenerateReceiptInput,
): Promise<ReceiptResponse> => {
  const existing = await ReceiptModel.findOne({
    orderId: new Types.ObjectId(input.orderId),
  });
  if (existing) return formatReceipt(existing);

  const order = await OrderModel.findById(input.orderId);
  if (!order) throw new Error("Order not found");

  const itemsWithDetails = await Promise.all(
    order.items.map(async (item) => {
      const menu = await MenuModel.findById(item.menuId).select("name price");
      return {
        menuId: item.menuId,
        menuName: menu?.name || "Unknown",
        price: menu?.price || 0,
        quantity: item.quantity,
        subtotal: (menu?.price || 0) * item.quantity,
      };
    }),
  );

  const receipt = await ReceiptModel.create({
    orderId: order._id,
    userId: order.userId,
    items: itemsWithDetails,
    totalAmount: order.totalAmount,
  });

  // Mark order as completed
  await OrderModel.findByIdAndUpdate(input.orderId, { status: "completed" });

  return formatReceipt(receipt);
};

export const getReceiptByOrderId = async (
  orderId: string,
): Promise<ReceiptResponse> => {
  const receipt = await ReceiptModel.findOne({
    orderId: new Types.ObjectId(orderId),
  });
  if (!receipt) throw new Error("Receipt not found for this order");
  return formatReceipt(receipt);
};

export const getAllReceipts = async (): Promise<ReceiptResponse[]> => {
  const receipts = await ReceiptModel.find().sort({ generatedAt: -1 });
  return Promise.all(receipts.map(formatReceipt));
};
