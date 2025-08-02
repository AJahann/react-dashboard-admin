export interface CreateGoldPriceDto {
  buyPrice: number;
  sellPrice: number;
}

export interface GoldPrice {
  id: string;
  buyPrice: number;
  sellPrice: number;
  updatedAt: Date;
  updatedBy: string;
}

export interface LatestGoldPricesResponse {
  buyPrice: number;
  sellPrice: number;
}

export interface GoldPriceHistoryResponse extends GoldPrice {
  updatedBy: string;
}

export interface UseLatestGoldPricesReturn {
  prices: LatestGoldPricesResponse | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export interface UseGoldPriceHistoryReturn {
  history: GoldPriceHistoryResponse[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export interface UseCreateGoldPriceReturn {
  mutate: (data: CreateGoldPriceDto) => void;
  mutateAsync: (data: CreateGoldPriceDto) => Promise<GoldPrice>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
}

export interface UseGoldPriceHistoryOptions {
  limit?: number;
}
