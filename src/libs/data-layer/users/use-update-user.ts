import { useMutation } from "@tanstack/react-query";

import type { User, UserUpdateData } from "./types";

import { mutationFn } from "../../axios/apiClient";

export const useUpdateUser = () => {
  return useMutation<
    User,
    Error,
    { id: string; updateUserDto: UserUpdateData }
  >({
    mutationFn: ({ id, updateUserDto }) =>
      mutationFn({
        url: `/admin/users/${id}`,
        method: "PUT",
        data: updateUserDto,
      }),
  });
};
