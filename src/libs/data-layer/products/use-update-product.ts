import { useMutation } from "@tanstack/react-query";

import type {
  ProductDto,
  UpdateProductDto,
  UseUpdateProductReturn,
} from "./types";

import { mutationFn } from "../../axios/apiClient";

export const useUpdateProduct = (): UseUpdateProductReturn => {
  const mutation = useMutation<
    ProductDto,
    Error,
    { id: string; updateData: UpdateProductDto }
  >({
    mutationFn: ({ id, updateData }) =>
      mutationFn({
        url: `/admin/products/${id}`,
        method: "PUT",
        data: updateData,
      }),
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
