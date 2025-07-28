export type OrderStatus =
  | "CANCELLED"
  | "CONFIRMED"
  | "DELIVERED"
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED";

interface UpdateOrderDto {
  status?: OrderStatus;
}

interface OrderWithItems {
  id: string;
  userId: string;
  status: OrderStatus;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  items: {
    id: string;
    productId: string;
    quantity: number;
    price: number;
    product: {
      name: string;
      brand: string;
      gram: number;
    };
  }[];
}

export type OrderItem = OrderWithItems["items"][0];

export interface OrderCountResponse {
  count: number;
}

export interface UseOrderCountReturn {
  count: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export interface UseRecentOrdersReturn {
  orders: OrderItem[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export interface UseOrdersReturn {
  orders: OrderWithItems[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export interface UseOrderReturn {
  order: OrderWithItems | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export interface UseUpdateOrderStatusReturn {
  mutate: (params: { id: string; status: OrderStatus }) => void;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
}

export interface UseRecentOrdersOptions {
  limit?: number;
  userId?: string;
}

export interface UseOrdersOptions {
  userId?: string;
}

export type Order = OrderWithItems;
export type OrderUpdateData = UpdateOrderDto;
