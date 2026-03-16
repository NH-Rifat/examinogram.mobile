import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "@/utils/env";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: env.API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as { auth: { accessToken: string | null } })
        .auth?.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  // Add tag types here as features are built (e.g. 'Auth', 'Exam', 'User')
  tagTypes: [] as string[],
  endpoints: () => ({}),
});
