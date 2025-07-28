import { useQuery } from "@tanstack/react-query";

import type { Order, UseOrdersOptions, UseOrdersReturn } from "./types";

import { fetcher } from "../../axios/apiClient";

export const useOrders = ({
  userId,
}: UseOrdersOptions = {}): UseOrdersReturn => {
  const { data, isLoading, isError, error } = useQuery<Order[]>({
    queryKey: ["orders", "list", userId],
    queryFn: () => fetcher(`/admin/orders${userId ? `?userId=${userId}` : ""}`),
    staleTime: 1000 * 60 * 5,
  });

  return {
    orders: data ?? [],
    isLoading,
    isError,
    error: error as Error | null,
  };
};
