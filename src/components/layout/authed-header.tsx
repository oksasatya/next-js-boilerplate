"use client";
import { Header } from "@/components/layout/header";
import { useMeQuery, useLogoutMutation } from "@/features/auth/api";
import { clearFeSession } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function AuthedHeader() {
  const router = useRouter();
  const { data, isLoading } = useMeQuery();
  const [logout] = useLogoutMutation();

  async function handleLogout() {
    try {
      await logout().unwrap();
    } catch {
      // ignore
    } finally {
      try {
        clearFeSession();
      } catch {
        // ignore
      }
      router.replace("/login");
    }
  }

  if (isLoading) return null;

  return <Header userData={data} onLogout={handleLogout} />;
}
