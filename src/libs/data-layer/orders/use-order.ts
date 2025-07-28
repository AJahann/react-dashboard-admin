import { useQuery } from "@tanstack/react-query";

import type { Order, UseOrderReturn } from "./types";

import { fetcher } from "../../axios/apiClient";

export const useOrder = (id: string): UseOrderReturn => {
  const { data, isLoading, isError, error } = useQuery<Order>({
    queryKey: ["orders", "detail", id],
    queryFn: () => fetcher(`/admin/orders/${id}`),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  return {
    order: data,
    isLoading,
    isError,
    error: error as Error | null,
  };
};
