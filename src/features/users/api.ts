import { baseApi } from "@/lib/api";

export type SearchUsersParams = { q: string; size?: number };

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    searchUsers: build.query<any, SearchUsersParams>({
      query: ({ q, size = 5 }) => ({ url: "/users/search", params: { q, size } }),
    }),
  }),
});

export const { useSearchUsersQuery } = usersApi;
