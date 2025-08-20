"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { useMeQuery } from "@/features/auth/api";
import { useLoadingStore } from "@/lib/loading-store";
import { motion } from "framer-motion";

// Import dashboard components
import { WelcomeSection } from "./components/dashboard/welcome-section";
import { KPICards } from "./components/dashboard/KPICards";
import { RevenueChart } from "./components/dashboard/RevenueChart";
import { RecentActivity } from "./components/dashboard/RecentActivity";
import SystemHealth from "./components/dashboard/SystemHealth";
import { QuickStats } from "./components/dashboard/QuickStats";

export default function AdminPage() {
  const { data, isFetching } = useMeQuery();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { setIsLoading } = useLoadingStore();

  // Handle loading state
  useEffect(() => {
    setIsLoading(isFetching);
  }, [isFetching, setIsLoading]);

  // Prepare user data for sidebar
  const userData = {
    name: data?.user.name || data?.user.email?.split("@")[0] || "Administrator",
    email: data?.user.email,
    role: data?.user.role || "Admin",
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userData={userData} />

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <Header onMenuClick={() => setSidebarOpen(true)} userData={userData} />

          {/* Page Content */}
          <main className="flex-1 space-y-6 overflow-y-auto p-6">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WelcomeSection data={data} />
            </motion.div>

            {/* KPI Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <KPICards />
            </motion.div>

            {/* Charts and Stats Section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Revenue Chart - Takes 2 columns */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <RevenueChart />
              </motion.div>

              {/* Quick Stats - Takes 1 column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <QuickStats />
              </motion.div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              {/* System Health - Takes 2 columns on xl screens */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="xl:col-span-2"
              >
                <SystemHealth />
              </motion.div>

              {/* Recent Activity - Takes 1 column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <RecentActivity />
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
