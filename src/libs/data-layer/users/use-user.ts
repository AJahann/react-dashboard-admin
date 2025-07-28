import { useQuery } from "@tanstack/react-query";

import type { User, UseUserReturn } from "./types";

import { fetcher } from "../../axios/apiClient";

export const useUser = (id: string): UseUserReturn => {
  const { data, isLoading, error } = useQuery<User>({
    queryKey: ["users", "detail", id],
    queryFn: () => fetcher(`/admin/users/${id}`),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  return {
    user: data,
    isLoading,
    error: error as Error | null,
  };
};
