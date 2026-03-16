import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useLoginMutation } from "@/store/api/authApi";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/slices/authSlice";
import { ApiError } from "@/types";

import { LoginFormData, loginSchema } from "../utils/validation";

export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      dispatch(
        loginSuccess({
          user: result.data.user,
          accessToken: result.data.accessToken,
          refreshToken: result.data.refreshToken,
        }),
      );
    } catch (err) {
      const apiError = err as ApiError;
      methods.setError("root", {
        message: apiError?.message ?? "Login failed. Please try again.",
      });
    }
  };

  return {
    methods,
    handleSubmit: methods.handleSubmit((values) => onSubmit(values)),
    isLoading,
  };
};
