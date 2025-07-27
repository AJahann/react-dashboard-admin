import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { useAuth } from "../../../context/AuthContext";
import { mutationFn } from "../../axios/apiClient";

interface SignInPayload {
  email: string;
  password: string;
}

export const useSignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    mutationFn: (payload: SignInPayload) =>
      mutationFn<{ access_token: string }>({
        url: "/auth/admin/login",
        method: "POST",
        data: payload,
      }),
    onSuccess: async (data) => {
      try {
        await login(data.access_token);

        toast.success("Admin logged in successfully!");
        navigate("/");
      } catch (error) {
        console.error("Login after signin failed:", error);
        toast.error("Failed to authenticate after signin");
      }
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    },
  });
};
