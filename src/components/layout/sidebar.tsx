"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  FileText,
  Bell,
  Shield,
  Database,
  ChevronDown,
  Zap,
  Activity,
  UserCheck,
  UserX,
  FileBarChart,
  FileSpreadsheet,
  BellRing,
  BellOff,
  Lock,
  Key,
  Palette,
  Globe,
  Menu,
  LogOut,
  User,
  Circle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/auth";
import type { AdminMenuItem } from "@/lib/get-admin-menu";
import { useSidebarStore } from "@/lib/sidebar-store";
import { useThemeStore } from "@/lib/theme-store";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  userData?: {
    name?: string;
    email?: string;
    role?: string;
    avatar?: string;
  };
  menuItems?: AdminMenuItem[];
}

interface MenuItem {
  title: string;
  icon?: React.ElementType;
  href: string;
  badge?: string | null;
  children?: MenuItem[];
}

const staticMenuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/admin/analytics",
    badge: "New",
  },
  {
    title: "Users",
    icon: Users,
    href: "/admin/users",
    badge: "24",
    children: [
      {
        title: "Active Users",
        icon: UserCheck,
        href: "/admin/users/active",
      },
      {
        title: "Inactive Users",
        icon: UserX,
        href: "/admin/users/inactive",
      },
    ],
  },
  {
    title: "Reports",
    icon: FileText,
    href: "/admin/reports",
    children: [
      {
        title: "Analytics Reports",
        icon: FileBarChart,
        href: "/admin/reports/analytics",
      },
      {
        title: "Export Data",
        icon: FileSpreadsheet,
        href: "/admin/reports/export",
      },
    ],
  },
  {
    title: "System Health",
    icon: Activity,
    href: "/admin/system",
  },
  {
    title: "Database",
    icon: Database,
    href: "/admin/database",
  },
  {
    title: "Notifications",
    icon: Bell,
    href: "/admin/notifications",
    badge: "3",
    children: [
      {
        title: "Push Notifications",
        icon: BellRing,
        href: "/admin/notifications/push",
      },
      {
        title: "Email Notifications",
        icon: BellOff,
        href: "/admin/notifications/email",
      },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    href: "/admin/security",
    children: [
      {
        title: "Access Control",
        icon: Lock,
        href: "/admin/security/access",
      },
      {
        title: "API Keys",
        icon: Key,
        href: "/admin/security/keys",
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings",
    children: [
      {
        title: "Appearance",
        icon: Palette,
        href: "/admin/settings/appearance",
      },
      {
        title: "Localization",
        icon: Globe,
        href: "/admin/settings/localization",
      },
    ],
  },
];

function SidebarSkeleton({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex flex-col space-y-3 p-4">
      {/* Logo skeleton */}
      <div className="mb-6 flex items-center space-x-3">
        <Skeleton className={cn("h-10 w-10 rounded-xl", isDark ? "bg-gray-700" : "bg-gray-200")} />
        <Skeleton className={cn("h-6 w-24", isDark ? "bg-gray-700" : "bg-gray-200")} />
      </div>

      {/* Menu items skeleton */}
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-3">
          <Skeleton className={cn("h-5 w-5 rounded", isDark ? "bg-gray-700" : "bg-gray-200")} />
          <Skeleton className={cn("h-4 w-20", isDark ? "bg-gray-700" : "bg-gray-200")} />
        </div>
      ))}
    </div>
  );
}

