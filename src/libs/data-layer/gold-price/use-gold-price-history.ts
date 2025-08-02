import { useQuery } from "@tanstack/react-query";

import type {
  GoldPriceHistoryResponse,
  UseGoldPriceHistoryOptions,
  UseGoldPriceHistoryReturn,
} from "./types";

import { fetcher } from "../../axios/apiClient";

export const useGoldPriceHistory = ({
  limit = 30,
}: UseGoldPriceHistoryOptions = {}): UseGoldPriceHistoryReturn => {
  const { data, isLoading, isError, error } = useQuery<
    GoldPriceHistoryResponse[]
  >({
    queryKey: ["gold-price", "history", limit],
    queryFn: () => fetcher(`/gold-price/history?limit=${limit}`),
    staleTime: 1000 * 60 * 60,
  });

  return {
    history: data ?? [],
    isLoading,
    isError,
    error: error as Error | null,
  };
};
