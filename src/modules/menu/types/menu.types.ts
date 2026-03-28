export interface CreateMenuInput {
  name: string;
  price: number;
  category: string;
  isAvailable?: boolean;
}

export interface UpdateMenuInput {
  name?: string;
  price?: number;
  category?: string;
  isAvailable?: boolean;
}

export interface MenuResponse {
  id: string;
  name: string;
  price: number;
  category: string;
  isAvailable: boolean;
  createdAt: Date;
}
