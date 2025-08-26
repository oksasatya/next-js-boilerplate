export const DUMMY_USER = {
  id: "1",
  name: "Admin",
  email: "test@example.com",
  role: "admin" as const,
};

export const DUMMY_CREDENTIALS = {
  email: "test@example.com",
  password: "password123",
};

const FE_SESSION_COOKIE = "fe_session";

export function setFeSession(days = 30) {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${FE_SESSION_COOKIE}=1; path=/; max-age=${maxAge}; samesite=lax`;
}

export function clearFeSession() {
  if (typeof document === "undefined") return;
  document.cookie = `${FE_SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

// Centralized client-side logout helper: clears client cache/state and redirects to /login
// Safe to call from any client component.
export function logout() {
  // Lazy import to avoid cyclic ESM timing issues in SSR
  try {
    // Clear any local app storage tokens if used
    try {
      localStorage.removeItem("token");
    } catch {
      // ignore storage errors
    }

    // Clear FE session cookie
    try {
      clearFeSession();
    } catch {
      // ignore cookie errors
    }

    // Reset RTK Query cache/state
    const { store } = require("./store");
    const { baseApi } = require("./api");
    store.dispatch(baseApi.util.resetApiState());
  } finally {
    if (typeof window !== "undefined") {
      window.location.replace("/login");
    }
  }
}
