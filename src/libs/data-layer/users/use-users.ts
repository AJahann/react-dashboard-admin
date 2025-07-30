import { useQuery } from "@tanstack/react-query";

import type {
  PaginatedUsers,
  User,
  UseUsersOptions,
  UseUsersReturn,
} from "./types";

import { fetcher } from "../../axios/apiClient";

type PaginatedWithUsers = PaginatedUsers & { users: User[] };

export const useUsers = ({
  page = 1,
  limit = 30,
}: UseUsersOptions = {}): UseUsersReturn => {
  const { data, isLoading, error } = useQuery<PaginatedWithUsers>({
    queryKey: ["users", "list", page, limit],
    queryFn: () => fetcher(`/admin/users?page=${page}&limit=${limit}`),
    staleTime: 1000 * 60 * 5,
  });

  return {
    users: data?.users ?? [],
    pagination: {
      total: data?.total ?? 0,
      page: data?.page ?? 1,
      limit: data?.limit ?? limit,
      totalPages: data?.totalPages ?? 1,
    },
    isLoading,
    error: error as Error | null,
  };
};
