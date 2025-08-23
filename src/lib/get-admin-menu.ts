import fs from "fs";
import path from "path";

export interface AdminMenuItem {
  title: string;
  href: string;
  children?: AdminMenuItem[];
  badge?: string | null;
}

function toTitleCase(slug: string) {
  return slug
    .replace(/[-_]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

async function exists(p: string) {
  try {
    await fs.promises.access(p, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

// Static fallback menu
const staticMenuItems: AdminMenuItem[] = [
  { title: "Dashboard", href: "/admin/dashboard" },
  { title: "Analytics", href: "/admin/analytics", badge: "New" },
  {
    title: "Users",
    href: "/admin/users",
    children: [
      { title: "Active Users", href: "/admin/users/active" },
      { title: "Inactive Users", href: "/admin/users/inactive" },
    ],
  },
  {
    title: "Reports",
    href: "/admin/reports",
    children: [
      { title: "Analytics Reports", href: "/admin/reports/analytics" },
      { title: "Export Data", href: "/admin/reports/export" },
    ],
  },
  { title: "System Health", href: "/admin/system" },
  { title: "Database", href: "/admin/database" },
  {
    title: "Notifications",
    href: "/admin/notifications",
    badge: "3",
    children: [
      { title: "Push Notifications", href: "/admin/notifications/push" },
      { title: "Email Notifications", href: "/admin/notifications/email" },
    ],
  },
  {
    title: "Security",
    href: "/admin/security",
    children: [
      { title: "Access Control", href: "/admin/security/access" },
      { title: "API Keys", href: "/admin/security/keys" },
    ],
  },
  {
    title: "Settings",
    href: "/admin/settings",
    children: [
      { title: "Appearance", href: "/admin/settings/appearance" },
      { title: "Localization", href: "/admin/settings/localization" },
    ],
  },
];

export async function getAdminMenu(): Promise<AdminMenuItem[]> {
  try {
    const root = path.join(process.cwd(), "src", "app", "admin");

    // Check if admin directory exists
    if (!(await exists(root))) {
      console.log("Admin directory not found, using static menu");
      return staticMenuItems;
    }

    const items: AdminMenuItem[] = [];

    // Always include root dashboard as the main entry
    items.push({ title: "Dashboard", href: "/admin/dashboard" });

    // Scan top-level directories under /admin
    let entries;
    try {
      entries = await fs.promises.readdir(root, { withFileTypes: true });
    } catch (error) {
      console.log("Error reading admin directory, using static menu");
      return staticMenuItems;
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const name = entry.name;
      // Skip reserved or implementation folders
      if (name.startsWith("_") || name.startsWith("(") || name === "api" || name === "components")
        continue;

      // Avoid duplicated dashboard if a nested folder exists
      if (name === "dashboard") continue;

      const dirPath = path.join(root, name);
      const pagePath = path.join(dirPath, "page.tsx");
      const hasPage = await exists(pagePath);

      // Only include directories that are actual routes
      if (!hasPage) continue;

      const children: AdminMenuItem[] = [];
      // Scan one level of nesting for children
      try {
        const nested = await fs.promises.readdir(dirPath, { withFileTypes: true });
        for (const sub of nested) {
          if (!sub.isDirectory()) continue;
          const subName = sub.name;
          if (subName.startsWith("_") || subName.startsWith("(") || subName === "components")
            continue;
          const subPage = path.join(dirPath, subName, "page.tsx");
          if (await exists(subPage)) {
            children.push({
              title: toTitleCase(subName),
              href: `/admin/${name}/${subName}`,
            });
          }
        }
      } catch (error) {
        // Ignore errors in reading subdirectories
      }

      items.push({
        title: toTitleCase(name),
        href: `/admin/${name}`,
        children: children.length ? children : undefined,
      });
    }

    // If we only have dashboard (or empty), return static menu
    if (items.length <= 1) {
      console.log("Only dashboard found, using static menu with rich navigation");
      return staticMenuItems;
    }

    return items;
  } catch (error) {
    console.error("Error in getAdminMenu:", error);
    console.log("Falling back to static menu");
    return staticMenuItems;
  }
}
