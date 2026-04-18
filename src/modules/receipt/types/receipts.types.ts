// export interface GenerateReceiptInput {
//   orderId: string;
// }

// export interface ReceiptItemResponse {
//   menuId: string;
//   menuName: string;
//   price: number;
//   quantity: number;
//   subtotal: number;
// }

// export interface ReceiptResponse {
//   id: string;
//   orderId: string;
//   userId: string;
//   userName: string;
//   userEmail: string;
//   items: ReceiptItemResponse[];
//   totalAmount: number;
//   generatedAt: Date;
// }

export interface GenerateReceiptInput {
  orderId: string;
}

export interface ReceiptItemResponse {
  menuId: string;
  menuName: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface ReceiptResponse {
  id: string;
  orderId: string;
  userId: string;
  userName: string;
  userEmail: string;
  items: ReceiptItemResponse[];
  totalAmount: number;
  orderType: "dine-in" | "take-away";
  paymentMethod: "upi" | "cash";
  generatedAt: Date;
}
