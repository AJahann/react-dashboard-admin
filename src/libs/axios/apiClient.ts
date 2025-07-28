import { apiClient } from "./index";

export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await apiClient.get<T>(url);
  return response.data;
};

export const mutationFn = async <T>({
  url,
  method = "POST",
  data,
}: {
  url: string;
  method?: "DELETE" | "PATCH" | "POST" | "PUT";
  data?: unknown;
}): Promise<T> => {
  const response = await apiClient.request<T>({ url, method, data });
  return response.data;
};
