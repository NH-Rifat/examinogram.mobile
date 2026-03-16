import { ApiResponse, User } from "@/types";

import { API_ENDPOINTS } from "@/constants/api";
import { baseApi } from "./baseApi";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginData = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<LoginData>, any>({
      query: (credentials) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
