"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLoginOtpConfirmMutation } from "@/features/auth/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { setFeSession } from "@/lib/auth";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/lib/theme-store";

export default function OtpPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams?.get("email") || "";
  const nextParam = searchParams?.get("next") || "";
  const [code, setCode] = useState("");
  const [rememberDevice, setRememberDevice] = useState(false);
  const [confirmOtp, { isLoading }] = useLoginOtpConfirmMutation();
  const { resolvedTheme } = useThemeStore();
  const isDark = resolvedTheme === "dark";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      toast.error("Missing email", { description: "Please login again." });
      router.replace("/login");
      return;
    }
    if (!code || code.length !== 6) {
      toast.error("Invalid code", { description: "Enter the 6-digit OTP sent to your email." });
      return;
    }

    let loadingToast: string | number | undefined;
    try {
      loadingToast = toast.loading("Verifying OTP...");
      await confirmOtp({ email, code, remember_device: rememberDevice }).unwrap();
      setFeSession();
      toast.success("Verified", { description: "Redirecting to dashboard..." });
      router.replace(nextParam || "/admin/dashboard");
    } catch (err: any) {
      toast.error("OTP verification failed", {
        description: err?.data?.message || "Please try again.",
      });
    } finally {
      if (loadingToast !== undefined) toast.dismiss(loadingToast as any);
    }
  }

  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center p-4",
        isDark ? "bg-gray-950" : "bg-slate-50",
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className={cn(isDark ? "border-gray-800 bg-gray-900/95" : "bg-white")}>
          <CardContent className="p-6 md:p-8">
            <button
              type="button"
              onClick={() => router.replace("/login")}
              className={cn(
                "mb-6 inline-flex items-center gap-2 text-sm",
                isDark ? "text-blue-300" : "text-blue-600",
              )}
            >
              <ArrowLeft className="h-4 w-4" /> Back to login
            </button>

            <div className="mb-6 flex items-center gap-3">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl",
                  isDark ? "bg-blue-600/20" : "bg-blue-50",
                )}
              >
                <ShieldCheck
                  className={cn("h-6 w-6", isDark ? "text-blue-300" : "text-blue-600")}
                />
              </div>
              <div>
                <h1
                  className={cn(
                    "text-xl font-semibold",
                    isDark ? "text-gray-100" : "text-gray-900",
                  )}
                >
                  Two-Factor Authentication
                </h1>
                <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>
                  Enter the 6-digit code sent to {email || "your email"}.
                </p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              {!email && (
                <p className={cn("text-sm", isDark ? "text-red-300" : "text-red-600")}>
                  Email not found. Please go back and login again.
                </p>
              )}

              <div>
                <Label htmlFor="otp" className={cn(isDark ? "text-gray-200" : "text-gray-800")}>
                  Verification Code
                </Label>
                <Input
                  id="otp"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="123456"
                  className={cn(
                    "mt-2 h-12 text-center text-lg tracking-widest",
                    isDark ? "border-gray-700 bg-gray-800 text-gray-100" : "",
                  )}
                  disabled={isLoading}
                />
              </div>

              <label
                className={cn(
                  "flex cursor-pointer items-center gap-2 text-sm",
                  isDark ? "text-gray-300" : "text-gray-700",
                )}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  disabled={isLoading}
                />
                Remember this device for 30 days
              </label>

              <Button type="submit" disabled={isLoading} className="h-12 w-full">
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Verifying...
                  </span>
                ) : (
                  "Confirm"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
