import { baseApi } from "@/lib/api";

export const healthApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    check: build.query<{ status?: string } | unknown, void>({
      query: () => ({ url: "/check" }),
    }),
    ip: build.query<{ ip?: string } | unknown, void>({
      query: () => ({ url: "/ip" }),
    }),
  }),
});

export const { useCheckQuery, useIpQuery } = healthApi;
