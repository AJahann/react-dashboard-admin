import { useMutation } from "@tanstack/react-query";

import type {
  CreateProductDto,
  ProductDto,
  UseCreateProductReturn,
} from "./types";

import { mutationFn } from "../../axios/apiClient";

export const useCreateProduct = (): UseCreateProductReturn => {
  const mutation = useMutation<ProductDto, Error, CreateProductDto>({
    mutationFn: (createProductDto) =>
      mutationFn({
        url: "/admin/products",
        method: "POST",
        data: createProductDto,
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
