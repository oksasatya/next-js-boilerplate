import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Shield, Rocket, Palette, Sparkles, Stars, Crown } from "lucide-react";

export default function HomePage() {
  return (
    <div className="gradient-bg-primary relative min-h-screen overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="gradient-modern float-slow absolute top-20 left-10 h-40 w-40 rounded-full opacity-20 blur-3xl" />
        <div className="from-accent/30 to-secondary/30 float-fast absolute top-60 right-20 h-32 w-32 rounded-full bg-gradient-to-r blur-2xl" />
        <div className="from-primary/25 to-accent/25 pulse-gentle absolute bottom-32 left-1/4 h-48 w-48 rounded-full bg-gradient-to-r blur-3xl" />

        {/* Floating particles */}
        <div className="bg-primary absolute top-1/4 left-3/4 h-2 w-2 animate-ping rounded-full" />
        <div className="bg-accent absolute top-3/4 left-1/4 h-3 w-3 animate-pulse rounded-full" />
        <div className="bg-secondary absolute top-1/2 right-1/4 h-1 w-1 animate-bounce rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Enhanced Header */}
        <div className="mb-20 text-center">
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="relative">
              <div className="gradient-modern shadow-primary/30 neon-glow flex h-16 w-16 items-center justify-center rounded-2xl shadow-2xl">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div className="bg-accent absolute -top-2 -right-2 flex h-6 w-6 animate-pulse items-center justify-center rounded-full">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            </div>
            <h1 className="from-primary via-secondary to-accent bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent">
              ModernFlow
            </h1>
          </div>
          <p className="text-muted-foreground mx-auto mb-6 max-w-3xl text-xl leading-relaxed">
            Experience the future of admin dashboards with vibrant colors, modern design, and
            cutting-edge technologies that bring your data to life.
          </p>
          <div className="flex justify-center gap-2">
            <Badge
              variant="outline"
              className="bg-primary/10 border-primary/20 text-primary px-3 py-1"
            >
              <Crown className="mr-1 h-3 w-3" />
              Premium UI
            </Badge>
            <Badge
              variant="outline"
              className="bg-secondary/10 border-secondary/20 text-secondary px-3 py-1"
            >
              <Stars className="mr-1 h-3 w-3" />
              Modern Design
            </Badge>
          </div>
        </div>

        {/* Enhanced Feature Cards */}
        <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Rocket,
              title: "Next.js 15",
              desc: "App Router + React 19",
              gradient: "from-primary to-secondary",
              bgColor: "bg-primary/5",
            },
            {
              icon: Palette,
              title: "Vibrant UI",
              desc: "Modern Colorful Design",
              gradient: "from-secondary to-accent",
              bgColor: "bg-secondary/5",
            },
            {
              icon: Shield,
              title: "Type Safe",
              desc: "Full TypeScript Support",
              gradient: "from-accent to-primary",
              bgColor: "bg-accent/5",
            },
            {
              icon: Sparkles,
              title: "Animations",
              desc: "Smooth & Performant",
              gradient: "from-primary via-accent to-secondary",
              bgColor: "bg-gradient-to-r from-primary/5 to-accent/5",
            },
          ].map((feature, index) => (
            <Card key={index} className="modern-card-hover group">
              <CardContent className="relative overflow-hidden p-8 text-center">
                {/* Background decoration */}
                <div
                  className={`absolute inset-0 ${feature.bgColor} opacity-50 transition-opacity group-hover:opacity-70`}
                />

                <div className="relative z-10">
                  <div
                    className={`h-14 w-14 rounded-2xl bg-gradient-to-r ${feature.gradient} mx-auto mb-6 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="group-hover:text-primary mb-3 text-lg font-bold transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Tech Stack with colorful badges */}
        <div className="mb-16 text-center">
          <h2 className="from-primary to-secondary mb-8 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
            Built with Modern Stack
          </h2>
          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-4">
            {[
              { name: "Next.js 15", color: "bg-primary" },
              { name: "React 19", color: "bg-secondary" },
              { name: "TypeScript", color: "bg-accent" },
              { name: "Tailwind v4", color: "bg-primary" },
              { name: "shadcn/ui", color: "bg-secondary" },
              { name: "RTK Query", color: "bg-accent" },
              { name: "Zod", color: "bg-success" },
              { name: "Framer Motion", color: "bg-warning" },
              { name: "react-i18next", color: "bg-primary" },
              { name: "Recharts", color: "bg-secondary" },
              { name: "DM Sans", color: "bg-accent" },
            ].map((tech, index) => (
              <Badge
                key={tech.name}
                className={`cursor-default border-0 px-4 py-2 text-white shadow-lg transition-transform hover:scale-105 ${tech.color}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {tech.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          <div className="mx-auto max-w-lg space-y-6">
            <div className="glass-card rounded-3xl p-8">
              <h3 className="from-primary to-accent mb-4 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
                Ready to Experience the Future?
              </h3>
              <p className="text-muted-foreground mb-6">
                Dive into a dashboard that combines beautiful design with powerful functionality
              </p>

              <Link href="/login">
                <Button size="lg" className="btn-modern h-14 w-full text-lg font-semibold">
                  Launch Dashboard
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>

              <div className="text-muted-foreground mt-4 flex items-center justify-center gap-2 text-sm">
                <div className="status-online h-2 w-2 rounded-full" />
                Demo: test@example.com / password123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
