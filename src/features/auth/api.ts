import { baseApi } from "@/lib/api";
import type { User } from "./types";
import type { LoginInput } from "./schemas";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<{ user: User }, LoginInput>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      invalidatesTags: ["Me"],
    }),
    me: build.query<{ user: User }, void>({
      query: () => ({ url: "/auth/me" }),
      providesTags: ["Me"],
    }),
  }),
});

export const { useLoginMutation, useMeQuery } = authApi;
