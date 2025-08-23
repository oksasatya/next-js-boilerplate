"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Cpu,
  Database,
  HardDrive,
  MemoryStick,
  RefreshCw,
  Server,
  TrendingDown,
  TrendingUp,
  Wifi,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useThemeStore } from "@/lib/theme-store";
import { cn } from "@/lib/utils";

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  status: "healthy" | "warning" | "critical";
  icon: React.ElementType;
  unit?: string;
  trend?: "up" | "down" | "stable";
  lastUpdated: Date;
}

function SystemHealthSkeleton({ isDark }: { isDark: boolean }) {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className={cn(
            "h-6 w-32",
            isDark ? "bg-gray-700" : "bg-gray-200"
          )} />
          <Skeleton className={cn(
            "h-8 w-20",
            isDark ? "bg-gray-700" : "bg-gray-200"
          )} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className={cn(
                "h-8 w-8 rounded",
                isDark ? "bg-gray-700" : "bg-gray-200"
              )} />
              <div className="space-y-1">
                <Skeleton className={cn(
                  "h-4 w-20",
                  isDark ? "bg-gray-700" : "bg-gray-200"
                )} />
                <Skeleton className={cn(
                  "h-3 w-16",
                  isDark ? "bg-gray-700" : "bg-gray-200"
                )} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className={cn(
                "h-2 w-20",
                isDark ? "bg-gray-700" : "bg-gray-200"
              )} />
              <Skeleton className={cn(
                "h-6 w-12",
                isDark ? "bg-gray-700" : "bg-gray-200"
              )} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function SystemHealth() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { resolvedTheme } = useThemeStore();
  const isDark = resolvedTheme === "dark";
  
  // Simulate real-time system metrics
  const generateMetrics = (): SystemMetric[] => {
    return [
      {
        id: "cpu",
        name: "CPU Usage",
        value: Math.floor(Math.random() * 40) + 30, // 30-70%
        status: Math.random() > 0.8 ? "warning" : "healthy",
        icon: Cpu,
        unit: "%",
        trend: Math.random() > 0.5 ? "up" : "down",
        lastUpdated: new Date(),
      },
      {
        id: "memory",
        name: "Memory Usage",
        value: Math.floor(Math.random() * 30) + 50, // 50-80%
        status: Math.random() > 0.9 ? "warning" : "healthy",
        icon: MemoryStick,
        unit: "%",
        trend: Math.random() > 0.5 ? "up" : "stable",
        lastUpdated: new Date(),
      },
      {
        id: "disk",
        name: "Disk Usage",
        value: Math.floor(Math.random() * 20) + 60, // 60-80%
        status: Math.random() > 0.85 ? "warning" : "healthy",
        icon: HardDrive,
        unit: "%",
        trend: "up",
        lastUpdated: new Date(),
      },
      {
        id: "database",
        name: "Database",
        value: Math.floor(Math.random() * 10) + 95, // 95-100% uptime
        status: Math.random() > 0.95 ? "warning" : "healthy",
        icon: Database,
        unit: "%",
        trend: "stable",
        lastUpdated: new Date(),
      },
      {
        id: "network",
        name: "Network",
        value: Math.floor(Math.random() * 5) + 98, // 98-100% uptime
        status: "healthy",
        icon: Wifi,
        unit: "%",
        trend: "stable",
        lastUpdated: new Date(),
      },
      {
        id: "server",
        name: "Server Uptime",
        value: Math.floor(Math.random() * 2) + 99, // 99-100% uptime
        status: "healthy",
        icon: Server,
        unit: "%",
        trend: "stable",
        lastUpdated: new Date(),
      },
    ];
  };
  
  useEffect(() => {
    // Initial load
    setTimeout(() => {
      setMetrics(generateMetrics());
      setIsLoading(false);
    }, 1000);
    
    // Auto refresh every 30 seconds
    const interval = setInterval(() => {
      setMetrics(generateMetrics());
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setMetrics(generateMetrics());
      setIsRefreshing(false);
    }, 1000);
  };
  
  const getStatusColor = (status: SystemMetric["status"]) => {
    switch (status) {
      case "healthy":
        return isDark
          ? "text-emerald-400 bg-emerald-900/30"
          : "text-emerald-600 bg-emerald-50";
      case "warning":
        return isDark
          ? "text-yellow-400 bg-yellow-900/30"
          : "text-yellow-600 bg-yellow-50";
      case "critical":
        return isDark
          ? "text-red-400 bg-red-900/30"
          : "text-red-600 bg-red-50";
      default:
        return isDark
          ? "text-gray-400 bg-gray-800"
          : "text-gray-600 bg-gray-50";
    }
  };
  
  const getProgressColor = (status: SystemMetric["status"]) => {
    switch (status) {
      case "healthy":
        return "bg-gradient-to-r from-emerald-500 to-emerald-600";
      case "warning":
        return "bg-gradient-to-r from-yellow-500 to-yellow-600";
      case "critical":
        return "bg-gradient-to-r from-red-500 to-red-600";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500";
    }
  };
  
  const overallStatus = metrics.some((m) => m.status === "critical")
    ? "critical"
    : metrics.some((m) => m.status === "warning")
      ? "warning"
      : "healthy";
  
  const healthyCount = metrics.filter(m => m.status === "healthy").length;
  const warningCount = metrics.filter(m => m.status === "warning").length;
  const criticalCount = metrics.filter(m => m.status === "critical").length;
  
  if (isLoading) {
    return <SystemHealthSkeleton isDark={isDark} />;
  }
  
  return (
    <Card className={cn(
      "shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl",
      isDark
        ? "border-gray-700 bg-gray-900/95"
        : "border-gray-200/80 bg-white/95"
    )}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "rounded-lg p-2",
                overallStatus === "healthy"
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
                  : overallStatus === "warning"
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                    : "bg-gradient-to-r from-red-500 to-red-600"
              )}
            >
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className={cn(
                "text-xl transition-colors duration-300",
                isDark ? "text-gray-100" : "text-gray-900"
              )}>
                System Health
              </CardTitle>
              <p className={cn(
                "mt-1 text-sm transition-colors duration-300",
                isDark ? "text-gray-400" : "text-gray-500"
              )}>
                Real-time system monitoring
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className={cn(
              "border-0 font-medium transition-colors duration-300",
              getStatusColor(overallStatus)
            )}>
              {overallStatus === "healthy" && <CheckCircle className="mr-1 h-3 w-3" />}
              {overallStatus === "warning" && <AlertTriangle className="mr-1 h-3 w-3" />}
              {overallStatus === "critical" && <AlertTriangle className="mr-1 h-3 w-3" />}
              {overallStatus.charAt(0).toUpperCase() + overallStatus.slice(1)}
            </Badge>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={cn(
                "transition-all duration-200",
                isDark
                  ? "border-gray-600 hover:bg-gray-800"
                  : "hover:bg-gradient-primary-hover"
              )}
            >
              <RefreshCw className={`mr-1 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className={cn(
          "grid grid-cols-3 gap-4 rounded-lg p-4",
          isDark ? "bg-gray-800/30" : "bg-gray-50/50"
        )}>
          <div className="text-center">
            <p className={cn(
              "text-2xl font-bold",
              isDark ? "text-emerald-400" : "text-emerald-600"
            )}>
              {healthyCount}
            </p>
            <p className={cn(
              "text-xs",
              isDark ? "text-gray-400" : "text-gray-500"
            )}>
              Healthy
            </p>
          </div>
          <div className="text-center">
            <p className={cn(
              "text-2xl font-bold",
              isDark ? "text-yellow-400" : "text-yellow-600"
            )}>
              {warningCount}
            </p>
            <p className={cn(
              "text-xs",
              isDark ? "text-gray-400" : "text-gray-500"
            )}>
              Warning
            </p>
          </div>
          <div className="text-center">
            <p className={cn(
              "text-2xl font-bold",
              isDark ? "text-red-400" : "text-red-600"
            )}>
              {criticalCount}
            </p>
            <p className={cn(
              "text-xs",
              isDark ? "text-gray-400" : "text-gray-500"
            )}>
              Critical
            </p>
          </div>
        </div>

        {/* System Metrics */}
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon =
            metric.trend === "up" ? TrendingUp : metric.trend === "down" ? TrendingDown : null;
          
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={cn(
                "flex items-center justify-between rounded-lg p-3 transition-all duration-200",
                isDark
                  ? "bg-gray-800/30 hover:bg-gray-800/50"
                  : "bg-gray-50/50 hover:bg-gray-100/50"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn("rounded-lg p-2 shadow-sm", getProgressColor(metric.status))}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className={cn(
                    "font-medium transition-colors duration-300",
                    isDark ? "text-gray-100" : "text-gray-900"
                  )}>
                    {metric.name}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <p className={cn(
                      "text-sm transition-colors duration-300",
                      isDark ? "text-gray-400" : "text-gray-500"
                    )}>
                      {metric.value}
                      {metric.unit}
                    </p>
                    {TrendIcon && (
                      <TrendIcon
                        className={cn(
                          "h-3 w-3",
                          metric.trend === "up"
                            ? isDark ? "text-red-400" : "text-red-500"
                            : isDark ? "text-green-400" : "text-green-500"
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-2 w-16 overflow-hidden rounded-full transition-colors duration-300",
                  isDark ? "bg-gray-700" : "bg-gray-200"
                )}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={cn("h-full", getProgressColor(metric.status))}
                  />
                </div>
                <Badge className={cn(
                  "border-0 text-xs transition-colors duration-300",
                  getStatusColor(metric.status)
                )}>
                  {metric.status}
                </Badge>
              </div>
            </motion.div>
          );
        })}
        
        {/* Footer */}
        <div className={cn(
          "mt-4 border-t pt-4 text-center transition-colors duration-300",
          isDark ? "border-gray-700" : "border-gray-200"
        )}>
          <p className={cn(
            "text-xs transition-colors duration-300",
            isDark ? "text-gray-400" : "text-gray-500"
          )}>
            Last updated: {new Date().toLocaleTimeString()} • Auto-refresh every 30s
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
