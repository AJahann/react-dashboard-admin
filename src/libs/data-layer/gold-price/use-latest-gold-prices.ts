import { useQuery } from "@tanstack/react-query";

import type {
  LatestGoldPricesResponse,
  UseLatestGoldPricesReturn,
} from "./types";

import { fetcher } from "../../axios/apiClient";

export const useLatestGoldPrices = (): UseLatestGoldPricesReturn => {
  const { data, isLoading, isError, error } =
    useQuery<LatestGoldPricesResponse>({
      queryKey: ["gold-price", "latest"],
      queryFn: () => fetcher("/gold-price/latest"),
      staleTime: 1000 * 60,
      refetchInterval: 1000 * 60 * 5,
    });

  return {
    prices: data ?? null,
    isLoading,
    isError,
    error: error as Error | null,
  };
};
