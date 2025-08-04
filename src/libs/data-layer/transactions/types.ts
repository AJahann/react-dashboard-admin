/* eslint-disable @typescript-eslint/naming-convention */
enum TradeActionType {
  BUY_GOLD = "BUY_GOLD",
  SELL_GOLD = "SELL_GOLD",
  ALL_TRADES = "ALL_TRADES",
}

export interface TradeTransaction {
  id: string;
  createdAt: string;
  action: TradeActionType;
  goldAmount: number;
  user: {
    id: string;
    phone: string;
  };
}

export interface TransactionFilterOptions {
  userId?: string;
  startDate?: string;
  endDate?: string;
  tradeType?: TradeActionType;
}

export interface UseTradeTransactionsReturn {
  transactions: TradeTransaction[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}
