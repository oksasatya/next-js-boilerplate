"use client";

import { motion } from "framer-motion";
import { WelcomeSection } from "@/app/admin/dashboard/components/welcome-section";
import { KPICards } from "@/app/admin/dashboard/components/KPICards";
import { RevenueChart } from "@/app/admin/dashboard/components/RevenueChart";
import { RecentActivity } from "@/app/admin/dashboard/components/RecentActivity";
import SystemHealth from "@/app/admin/dashboard/components/SystemHealth";
import { QuickStats } from "@/app/admin/dashboard/components/QuickStats";
import { useMeQuery } from "@/features/auth/api";

export default function AdminDashboardPage() {
  const { data } = useMeQuery();

  return (
    <div className="space-y-6">
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
    </div>
  );
}
