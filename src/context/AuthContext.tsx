import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Cookies } from "react-cookie";

import { fetcher } from "../libs/axios/apiClient";

interface AdminProfile {
  id: number;
  email: string;
  name: string;
  lastName: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  admin: AdminProfile | null;
  refreshProfile: () => Promise<void>;
  logout: () => void;
  login: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const cookies = new Cookies();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryClient = useQueryClient();

  const {
    data,
    refetch,
    isLoading: isLoadingProfile,
  } = useQuery<AdminProfile>({
    queryKey: ["adminProfile"],
    queryFn: () => fetcher("/auth/admin/me"),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const admin: AdminProfile | null = data ?? null;

  const login = useCallback(
    async (token: string) => {
      cookies.set("jwt", token, {
        path: "/",
        secure: true,
        sameSite: "strict",
        httpOnly: false,
      });

      setIsAuthenticated(true);
      await refetch();
    },
    [refetch],
  );

  const checkAuth = useCallback(async () => {
    try {
      const token = cookies.get("jwt");
      if (token) {
        await login(token);
      } else {
        setIsAuthenticated(false);
      }
    } catch (_error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, [login]);

  const refreshProfile = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const logout = useCallback(() => {
    cookies.remove("jwt", { path: "/" });
    setIsAuthenticated(false);
    queryClient.clear();
  }, [queryClient]);

  useEffect(() => {
    checkAuth();

    const interval = setInterval(checkAuth, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [checkAuth]);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      isLoading: isLoading || isLoadingProfile,
      admin,
      refreshProfile,
      logout,
      login,
    }),
    [
      isAuthenticated,
      isLoading,
      isLoadingProfile,
      admin,
      refreshProfile,
      logout,
      login,
    ],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
