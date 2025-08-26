import { baseApi } from "@/lib/api";
import type { User } from "./types";
import type {
  LoginInput,
  LoginOtpConfirmInput,
  ResetConfirmInput,
  ResetInitInput,
  UpdateProfileInput,
  VerifyConfirmInput,
} from "./schemas";

type LoginResponse = { requires_otp?: boolean } | { user: User } | Record<string, unknown>;

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginInput>({
      query: (body) => ({ url: "/login", method: "POST", body }),
      invalidatesTags: ["Me"],
    }),
    loginOtpConfirm: build.mutation<unknown, LoginOtpConfirmInput>({
      query: (body) => ({ url: "/login/otp/confirm", method: "POST", body }),
      invalidatesTags: ["Me"],
    }),
    me: build.query<User, void>({
      query: () => ({ url: "/profile" }),
      providesTags: ["Me"],
      transformResponse: (res: any) => {
        // backend likely returns the user object directly
        return (res?.user ?? res) as User;
      },
    }),
    updateProfile: build.mutation<User, UpdateProfileInput>({
      query: (body) => ({ url: "/profile", method: "PUT", body }),
      invalidatesTags: ["Me"],
      transformResponse: (res: any) => (res?.user ?? res) as User,
    }),
    verifyInit: build.mutation<{ link?: string } | unknown, void>({
      query: () => ({ url: "/auth/verify/init", method: "POST" }),
    }),
    verifyConfirm: build.mutation<unknown, VerifyConfirmInput>({
      query: (body) => ({ url: "/auth/verify/confirm", method: "POST", body }),
    }),
    resetInit: build.mutation<{ link?: string } | unknown, ResetInitInput>({
      query: (body) => ({ url: "/auth/reset/init", method: "POST", body }),
    }),
    resetConfirm: build.mutation<unknown, ResetConfirmInput>({
      query: (body) => ({ url: "/auth/reset/confirm", method: "POST", body }),
    }),
    logout: build.mutation<unknown, void>({
      query: () => ({ url: "/logout", method: "POST" }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          // clear RTK Query cache/state on logout
          dispatch(baseApi.util.resetApiState());
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLoginOtpConfirmMutation,
  useMeQuery,
  useUpdateProfileMutation,
  useVerifyInitMutation,
  useVerifyConfirmMutation,
  useResetInitMutation,
  useResetConfirmMutation,
  useLogoutMutation,
} = authApi;
