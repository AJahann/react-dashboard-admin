import { useQuery } from "@tanstack/react-query";

import type { OrderCountResponse, UseOrderCountReturn } from "./types";

import { fetcher } from "../../axios/apiClient";

export const useOrderCount = (userId?: string): UseOrderCountReturn => {
  const { data, isLoading, isError, error } = useQuery<OrderCountResponse>({
    queryKey: ["orders", "count", userId],
    queryFn: () =>
      fetcher(`/admin/orders/count${userId ? `?userId=${userId}` : ""}`),
    staleTime: 1000 * 60 * 5,
  });

  return {
    count: data?.count ?? 0,
    isLoading,
    isError,
    error: error as Error | null,
  };
};
