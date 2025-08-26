"use client";
import { loginSchema, type LoginInput } from "@/features/auth/schemas";
import { useLoginMutation } from "@/features/auth/api";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Zap,
  ArrowRight,
  Copy,
  Check,
  Sparkles,
  Shield,
  Globe,
  Star,
  Loader2,
} from "lucide-react";
import { useLoadingStore } from "@/lib/loading-store";
import { useThemeStore } from "@/lib/theme-store";
import { cn } from "@/lib/utils";
import { setFeSession } from "@/lib/auth";
import { clearFeSession } from "@/lib/auth";

const DEMO_CREDENTIALS = {
  email: "test@example.com",
  password: "password123",
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParam = searchParams?.get("next");
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const { setIsLoading } = useLoadingStore();
  const { resolvedTheme } = useThemeStore();
  const isDark = resolvedTheme === "dark";
  const [form, setForm] = useState<LoginInput>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginInput, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Animated background particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  function validateRealtime(next: Partial<LoginInput>) {
    const data = { ...form, ...next };
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      const newErrors: typeof errors = {};
      result.error.issues.forEach((i) => {
        const k = i.path[0] as keyof LoginInput;
        newErrors[k] = i.message;
      });
      setErrors(newErrors);
    } else {
      setErrors({});
    }
  }

  const redirectAfterAuth = () => {
    setIsLoading(true);
    router.replace(nextParam || "/admin/dashboard");
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = loginSchema.safeParse(form);
    if (!parsed.success) {
      validateRealtime({});
      return;
    }

    let loadingToast: string | number | undefined;
    try {
      loadingToast = toast.loading("Authenticating...", {
        description: "Please wait while we verify your credentials",
      });

      const res = await login(form).unwrap();

      const requiresOtp = Boolean((res as any)?.requires_otp ?? (res as any)?.data?.requires_otp);
      if (requiresOtp) {
        setErrors({});
        // Clear any stale FE session to avoid middleware redirecting to dashboard
        clearFeSession();
        toast.message("OTP required", {
          description: "Check your email for the 6-digit code to continue",
        });
        const qs = new URLSearchParams();
        qs.set("email", form.email);
        if (nextParam) qs.set("next", nextParam);
        router.replace(`/otp?${qs.toString()}`);
        return;
      }

      // If no OTP required, mark FE session now
      setFeSession();
      toast.success("Login Successful!", {
        description: "Welcome back! Redirecting to dashboard...",
      });
      redirectAfterAuth();
    } catch (error: any) {
      const msg = error?.data?.message || "Invalid email or password";
      setErrors({ email: msg, password: msg });
      toast.error("Login Failed", { description: msg });
    } finally {
      if (loadingToast !== undefined) toast.dismiss(loadingToast as any);
    }
  }

  const handleCopyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);

    toast.success("Copied!", {
      description: `${field === "email" ? "Email" : "Password"} copied to clipboard`,
    });
  };

  const fillDemoCredentials = () => {
    setForm(DEMO_CREDENTIALS);
    setErrors({});

    toast.success("Demo Credentials Filled!", {
      description: "You can now click 'Access Dashboard' to login",
    });
  };

  const steps = [
    { icon: Shield, text: "Secure Authentication" },
    { icon: Zap, text: "Lightning Fast" },
    { icon: Globe, text: "Global Access" },
  ];

  const buttonIsLoading = isLoginLoading;

  return (
    <div
      className={cn(
        "relative min-h-screen overflow-hidden transition-colors duration-500",
        isDark
          ? "bg-gradient-to-bl from-gray-900 via-gray-950 to-gray-900"
          : "bg-gradient-to-bl from-[#E0F2FF] via-white to-[#B3E0FF]",
      )}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Primary gradient orbs */}
        <div
          className={cn(
            "absolute top-0 left-0 h-96 w-96 animate-pulse rounded-full blur-3xl transition-opacity duration-500",
            isDark
              ? "bg-gradient-to-r from-blue-600/30 to-cyan-600/30"
              : "bg-gradient-to-r from-blue-400 to-cyan-400",
          )}
        />
        <div
          className={cn(
            "absolute right-0 bottom-0 h-96 w-96 animate-pulse rounded-full blur-3xl transition-opacity delay-1000 duration-500",
            isDark
              ? "bg-gradient-to-r from-cyan-600/30 to-blue-600/30"
              : "bg-gradient-to-r from-cyan-400 to-blue-400",
          )}
        />
        <div
          className={cn(
            "absolute top-1/2 left-1/2 h-64 w-64 animate-pulse rounded-full blur-2xl transition-opacity delay-500 duration-500",
            isDark
              ? "bg-gradient-to-r from-blue-700/20 to-cyan-700/20"
              : "bg-gradient-to-r from-blue-300 to-cyan-300",
          )}
        />

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={cn(
              "absolute h-1 w-1 rounded-full transition-colors duration-500",
              isDark ? "bg-blue-400" : "bg-blue-700",
            )}
            style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}

        {/* Grid pattern */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            isDark ? "opacity-[0.08]" : "opacity-[0.03]",
          )}
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${isDark ? "rgba(96, 165, 250, 0.3)" : "#1f2937"} 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Branding & Features */}
        <div className="hidden flex-col justify-center px-12 lg:flex lg:w-1/2 xl:px-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            {/* Logo */}
            <div className="mb-8 flex items-center gap-4">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-400">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h1
                  className={cn(
                    "bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent transition-colors duration-500",
                    isDark ? "from-gray-100 to-gray-400" : "from-gray-900 to-gray-500",
                  )}
                >
                  ModernFlow
                </h1>
                <p
                  className={cn(
                    "text-sm transition-colors duration-500",
                    isDark ? "text-gray-400" : "text-gray-600",
                  )}
                >
                  Next-Gen Dashboard
                </p>
              </div>
            </div>

            {/* Headline */}
            <h2
              className={cn(
                "mb-6 text-4xl leading-tight font-bold transition-colors duration-500 xl:text-5xl",
                isDark ? "text-gray-100" : "text-gray-900",
              )}
            >
              Welcome to the
              <span
                className={cn(
                  "block bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-500",
                  isDark
                    ? "from-blue-400 via-cyan-300 to-blue-400"
                    : "from-blue-600 via-gray-800 to-cyan-600",
                )}
              >
                Future of Admin
              </span>
            </h2>

            <p
              className={cn(
                "mb-8 text-lg leading-relaxed transition-colors duration-500",
                isDark ? "text-gray-300" : "text-gray-700",
              )}
            >
              Experience the most advanced admin dashboard with AI-powered insights, real-time
              analytics, and seamless workflow management.
            </p>

            {/* Animated Steps */}
            <div className="mb-8 space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === index;
                return (
                  <motion.div
                    key={index}
                    className={cn(
                      "flex items-center gap-4 rounded-2xl p-4 transition-all duration-500",
                      isActive
                        ? isDark
                          ? "border border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-cyan-900/30"
                          : "border border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50"
                        : isDark
                          ? "border border-gray-700 bg-gray-900/50"
                          : "border border-gray-200 bg-white",
                    )}
                    animate={{ scale: isActive ? 1.02 : 1 }}
                  >
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500",
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                          : isDark
                            ? "bg-gray-800"
                            : "bg-gray-100",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-6 w-6 transition-all duration-500",
                          isActive ? "text-white" : isDark ? "text-gray-400" : "text-gray-500",
                        )}
                      />
                    </div>
                    <div>
                      <p
                        className={cn(
                          "font-semibold transition-all duration-500",
                          isActive
                            ? isDark
                              ? "text-gray-100"
                              : "text-gray-900"
                            : isDark
                              ? "text-gray-300"
                              : "text-gray-700",
                        )}
                      >
                        {step.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div>
                <p
                  className={cn(
                    "text-2xl font-bold transition-colors duration-500",
                    isDark ? "text-gray-100" : "text-gray-900",
                  )}
                >
                  50K+
                </p>
                <p
                  className={cn(
                    "text-sm transition-colors duration-500",
                    isDark ? "text-gray-400" : "text-gray-600",
                  )}
                >
                  Active Users
                </p>
              </div>
              <div>
                <p
                  className={cn(
                    "text-2xl font-bold transition-colors duration-500",
                    isDark ? "text-gray-100" : "text-gray-900",
                  )}
                >
                  99.9%
                </p>
                <p
                  className={cn(
                    "text-sm transition-colors duration-500",
                    isDark ? "text-gray-400" : "text-gray-600",
                  )}
                >
                  Uptime
                </p>
              </div>
              <div>
                <p
                  className={cn(
                    "text-2xl font-bold transition-colors duration-500",
                    isDark ? "text-gray-100" : "text-gray-900",
                  )}
                >
                  24/7
                </p>
                <p
                  className={cn(
                    "text-sm transition-colors duration-500",
                    isDark ? "text-gray-400" : "text-gray-600",
                  )}
                >
                  Support
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex w-full items-center justify-center p-4 lg:w-1/2 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md"
          >
            <Card
              className={cn(
                "border shadow-2xl backdrop-blur-xl transition-colors duration-500",
                isDark ? "border-gray-700 bg-gray-900/95" : "border-gray-200 bg-white",
              )}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <CardContent className="p-8">
                {/* Header */}
                <div className="mb-8 text-center">
                  <motion.div
                    animate={{ rotate: isHovered ? 360 : 0 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25"
                  >
                    <Zap className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3
                    className={cn(
                      "mb-2 text-2xl font-bold transition-colors duration-500",
                      isDark ? "text-gray-100" : "text-gray-900",
                    )}
                  >
                    Sign In
                  </h3>
                  <p
                    className={cn(
                      "transition-colors duration-500",
                      isDark ? "text-gray-400" : "text-gray-600",
                    )}
                  >
                    Enter your credentials to continue
                  </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Label
                      htmlFor="email"
                      className={cn(
                        "mb-2 block font-medium transition-colors duration-500",
                        isDark ? "text-gray-200" : "text-gray-900",
                      )}
                    >
                      Email Address
                    </Label>
                    <div className="group relative">
                      <Mail
                        className={cn(
                          "absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform transition-colors group-focus-within:text-blue-500",
                          isDark ? "text-gray-500" : "text-gray-400",
                        )}
                      />
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => {
                          const v = e.target.value;
                          setForm((f) => ({ ...f, email: v }));
                          validateRealtime({ email: v });
                        }}
                        placeholder="Enter your email"
                        className={cn(
                          "h-14 pl-12 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                          isDark
                            ? "border-gray-600 bg-gray-800 text-gray-100 placeholder:text-gray-500"
                            : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400",
                          errors.email &&
                            "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                        )}
                        disabled={buttonIsLoading}
                      />
                      {form.email && !errors.email && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-1/2 right-4 -translate-y-1/2 transform"
                        >
                          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                        </motion.div>
                      )}
                    </div>
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-2 flex items-center gap-2 text-sm text-red-500"
                        >
                          <div className="h-1 w-1 rounded-full bg-red-500" />
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Password Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Label
                      htmlFor="password"
                      className={cn(
                        "mb-2 block font-medium transition-colors duration-500",
                        isDark ? "text-gray-200" : "text-gray-900",
                      )}
                    >
                      Password
                    </Label>
                    <div className="group relative">
                      <Lock
                        className={cn(
                          "absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform transition-colors group-focus-within:text-blue-500",
                          isDark ? "text-gray-500" : "text-gray-400",
                        )}
                      />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={(e) => {
                          const v = e.target.value;
                          setForm((f) => ({ ...f, password: v }));
                          validateRealtime({ password: v });
                        }}
                        placeholder="Enter your password"
                        className={cn(
                          "h-14 pr-12 pl-12 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                          isDark
                            ? "border-gray-600 bg-gray-800 text-gray-100 placeholder:text-gray-500"
                            : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400",
                          errors.password &&
                            "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                        )}
                        disabled={buttonIsLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={buttonIsLoading}
                        className={cn(
                          "absolute top-1/2 right-4 -translate-y-1/2 transform transition-colors hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50",
                          isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400",
                        )}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                      {form.password && !errors.password && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-1/2 right-12 -translate-y-1/2 transform"
                        >
                          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                        </motion.div>
                      )}
                    </div>
                    <AnimatePresence>
                      {errors.password && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-2 flex items-center gap-2 text-sm text-red-500"
                        >
                          <div className="h-1 w-1 rounded-full bg-red-500" />
                          {errors.password}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div whileTap={{ scale: 0.98 }} transition={{ duration: 0.1 }}>
                      <Button
                        type="submit"
                        disabled={buttonIsLoading}
                        className="group relative h-14 w-full overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 text-lg font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:from-blue-600 hover:to-cyan-600 hover:shadow-xl hover:shadow-blue-500/40 disabled:cursor-not-allowed disabled:opacity-90"
                      >
                        {/* Background shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        {/* Pulsing effect when loading */}
                        {buttonIsLoading && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-cyan-400/30"
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          />
                        )}

                        {/* Loading overlay */}
                        <AnimatePresence mode="wait">
                          {buttonIsLoading ? (
                            <motion.div
                              key="loading"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.3 }}
                              className="flex items-center gap-3"
                            >
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Loader2 className="h-5 w-5 text-white" />
                              </motion.div>

                              <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15, duration: 0.3 }}
                                className="relative"
                              >
                                Signing In
                                <motion.span
                                  animate={{ opacity: [0, 1, 0] }}
                                  transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                  className="ml-1"
                                >
                                  ...
                                </motion.span>
                              </motion.span>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="default"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.3 }}
                              className="flex items-center gap-2"
                            >
                              <span>Access Dashboard</span>
                              <motion.div
                                animate={{ x: [0, 4, 0] }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: 1,
                                }}
                              >
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>

                {/* Demo Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className={cn(
                    "mt-8 border-t pt-6 transition-colors duration-500",
                    isDark ? "border-gray-700" : "border-gray-200",
                  )}
                >
                  <div className="mb-4 text-center">
                    <div className="mb-3 flex items-center justify-center gap-3">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <p
                        className={cn(
                          "font-medium transition-colors duration-500",
                          isDark ? "text-gray-200" : "text-gray-900",
                        )}
                      >
                        Try Demo Account
                      </p>
                      <Star className="h-4 w-4 text-yellow-500" />
                    </div>
                    <p
                      className={cn(
                        "text-sm transition-colors duration-500",
                        isDark ? "text-gray-400" : "text-gray-600",
                      )}
                    >
                      Experience the full dashboard with sample data
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Demo Credentials Display */}
                    <div
                      className={cn(
                        "rounded-xl border p-4 transition-colors duration-500",
                        isDark
                          ? "border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-cyan-900/30"
                          : "border-blue-500/20 bg-gradient-to-r from-blue-50 to-cyan-50",
                      )}
                    >
                      <div className="space-y-2">
                        <div
                          className={cn(
                            "flex items-center justify-between rounded-lg p-2 transition-colors duration-500",
                            isDark ? "bg-gray-800/50" : "bg-white",
                          )}
                        >
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-blue-500" />
                            <code
                              className={cn(
                                "transition-colors duration-500",
                                isDark ? "text-gray-200" : "text-gray-900",
                              )}
                            >
                              test@example.com
                            </code>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyToClipboard(DEMO_CREDENTIALS.email, "email")}
                            className={cn(
                              "h-8 w-8 p-0 transition-colors hover:text-gray-700",
                              isDark
                                ? "text-gray-500 hover:bg-gray-700 hover:text-gray-300"
                                : "text-gray-500 hover:bg-gray-50",
                            )}
                            disabled={buttonIsLoading}
                          >
                            {copiedField === "email" ? (
                              <Check className="h-4 w-4 text-emerald-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>

                        <div
                          className={cn(
                            "flex items-center justify-between rounded-lg p-2 transition-colors duration-500",
                            isDark ? "bg-gray-800/50" : "bg-white",
                          )}
                        >
                          <div className="flex items-center gap-2 text-sm">
                            <Lock className="h-4 w-4 text-blue-500" />
                            <code
                              className={cn(
                                "transition-colors duration-500",
                                isDark ? "text-gray-200" : "text-gray-900",
                              )}
                            >
                              password123
                            </code>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleCopyToClipboard(DEMO_CREDENTIALS.password, "password")
                            }
                            className={cn(
                              "h-8 w-8 p-0 transition-colors hover:text-gray-700",
                              isDark
                                ? "text-gray-500 hover:bg-gray-700 hover:text-gray-300"
                                : "text-gray-500 hover:bg-gray-50",
                            )}
                            disabled={buttonIsLoading}
                          >
                            {copiedField === "password" ? (
                              <Check className="h-4 w-4 text-emerald-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Auto-fill Button */}
                    <Button
                      type="button"
                      onClick={fillDemoCredentials}
                      variant="outline"
                      className={cn(
                        "w-full border-blue-500/30 text-blue-600 transition-all hover:border-blue-500/50",
                        isDark ? "hover:bg-blue-900/20 dark:text-blue-400" : "hover:bg-blue-50",
                      )}
                      disabled={buttonIsLoading}
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      Auto-fill Demo Credentials
                    </Button>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
