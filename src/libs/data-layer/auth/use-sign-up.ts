import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { useAuth } from "../../../context/AuthContext";
import { mutationFn } from "../../axios/apiClient";

interface SignUpPayload {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    mutationFn: (payload: SignUpPayload) =>
      mutationFn<{ access_token: string }>({
        url: "/auth/admin/register",
        method: "POST",
        data: {
          ...payload,
          role: "SUPER_ADMIN",
        },
      }),
    onSuccess: async (data) => {
      try {
        await login(data.access_token);

        toast.success("Admin account created successfully!");
        navigate("/");
      } catch (error) {
        console.error("Login after signup failed:", error);
        toast.error("Failed to authenticate after signup");
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      toast.error(errorMessage);
    },
  });
};
