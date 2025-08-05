import { useMutation } from "@tanstack/react-query";

import type { DeleteProductResponse, UseDeleteProductReturn } from "./types";

import { mutationFn } from "../../axios/apiClient";

export const useDeleteProduct = (): UseDeleteProductReturn => {
  const mutation = useMutation<DeleteProductResponse, Error, string>({
    mutationFn: (id) =>
      mutationFn({
        url: `/admin/products/${id}`,
        method: "DELETE",
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
