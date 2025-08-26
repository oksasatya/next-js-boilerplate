import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || "https://backend-api.oksasatya.dev/api";
const baseUrl = rawBaseUrl.replace(/\/+$/, "");

// A baseQuery that retries after attempting a refresh on 401s (cookie-based auth)
const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

const baseQueryWithReauth: typeof rawBaseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  // If we get a 401, try refreshing the access token, then retry the original request
  if (result.error && result.error.status === 401) {
    const refreshResult = await rawBaseQuery(
      { url: "/refresh", method: "POST" },
      api,
      extraOptions,
    );
    if (!("error" in refreshResult)) {
      // retry the initial query after refresh
      return rawBaseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Me", "Stats"],
  endpoints: () => ({}),
});