export default function Sidebar({
  isOpen: isOpenProp,
  onClose: onCloseProp,
  userData,
  menuItems,
}: SidebarProps) {
  const pathname = usePathname();
  const { isOpen: isOpenStore, close } = useSidebarStore();
  const { resolvedTheme } = useThemeStore();
  const isDark = resolvedTheme === "dark";
  const isOpen = isOpenProp ?? isOpenStore ?? true;
  const onClose = onCloseProp ?? close;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Map file-based items to UI items with icons
  const items: MenuItem[] = useMemo(() => {
    if (!menuItems || !menuItems.length) return staticMenuItems;

    const iconMap: Record<string, React.ElementType> = {
      Dashboard: LayoutDashboard,
      Analytics: BarChart3,
      Users: Users,
      Reports: FileText,
      "System Health": Activity,
      System: Activity,
      Database: Database,
      Notifications: Bell,
      Security: Shield,
      Settings: Settings,
    };

    const withIcons = (list: AdminMenuItem[]): MenuItem[] =>
      list.map((i) => ({
        title: i.title,
        href: i.href,
        badge: i.badge ?? null,
        icon: iconMap[i.title] || FileText,
        children: i.children?.map((c) => ({
          title: c.title,
          href: c.href,
          icon: FileText,
        })),
      }));

    return withIcons(menuItems);
  }, [menuItems]);

  // Check if current path matches any child route
  const isParentActive = (item: MenuItem): boolean => {
    if (pathname === item.href) return true;
    if (item.children) {
      return item.children.some((child) => pathname === child.href);
    }
    return false;
  };

  // Auto-expand parent if child is active
  useEffect(() => {
    items.forEach((item) => {
      if (item.children && item.children.some((child) => pathname === child.href)) {
        if (!expandedItems.includes(item.title)) {
          setExpandedItems((prev) => [...prev, item.title]);
        }
      }
    });
  }, [pathname, items]);

  const toggleExpanded = (itemTitle: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemTitle) ? prev.filter((title) => title !== itemTitle) : [...prev, itemTitle],
    );
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div
        className={cn(
          "shadow-xl lg:static lg:inset-0",
          isDark
            ? "border-r border-gray-800 bg-gray-900/95"
            : "border-r border-gray-200/80 bg-white/95",
          isCollapsed ? "lg:w-20" : "lg:w-64",
          "fixed inset-y-0 left-0 z-40 w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <SidebarSkeleton isDark={isDark} />
      </div>
    );
  }

  const renderMenuItem = (item: MenuItem) => {
    const Icon = item.icon || FileText;
    const isActive = pathname === item.href;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.title);
    const isParentOfActive = isParentActive(item);

    const menuButton = (
      <Button
        variant="ghost"
        className={cn(
          "group relative h-11 w-full justify-start rounded-xl transition-all duration-200",
          isActive || isParentOfActive
            ? isDark
              ? "bg-blue-500/20 text-blue-400 shadow-sm"
              : "bg-blue-500/15 text-blue-600 shadow-sm"
            : isDark
              ? "text-gray-300 hover:bg-blue-500/10 hover:text-blue-400"
              : "text-gray-700 hover:bg-blue-500/8 hover:text-blue-600",
        )}
        onClick={hasChildren && !isCollapsed ? () => toggleExpanded(item.title) : undefined}
      >
        {/* Active indicator */}
        {(isActive || isParentOfActive) && (
          <div
            className={cn(
              "absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-full shadow-sm",
              isDark ? "bg-blue-400" : "bg-blue-600",
            )}
          />
        )}

        <Icon
          className={cn(
            "h-5 w-5 flex-shrink-0 transition-colors duration-200",
            isCollapsed ? "" : "mr-3",
            isActive || isParentOfActive
              ? isDark
                ? "text-blue-400"
                : "text-blue-600"
              : isDark
                ? "text-gray-500 group-hover:text-blue-400"
                : "text-gray-500 group-hover:text-blue-600",
          )}
        />

        {!isCollapsed && (
          <>
            <span className="flex-1 text-left text-sm font-medium">{item.title}</span>
            <div className="flex items-center gap-2">
              {item.badge && (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-semibold transition-colors duration-200",
                    item.badge === "New"
                      ? isDark
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-blue-600 text-white shadow-sm"
                      : isDark
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-600",
                  )}
                >
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              )}
            </div>
          </>
        )}
      </Button>
    );

    return (
      <div>
        {hasChildren && !isCollapsed ? (
          <div>
            {menuButton}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.18, ease: "easeInOut" }}
                  className="mt-1 ml-6 space-y-1"
                >
                  {item.children?.map((child) => {
                    const ChildIcon = child.icon || Circle;
                    const isChildActive = pathname === child.href;
                    return (
                      <div key={child.href}>
                        <Link href={child.href}>
                          <Button
                            variant="ghost"
                            className={cn(
                              "h-9 w-full justify-start rounded-lg text-sm transition-all duration-200",
                              isChildActive
                                ? isDark
                                  ? "border-l-2 border-blue-400 bg-blue-500/15 text-blue-400"
                                  : "border-l-2 border-blue-600 bg-blue-500/10 text-blue-600"
                                : isDark
                                  ? "text-gray-400 hover:bg-blue-500/8 hover:text-blue-400"
                                  : "text-gray-600 hover:bg-blue-500/5 hover:text-blue-600",
                            )}
                          >
                            <ChildIcon className="mr-3 h-4 w-4 flex-shrink-0" />
                            <span>{child.title}</span>
                          </Button>
                        </Link>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link href={item.href}>{menuButton}</Link>
        )}
      </div>
    );
  };

  return (
    <TooltipProvider delayDuration={300}>
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={cn(
          "shadow-xl transition-colors duration-300 lg:static lg:inset-0",
          isDark
            ? "border-r border-gray-800 bg-gray-900/95"
            : "border-r border-gray-200/80 bg-white/95",
          isCollapsed ? "lg:w-20" : "lg:w-64",
          "fixed inset-y-0 left-0 z-40 w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div
            className={cn(
              "relative flex items-center justify-between border-b p-4 transition-colors duration-300",
              isDark ? "border-gray-700" : "border-gray-200/50",
            )}
          >
            <div
              className={cn(
                "flex items-center space-x-3 transition-opacity duration-200",
                isCollapsed ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100",
              )}
            >
              <div className="bg-gradient-primary flex h-10 w-10 items-center justify-center rounded-xl shadow-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-gradient-primary text-lg font-bold">ModernFlow</h1>
                  <p
                    className={cn(
                      "text-xs transition-colors duration-300",
                      isDark ? "text-gray-400" : "text-gray-500",
                    )}
                  >
                    Admin Dashboard
                  </p>
                </div>
              )}
            </div>

            {/* Collapse/Expand Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className={cn(
                    "z-10 hidden rounded-lg p-2 transition-colors duration-200 lg:flex",
                    isCollapsed
                      ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      : isDark
                        ? "absolute top-1/2 right-4 -translate-y-1/2 hover:bg-blue-500/10"
                        : "absolute top-1/2 right-4 -translate-y-1/2 hover:bg-blue-500/8",
                  )}
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side={isCollapsed ? "bottom" : "right"}
                className={cn(
                  "transition-colors duration-300",
                  isDark ? "border-gray-700 bg-gray-800/95" : "border-gray-200 bg-white/95",
                )}
                sideOffset={8}
              >
                <p className="text-sm">{isCollapsed ? "Expand sidebar" : "Collapse sidebar"}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {items.map((item) => (
              <div key={item.href}>{renderMenuItem(item)}</div>
            ))}
          </nav>

          {/* Footer */}
          <div
            className={cn(
              "border-t p-4 transition-colors duration-300",
              isDark ? "border-gray-700" : "border-gray-200/50",
            )}
          >
            {!isCollapsed ? (
              <div className="space-y-3">
                <div
                  className={cn(
                    "flex items-center space-x-3 rounded-xl p-3 transition-colors duration-300",
                    isDark
                      ? "bg-gradient-to-r from-gray-800 to-gray-700/50"
                      : "bg-gradient-to-r from-gray-50 to-gray-100/50",
                  )}
                >
                  <div className="bg-gradient-primary flex h-8 w-8 items-center justify-center rounded-lg">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "truncate text-sm font-medium transition-colors duration-300",
                        isDark ? "text-gray-100" : "text-gray-900",
                      )}
                    >
                      {userData?.name || "Administrator"}
                    </p>
                    <p
                      className={cn(
                        "truncate text-xs transition-colors duration-300",
                        isDark ? "text-gray-400" : "text-gray-500",
                      )}
                    >
                      {userData?.role || "Admin"}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="h-10 w-full justify-start rounded-xl text-red-500 transition-colors duration-200 hover:bg-red-50 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span className="text-sm">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full rounded-xl p-2 transition-colors duration-200",
                        isDark ? "hover:bg-gray-800" : "hover:bg-gray-100",
                      )}
                    >
                      <User className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className={cn(
                      "shadow-lg transition-colors duration-300",
                      isDark ? "border-gray-700 bg-gray-800/95" : "border-gray-200 bg-white/95",
                    )}
                    sideOffset={8}
                  >
                    <div>
                      <p className="text-sm font-semibold">{userData?.name || "Administrator"}</p>
                      <p className="text-xs text-gray-500">{userData?.role || "Admin"}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      size="sm"
                      className="w-full rounded-xl p-2 text-red-500 transition-colors duration-200 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className={cn(
                      "shadow-lg transition-colors duration-300",
                      isDark ? "border-gray-700 bg-gray-800/95" : "border-gray-200 bg-white/95",
                    )}
                    sideOffset={8}
                  >
                    <p className="text-sm">Logout</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
