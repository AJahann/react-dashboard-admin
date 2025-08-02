import { useMutation, useQueryClient } from "@tanstack/react-query";

import type {
  CreateGoldPriceDto,
  GoldPrice,
  UseCreateGoldPriceReturn,
} from "./types";

import { mutationFn } from "../../axios/apiClient";

export const useCreateGoldPrice = (): UseCreateGoldPriceReturn => {
  const queryClient = useQueryClient();
  const mutation = useMutation<GoldPrice, Error, CreateGoldPriceDto>({
    mutationFn: (createGoldPriceDto) =>
      mutationFn({
        url: "/gold-price",
        method: "POST",
        data: createGoldPriceDto,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["gold-price", "latest", "history"],
        refetchType: "active",
      });
      queryClient.refetchQueries({ queryKey: ["gold-price"] });
    },
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
