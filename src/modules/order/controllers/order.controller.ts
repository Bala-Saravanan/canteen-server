import { Response } from "express";
import { AuthRequest } from "./../../../middlewares/auth.middleware";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "./../services";
import { sendSuccess, sendError } from "./../../../utils/response";

export const placeOrder = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      sendError(res, "Unauthorized", 401);
      return;
    }
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      sendError(res, "Order must contain at least one item", 400);
      return;
    }
    const order = await createOrder({ userId, items });
    sendSuccess(res, "Order placed successfully", order, 201);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to place order";
    sendError(res, message, 400);
  }
};

export const myOrders = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      sendError(res, "Unauthorized", 401);
      return;
    }
    const orders = await getMyOrders(userId);
    sendSuccess(res, "Orders fetched successfully", orders);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch orders";
    sendError(res, message, 400);
  }
};

export const allOrders = async (
  _req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const orders = await getAllOrders();
    sendSuccess(res, "All orders fetched successfully", orders);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch orders";
    sendError(res, message, 400);
  }
};

export const patchOrderStatus = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["pending", "completed"].includes(status)) {
      sendError(res, "Invalid status value", 400);
      return;
    }
    const orderId = Array.isArray(id) ? id[0] : id;
    const order = await updateOrderStatus(orderId, status);
    sendSuccess(res, "Order status updated successfully", order);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update order status";
    sendError(res, message, 400);
  }
};
