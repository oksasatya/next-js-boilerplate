"use client";
import { loginSchema, type LoginInput } from "@/features/auth/schemas";
import { useLoginMutation } from "@/features/auth/api";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

const DEMO_CREDENTIALS = {
  email: "test@example.com",
  password: "password123",
};

export default function LoginPage() {
  const router = useRouter();
  const [, { isLoading }] = useLoginMutation();
  const [form, setForm] = useState<LoginInput>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginInput, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = loginSchema.safeParse(form);
    if (!parsed.success) {
      validateRealtime({});
      return;
    }

    // Mock login success for demo credentials
    if (form.email === DEMO_CREDENTIALS.email && form.password === DEMO_CREDENTIALS.password) {
      try {
        setIsSubmitting(true);

        // Show loading toast
        const loadingToast = toast.loading("Authenticating...", {
          description: "Please wait while we verify your credentials",
        });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success("Login Successful!", {
          description: "Welcome back! Redirecting to dashboard...",
        });

        // Small delay before redirect to show success message
        setTimeout(() => {
          router.replace("/admin/dashboard");
        });

        return;
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Login Failed", {
          description: "Something went wrong. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // For non-demo credentials, show error
      setErrors({ password: "Invalid credentials. Please use the demo account below." });
      toast.error("Invalid Credentials", {
        description: "Please use the demo account provided below.",
      });
    }
  }

  const handleCopyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);

    // Show toast feedback
    toast.success("Copied!", {
      description: `${field === "email" ? "Email" : "Password"} copied to clipboard`,
    });
  };

  const fillDemoCredentials = () => {
    setForm(DEMO_CREDENTIALS);
    setErrors({});

    // Show toast feedback
    toast.success("Demo Credentials Filled!", {
      description: "You can now click 'Access Dashboard' to login",
    });
  };

  const steps = [
    { icon: Shield, text: "Secure Authentication" },
    { icon: Zap, text: "Lightning Fast" },
    { icon: Globe, text: "Global Access" },
  ];

  const buttonIsLoading = isLoading || isSubmitting;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-bl from-[#E0F2FF] via-white to-[#B3E0FF]">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Primary gradient orbs */}
        <div className="absolute top-0 left-0 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 blur-3xl delay-1000" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 animate-pulse rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 blur-2xl delay-500" />

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute h-1 w-1 rounded-full bg-blue-700"
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
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #1f2937 1px, transparent 0)`,
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
                <h1 className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-3xl font-bold text-transparent">
                  ModernFlow
                </h1>
                <p className="text-sm text-gray-600">Next-Gen Dashboard</p>
              </div>
            </div>

            {/* Headline */}
            <h2 className="mb-6 text-4xl leading-tight font-bold text-gray-900 xl:text-5xl">
              Welcome to the
              <span className="block bg-gradient-to-r from-blue-600 via-gray-800 to-cyan-600 bg-clip-text text-transparent">
                Future of Admin
              </span>
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-gray-700">
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
                    className={`flex items-center gap-4 rounded-2xl p-4 transition-all duration-500 ${
                      isActive
                        ? "border border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50"
                        : "border border-gray-200 bg-white"
                    }`}
                    animate={{ scale: isActive ? 1.02 : 1 }}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500 ${
                        isActive ? "bg-gradient-to-r from-blue-500 to-cyan-500" : "bg-gray-100"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 transition-all duration-500 ${
                          isActive ? "text-white" : "text-gray-500"
                        }`}
                      />
                    </div>
                    <div>
                      <p
                        className={`font-semibold transition-all duration-500 ${
                          isActive ? "text-gray-900" : "text-gray-700"
                        }`}
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
                <p className="text-2xl font-bold text-gray-900">50K+</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">99.9%</p>
                <p className="text-sm text-gray-600">Uptime</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">24/7</p>
                <p className="text-sm text-gray-600">Support</p>
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
              className="border border-gray-200 bg-white shadow-2xl backdrop-blur-xl"
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
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">Sign In</h3>
                  <p className="text-gray-600">Enter your credentials to continue</p>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Label htmlFor="email" className="mb-2 block font-medium text-gray-900">
                      Email Address
                    </Label>
                    <div className="group relative">
                      <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400 transition-colors group-focus-within:text-blue-500" />
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
                        className="h-14 border-gray-200 bg-white pl-12 text-gray-900 transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                          className="mt-2 flex items-center gap-2 text-sm text-red-600"
                        >
                          <div className="h-1 w-1 rounded-full bg-red-600" />
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
                    <Label htmlFor="password" className="mb-2 block font-medium text-gray-900">
                      Password
                    </Label>
                    <div className="group relative">
                      <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400 transition-colors group-focus-within:text-blue-500" />
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
                        className="h-14 border-gray-200 bg-white pr-12 pl-12 text-gray-900 transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        disabled={buttonIsLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={buttonIsLoading}
                        className="absolute top-1/2 right-4 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
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
                          className="mt-2 flex items-center gap-2 text-sm text-red-600"
                        >
                          <div className="h-1 w-1 rounded-full bg-red-600" />
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
                              {/* Enhanced Spinning loader with Loader2 icon */}
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Loader2 className="h-5 w-5 text-white" />
                              </motion.div>

                              {/* Loading text with bounce animation */}
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
                  className="mt-8 border-t border-gray-200 pt-6"
                >
                  <div className="mb-4 text-center">
                    <div className="mb-3 flex items-center justify-center gap-3">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <p className="font-medium text-gray-900">Try Demo Account</p>
                      <Star className="h-4 w-4 text-yellow-500" />
                    </div>
                    <p className="text-sm text-gray-600">
                      Experience the full dashboard with sample data
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Demo Credentials Display */}
                    <div className="rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg bg-white p-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-blue-500" />
                            <code className="text-gray-900">test@example.com</code>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyToClipboard(DEMO_CREDENTIALS.email, "email")}
                            className="h-8 w-8 p-0 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            disabled={buttonIsLoading}
                          >
                            {copiedField === "email" ? (
                              <Check className="h-4 w-4 text-emerald-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-white p-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Lock className="h-4 w-4 text-blue-500" />
                            <code className="text-gray-900">password123</code>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleCopyToClipboard(DEMO_CREDENTIALS.password, "password")
                            }
                            className="h-8 w-8 p-0 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
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
                      className="w-full border-blue-500/30 text-blue-600 transition-all hover:border-blue-500/50 hover:bg-blue-50"
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
