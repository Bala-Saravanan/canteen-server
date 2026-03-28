import { Request, Response } from "express";
import {
  generateReceipt,
  getReceiptByOrderId,
  getAllReceipts,
} from "./../services";
import { sendSuccess, sendError } from "./../../../utils/response";

export const createReceipt = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      sendError(res, "orderId is required", 400);
      return;
    }
    const receipt = await generateReceipt({ orderId });
    sendSuccess(res, "Receipt generated successfully", receipt, 201);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to generate receipt";
    sendError(res, message, 400);
  }
};

export const getReceipt = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const receipt = await getReceiptByOrderId(orderId as string);
    sendSuccess(res, "Receipt fetched successfully", receipt);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch receipt";
    sendError(res, message, 404);
  }
};

export const listReceipts = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const receipts = await getAllReceipts();
    sendSuccess(res, "Receipts fetched successfully", receipts);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch receipts";
    sendError(res, message, 400);
  }
};
