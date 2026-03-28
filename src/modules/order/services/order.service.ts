import { OrderModel, IOrder } from "./../models";
import { MenuModel } from "./../../menu/models";
import { UserModel } from "./../../auth/models";
import { CreateOrderInput, OrderResponse, OrderItemResponse } from "./../types";
import { Types } from "mongoose";

const populateOrder = async (order: IOrder): Promise<OrderResponse> => {
  const user = await UserModel.findById(order.userId).select("name");
  const itemsWithDetails: OrderItemResponse[] = await Promise.all(
    order.items.map(async (item) => {
      const menu = await MenuModel.findById(item.menuId).select("name price");
      return {
        menuId: item.menuId.toString(),
        menuName: menu?.name || "Unknown Item",
        price: menu?.price || 0,
        quantity: item.quantity,
        subtotal: (menu?.price || 0) * item.quantity,
      };
    }),
  );

  return {
    id: order._id.toString(),
    userId: order.userId.toString(),
    userName: user?.name || "Unknown User",
    items: itemsWithDetails,
    totalAmount: order.totalAmount,
    status: order.status,
    createdAt: order.createdAt,
  };
};

export const createOrder = async (
  input: CreateOrderInput,
): Promise<OrderResponse> => {
  let totalAmount = 0;

  for (const item of input.items) {
    const menu = await MenuModel.findById(item.menuId);
    if (!menu) throw new Error(`Menu item ${item.menuId} not found`);
    if (!menu.isAvailable)
      throw new Error(`Menu item "${menu.name}" is not available`);
    totalAmount += menu.price * item.quantity;
  }

  const order = await OrderModel.create({
    userId: new Types.ObjectId(input.userId),
    items: input.items.map((i) => ({
      menuId: new Types.ObjectId(i.menuId),
      quantity: i.quantity,
    })),
    totalAmount,
    status: "pending",
  });

  return populateOrder(order);
};

export const getMyOrders = async (userId: string): Promise<OrderResponse[]> => {
  const orders = await OrderModel.find({
    userId: new Types.ObjectId(userId),
  }).sort({ createdAt: -1 });
  return Promise.all(orders.map(populateOrder));
};

export const getAllOrders = async (): Promise<OrderResponse[]> => {
  const orders = await OrderModel.find().sort({ createdAt: -1 });
  return Promise.all(orders.map(populateOrder));
};

export const updateOrderStatus = async (
  orderId: string,
  status: "pending" | "completed",
): Promise<OrderResponse> => {
  const order = await OrderModel.findByIdAndUpdate(
    orderId,
    { status },
    { new: true },
  );
  if (!order) throw new Error("Order not found");
  return populateOrder(order);
};
