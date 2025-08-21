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

function SystemHealthSkeleton() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-20" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-20" />
              <Skeleton className="h-6 w-12" />
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
        return "text-emerald-600 bg-emerald-50";
      case "warning":
        return "text-yellow-600 bg-yellow-50";
      case "critical":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
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

  if (isLoading) {
    return <SystemHealthSkeleton />;
  }

  return (
    <Card className="border border-gray-200/80 bg-white/95 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`rounded-lg p-2 ${
                overallStatus === "healthy"
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
                  : overallStatus === "warning"
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                    : "bg-gradient-to-r from-red-500 to-red-600"
              }`}
            >
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-gray-900">System Health</CardTitle>
              <p className="mt-1 text-sm text-gray-500">Real-time system monitoring</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className={`${getStatusColor(overallStatus)} border-0 font-medium`}>
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
              className="hover:bg-gradient-primary-hover transition-all duration-200"
            >
              <RefreshCw className={`mr-1 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
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
              className="flex items-center justify-between rounded-lg bg-gray-50/50 p-3 transition-all duration-200 hover:bg-gray-100/50"
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2 ${getProgressColor(metric.status)} shadow-sm`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{metric.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <p className="text-sm text-gray-500">
                      {metric.value}
                      {metric.unit}
                    </p>
                    {TrendIcon && (
                      <TrendIcon
                        className={`h-3 w-3 ${
                          metric.trend === "up" ? "text-red-500" : "text-green-500"
                        }`}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-2 w-16 overflow-hidden rounded-full bg-gray-200">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full ${getProgressColor(metric.status)}`}
                  />
                </div>
                <Badge className={`${getStatusColor(metric.status)} border-0 text-xs`}>
                  {metric.status}
                </Badge>
              </div>
            </motion.div>
          );
        })}

        <div className="mt-4 border-t border-gray-200 pt-4 text-center">
          <p className="text-xs text-gray-500">Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}
