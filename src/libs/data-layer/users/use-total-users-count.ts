import { useQuery } from "@tanstack/react-query";

import type {
  TotalUsersCountResponse,
  UseTotalUsersCountReturn,
} from "./types";

import { fetcher } from "../../axios/apiClient";

export const useTotalUsersCount = (): UseTotalUsersCountReturn => {
  const { data, isLoading, error } = useQuery<TotalUsersCountResponse>({
    queryKey: ["users", "count"],
    queryFn: () => fetcher("/admin/users/count"),
    staleTime: 1000 * 60 * 5,
  });

  return {
    total: data?.total ?? 0,
    isLoading,
    error: error as Error | null,
  };
};
