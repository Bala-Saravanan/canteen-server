export interface OrderItemInput {
  menuId: string;
  quantity: number;
}

export interface CreateOrderInput {
  userId: string;
  items: OrderItemInput[];
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
  createdAt: Date;
}
