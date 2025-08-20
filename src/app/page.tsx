import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Shield,
  Rocket,
  Palette,
  Sparkles,
  Crown,
  Play,
  CheckCircle,
  TrendingUp,
  Users,
  BarChart3,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Modern Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/20 blur-xl" />
        <div
          className="absolute top-40 right-20 h-24 w-24 animate-bounce rounded-full bg-gradient-to-br from-purple-500/20 to-pink-400/20 blur-lg"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-1/3 h-40 w-40 animate-pulse rounded-full bg-gradient-to-br from-emerald-500/15 to-teal-400/15 blur-2xl"
          style={{ animationDelay: "2s" }}
        />

        {/* Grid pattern */}
        <div className="bg-grid-black/[0.02] absolute inset-0 bg-[size:60px_60px]" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-blue-50/80" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-20 pb-16">
          <div className="mx-auto max-w-5xl text-center">
            {/* Badge */}
            <div className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200/50 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-sm font-medium text-blue-700">
                New: Next.js 15 with App Router
              </span>
            </div>

            {/* Hero Title */}
            <h1
              className="animate-fade-in-up mb-8 text-6xl font-bold md:text-7xl lg:text-8xl"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text leading-tight text-transparent">
                Modern
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>

            {/* Hero Subtitle */}
            <p
              className="animate-fade-in-up mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl"
              style={{ animationDelay: "0.4s" }}
            >
              Experience the future of admin interfaces with
              <span className="font-semibold text-blue-600"> beautiful design</span>,
              <span className="font-semibold text-cyan-600"> smooth animations</span>, and
              <span className="font-semibold text-indigo-600"> powerful features</span>.
            </p>

            {/* CTA Buttons */}
            <div
              className="animate-fade-in-up mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
              style={{ animationDelay: "0.6s" }}
            >
              <Link href="/login">
                <Button
                  size="lg"
                  className="h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-8 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl hover:shadow-blue-500/30"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Try Live Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="h-14 rounded-2xl border-2 border-gray-200 bg-white/80 px-8 font-semibold transition-all duration-300 hover:border-blue-300 hover:bg-white hover:shadow-lg"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                View Features
              </Button>
            </div>

            {/* Demo Credentials */}
            <div
              className="animate-fade-in-up inline-flex items-center gap-3 rounded-full border border-gray-200/50 bg-white/60 px-6 py-3 backdrop-blur-sm"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-sm text-gray-600">
                <span className="font-medium">Demo:</span> test@example.com / password123
              </span>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-6 py-16">
          <div className="mb-16 text-center">
            <h2 className="mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Built for Modern Teams
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Everything you need to create stunning admin dashboards with the latest technologies.
            </p>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Rocket,
                title: "Lightning Fast",
                description: "Built with Next.js 15 and React 19 for optimal performance",
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50",
                delay: "0s",
              },
              {
                icon: Palette,
                title: "Beautiful Design",
                description: "Modern UI components with smooth animations and transitions",
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-50 to-pink-50",
                delay: "0.1s",
              },
              {
                icon: Shield,
                title: "Type Safe",
                description: "Full TypeScript support with Zod validation schemas",
                gradient: "from-emerald-500 to-teal-500",
                bgGradient: "from-emerald-50 to-teal-50",
                delay: "0.2s",
              },
              {
                icon: TrendingUp,
                title: "Analytics Ready",
                description: "Built-in charts and metrics for data visualization",
                gradient: "from-orange-500 to-red-500",
                bgGradient: "from-orange-50 to-red-50",
                delay: "0.3s",
              },
              {
                icon: Users,
                title: "Multi-language",
                description: "Internationalization support with react-i18next",
                gradient: "from-indigo-500 to-purple-500",
                bgGradient: "from-indigo-50 to-purple-50",
                delay: "0.4s",
              },
              {
                icon: Sparkles,
                title: "Developer Experience",
                description: "Hot reload, TypeScript, ESLint, and Prettier configured",
                gradient: "from-yellow-500 to-orange-500",
                bgGradient: "from-yellow-50 to-orange-50",
                delay: "0.5s",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group animate-fade-in-up relative overflow-hidden border-0 bg-white/60 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/80 hover:shadow-2xl hover:shadow-black/10"
                style={{ animationDelay: feature.delay }}
              >
                <CardContent className="p-8">
                  <div
                    className={`h-16 w-16 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                    {feature.title}
                  </h3>

                  <p className="leading-relaxed text-gray-600">{feature.description}</p>

                  {/* Hover gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-20`}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="container mx-auto px-6 py-16">
          <div className="mb-12 text-center">
            <h2 className="mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-4xl font-bold text-transparent">
              Powered by Modern Stack
            </h2>
            <p className="text-xl text-gray-600">Built with the latest and greatest technologies</p>
          </div>

          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-4">
            {[
              { name: "Next.js 15", color: "bg-black", icon: "⚡" },
              { name: "React 19", color: "bg-blue-600", icon: "⚛️" },
              { name: "TypeScript", color: "bg-blue-700", icon: "📘" },
              { name: "Tailwind CSS", color: "bg-cyan-500", icon: "🎨" },
              { name: "shadcn/ui", color: "bg-gray-800", icon: "🧱" },
              { name: "Zustand", color: "bg-orange-500", icon: "🐻" },
              { name: "React Query", color: "bg-red-500", icon: "🔄" },
              { name: "Zod", color: "bg-purple-600", icon: "✅" },
              { name: "Framer Motion", color: "bg-pink-500", icon: "🎭" },
            ].map((tech, index) => (
              <Badge
                key={tech.name}
                className={`${tech.color} animate-fade-in cursor-default border-0 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="mr-2">{tech.icon}</span>
                {tech.name}
              </Badge>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto mb-16 px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white shadow-2xl">
              <CardContent className="relative z-10 p-12 text-center">
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative">
                  <Crown className="mx-auto mb-6 h-16 w-16 text-yellow-300" />
                  <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                    Ready to Build Something Amazing?
                  </h2>
                  <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
                    Join thousands of developers who trust our modern dashboard solution. Get
                    started in minutes, not hours.
                  </p>

                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link href="/login">
                      <Button
                        size="lg"
                        className="h-14 rounded-2xl bg-white px-8 font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-xl"
                      >
                        <Rocket className="mr-2 h-5 w-5" />
                        Start Building Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-8 flex items-center justify-center gap-6 text-sm opacity-80">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      No credit card required
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      Free demo access
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      Setup in 5 minutes
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
