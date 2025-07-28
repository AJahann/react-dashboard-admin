import { useMutation } from "@tanstack/react-query";

import type { Order, OrderStatus, UseUpdateOrderStatusReturn } from "./types";

import { mutationFn } from "../../axios/apiClient";

export const useUpdateOrderStatus = (): UseUpdateOrderStatusReturn => {
  const mutation = useMutation<
    Order,
    Error,
    { id: string; status: OrderStatus }
  >({
    mutationFn: ({ id, status }) =>
      mutationFn({
        url: `/admin/orders/${id}/status`,
        method: "PUT",
        data: { status },
      }),
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
