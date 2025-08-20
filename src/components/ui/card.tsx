import * as React from "react";

import { cn } from "@/lib/utils";

function Card({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "default" | "gradient" | "glass" | "hover" | "glow";
}) {
  return (
    <div
      data-slot="card"
      className={cn(
        "relative flex flex-col gap-6 overflow-hidden rounded-2xl border py-6 shadow-sm transition-all duration-300",
        {
          "modern-card": variant === "default",
          "modern-card-gradient border-primary/20 shadow-primary/10 shadow-lg":
            variant === "gradient",
          "glass-card": variant === "glass",
          "modern-card-hover": variant === "hover",
          "modern-card border-primary/30 shadow-primary/15 neon-glow shadow-lg": variant === "glow",
        },
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header relative grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm leading-relaxed", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("relative px-6", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

// Enhanced Card variants for specific use cases
function KPICard({
  className,
  gradient = "from-blue-500 to-cyan-500",
  icon: Icon,
  value,
  label,
  change,
  isPositive = true,
  ...props
}: React.ComponentProps<"div"> & {
  gradient?: string;
  icon?: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  change?: string;
  isPositive?: boolean;
}) {
  return (
    <Card variant="hover" className={cn("group", className)} {...props}>
      {/* Background decoration */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 transition-opacity group-hover:opacity-10`}
      />

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
            {label}
          </CardTitle>
          {Icon && (
            <div
              className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
            >
              <Icon className="h-6 w-6 text-white" />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="text-foreground text-3xl font-bold">{value}</div>
          {change && (
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "rounded-lg px-2 py-1 text-sm font-semibold",
                  isPositive
                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                    : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
                )}
              >
                {change}
              </span>
              <span className="text-muted-foreground text-xs">vs last month</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function GlassCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("glass-card relative overflow-hidden rounded-2xl p-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  KPICard,
  GlassCard,
};
