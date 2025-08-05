import { useQuery } from "@tanstack/react-query";

import type {
  ProductDto,
  UseProductsOptions,
  UseProductsReturn,
} from "./types";

import { fetcher } from "../../axios/apiClient";

export const useProducts = ({
  limit = 15,
}: UseProductsOptions = {}): UseProductsReturn => {
  const { data, isLoading, isError, error } = useQuery<ProductDto[]>({
    queryKey: ["products", "list", limit],
    queryFn: () => fetcher(`/admin/products?limit=${limit}`),
  });

  return {
    products: data ?? [],
    isLoading,
    isError,
    error: error as Error | null,
  };
};
