// export interface OrderItemInput {
//   menuId: string;
//   quantity: number;
// }

// export interface CreateOrderInput {
//   userId: string;
//   items: OrderItemInput[];
// }

// export interface OrderItemResponse {
//   menuId: string;
//   menuName: string;
//   price: number;
//   quantity: number;
//   subtotal: number;
// }

// export interface OrderResponse {
//   id: string;
//   userId: string;
//   userName: string;
//   items: OrderItemResponse[];
//   totalAmount: number;
//   status: "pending" | "completed";
//   createdAt: Date;
// }

export interface OrderItemInput {
  menuId: string;
  quantity: number;
}

export interface CreateOrderInput {
  userId: string;
  items: OrderItemInput[];
  orderType: "dine-in" | "take-away";
  paymentMethod: "upi" | "cash";
}

export interface OrderItemResponse {
  menuId: string;
  menuName: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface OrderResponse {
  id: string;
  userId: string;
  userName: string;
  items: OrderItemResponse[];
  totalAmount: number;
  status: "pending" | "completed";
  orderType: "dine-in" | "take-away";
  paymentMethod: "upi" | "cash";
  createdAt: Date;
}
