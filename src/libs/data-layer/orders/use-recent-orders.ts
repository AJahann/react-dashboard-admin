import { useQuery } from "@tanstack/react-query";

import type {
  Order,
  UseRecentOrdersOptions,
  UseRecentOrdersReturn,
} from "./types";

import { fetcher } from "../../axios/apiClient";

export const useRecentOrders = ({
  limit = 10,
  userId,
}: UseRecentOrdersOptions = {}): UseRecentOrdersReturn => {
  const { data, isLoading, isError, error } = useQuery<Order[]>({
    queryKey: ["orders", "recent", limit, userId],
    queryFn: () =>
      fetcher(
        `/admin/orders/recent?limit=${limit}${userId ? `&userId=${userId}` : ""}`,
      ),
    staleTime: 1000 * 60 * 2, // 2 minutes for recent data
  });

  return {
    orders: data ?? [],
    isLoading,
    isError,
    error: error as Error | null,
  };
};
