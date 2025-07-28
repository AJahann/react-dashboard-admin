import { useMutation } from "@tanstack/react-query";

import type { User, UserCreateData } from "./types";

import { mutationFn } from "../../axios/apiClient";

export const useCreateUser = () => {
  return useMutation<User, Error, UserCreateData>({
    mutationFn: (createUserDto) =>
      mutationFn({
        url: "/admin/users",
        method: "POST",
        data: createUserDto,
      }),
  });
};
