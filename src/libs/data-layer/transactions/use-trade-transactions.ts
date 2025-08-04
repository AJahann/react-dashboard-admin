import { useQuery } from "@tanstack/react-query";

import type {
  TradeTransaction,
  TransactionFilterOptions,
  UseTradeTransactionsReturn,
} from "./types";

import { fetcher } from "../../axios/apiClient";

export const useTradeTransactions = (
  filters: TransactionFilterOptions = {},
): UseTradeTransactionsReturn => {
  const queryKey = ["transactions", "trades", filters];

  const { data, isLoading, isError, error, refetch } = useQuery<
    TradeTransaction[]
  >({
    queryKey,
    queryFn: () => {
      const params = new URLSearchParams();

      if (filters.userId) params.append("userId", filters.userId);
      if (filters.startDate) params.append("startDate", filters.startDate);
      if (filters.endDate) params.append("endDate", filters.endDate);
      if (filters.tradeType) params.append("tradeType", filters.tradeType);

      return fetcher(`/admin/transactions/trades?${params.toString()}`);
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    transactions: data ?? [],
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  };
};
