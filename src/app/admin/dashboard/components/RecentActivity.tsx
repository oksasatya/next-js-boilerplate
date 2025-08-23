"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShoppingCart, UserPlus, TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useThemeStore } from "@/lib/theme-store";
import { cn } from "@/lib/utils";

const recentActivities = [
  {
    id: 1,
    user: "Sarah Chen",
    avatar: "/avatars/sarah.jpg",
    action: "made a purchase",
    item: "Premium Plan Subscription",
    amount: "$99.00",
    time: "2 minutes ago",
    type: "purchase",
    icon: ShoppingCart,
    iconBg: "bg-gradient-primary",
  },
  {
    id: 2,
    user: "Marcus Johnson",
    avatar: "/avatars/marcus.jpg",
    action: "signed up",
    item: "New user registration",
    amount: null,
    time: "5 minutes ago",
    type: "signup",
    icon: UserPlus,
    iconBg: "bg-gradient-to-r from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    user: "Emma Wilson",
    avatar: "/avatars/emma.jpg",
    action: "upgraded account",
    item: "Business Plan",
    amount: "$299.00",
    time: "12 minutes ago",
    type: "upgrade",
    icon: TrendingUp,
    iconBg: "bg-gradient-to-r from-violet-500 to-purple-500",
  },
  {
    id: 4,
    user: "David Rodriguez",
    avatar: "/avatars/david.jpg",
    action: "reported an issue",
    item: "Payment processing error",
    amount: null,
    time: "18 minutes ago",
    type: "issue",
    icon: AlertCircle,
    iconBg: "bg-gradient-to-r from-orange-500 to-red-500",
  },
  {
    id: 5,
    user: "Lisa Thompson",
    avatar: "/avatars/lisa.jpg",
    action: "completed onboarding",
    item: "Setup wizard finished",
    amount: null,
    time: "25 minutes ago",
    type: "completed",
    icon: CheckCircle,
    iconBg: "bg-gradient-to-r from-green-500 to-emerald-500",
  },
];

const getActivityBadge = (type: string, isDark: boolean) => {
  const baseClasses = "border-0 transition-colors duration-300";

  switch (type) {
    case "purchase":
      return (
        <Badge
          className={cn(
            baseClasses,
            isDark
              ? "bg-blue-900/30 text-blue-300"
              : "bg-gradient-primary-subtle text-[var(--gradient-to)]",
          )}
        >
          Purchase
        </Badge>
      );
    case "signup":
      return (
        <Badge
          className={cn(
            baseClasses,
            isDark ? "bg-blue-900/30 text-blue-300" : "bg-blue-50 text-blue-600",
          )}
        >
          New User
        </Badge>
      );
    case "upgrade":
      return (
        <Badge
          className={cn(
            baseClasses,
            isDark ? "bg-purple-900/30 text-purple-300" : "bg-purple-50 text-purple-600",
          )}
        >
          Upgrade
        </Badge>
      );
    case "issue":
      return (
        <Badge
          className={cn(
            baseClasses,
            isDark ? "bg-red-900/30 text-red-300" : "bg-red-50 text-red-600",
          )}
        >
          Issue
        </Badge>
      );
    case "completed":
      return (
        <Badge
          className={cn(
            baseClasses,
            isDark ? "bg-emerald-900/30 text-emerald-300" : "bg-emerald-50 text-emerald-600",
          )}
        >
          Completed
        </Badge>
      );
    default:
      return (
        <Badge
          className={cn(
            baseClasses,
            isDark ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-600",
          )}
        >
          Activity
        </Badge>
      );
  }
};

export function RecentActivity() {
  const { resolvedTheme } = useThemeStore();
  const isDark = resolvedTheme === "dark";

  return (
    <Card
      className={cn(
        "shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl",
        isDark ? "border-gray-700 bg-gray-900/95" : "border-gray-200/80 bg-white/95",
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle
              className={cn(
                "text-xl font-bold transition-colors duration-300",
                isDark ? "text-gray-100" : "text-gray-900",
              )}
            >
              Recent Activity
            </CardTitle>
            <p
              className={cn(
                "mt-1 text-sm transition-colors duration-300",
                isDark ? "text-gray-400" : "text-gray-500",
              )}
            >
              Latest user interactions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-primary h-2 w-2 animate-pulse rounded-full"></div>
            <span
              className={cn(
                "text-xs transition-colors duration-300",
                isDark ? "text-gray-400" : "text-gray-500",
              )}
            >
              Live
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {recentActivities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "group flex cursor-pointer items-center space-x-4 rounded-lg p-3 transition-colors duration-200",
                isDark ? "hover:bg-gray-800/50" : "hover:bg-gray-50/50",
              )}
            >
              {/* User Avatar */}
              <Avatar className="h-10 w-10 ring-2 ring-[var(--gradient-from)]/20">
                <AvatarImage src={activity.avatar} alt={activity.user} />
                <AvatarFallback className="bg-gradient-primary text-sm font-semibold text-white">
                  {activity.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              {/* Activity Icon */}
              <div className={cn("rounded-lg p-2 shadow-sm", activity.iconBg)}>
                <Icon className="h-4 w-4 text-white" />
              </div>

              {/* Activity Details */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p
                    className={cn(
                      "truncate text-sm font-medium transition-colors duration-300",
                      isDark ? "text-gray-100" : "text-gray-900",
                    )}
                  >
                    <span className="font-semibold">{activity.user}</span>
                    <span
                      className={cn(
                        "ml-1 font-normal transition-colors duration-300",
                        isDark ? "text-gray-300" : "text-gray-600",
                      )}
                    >
                      {activity.action}
                    </span>
                  </p>
                  {activity.amount && (
                    <span className="text-gradient-primary text-sm font-semibold">
                      {activity.amount}
                    </span>
                  )}
                </div>

                <div className="mt-1 flex items-center justify-between">
                  <p
                    className={cn(
                      "truncate text-xs transition-colors duration-300",
                      isDark ? "text-gray-400" : "text-gray-500",
                    )}
                  >
                    {activity.item}
                  </p>
                  <div className="flex flex-shrink-0 items-center gap-2">
                    {getActivityBadge(activity.type, isDark)}
                  </div>
                </div>

                <div className="mt-1 flex items-center gap-1">
                  <Clock
                    className={cn(
                      "h-3 w-3 transition-colors duration-300",
                      isDark ? "text-gray-500" : "text-gray-400",
                    )}
                  />
                  <span
                    className={cn(
                      "text-xs transition-colors duration-300",
                      isDark ? "text-gray-500" : "text-gray-400",
                    )}
                  >
                    {activity.time}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Footer */}
        <div
          className={cn(
            "border-t pt-4 text-center transition-colors duration-300",
            isDark ? "border-gray-700" : "border-gray-200",
          )}
        >
          <p
            className={cn(
              "text-xs transition-colors duration-300",
              isDark ? "text-gray-400" : "text-gray-500",
            )}
          >
            Showing latest 5 activities
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
