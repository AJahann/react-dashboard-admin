import { useMutation } from "@tanstack/react-query";

import { mutationFn } from "../../axios/apiClient";

interface DeleteUserResponse {
  success: boolean;
}

export const useDeleteUser = () => {
  return useMutation<DeleteUserResponse, Error, string>({
    mutationFn: (id) =>
      mutationFn({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
  });
};
