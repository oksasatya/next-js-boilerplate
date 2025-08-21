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

export async function getAdminMenu(): Promise<AdminMenuItem[]> {
  const root = path.join(process.cwd(), "src", "app", "admin");
  const items: AdminMenuItem[] = [];

  // Always include root dashboard as the main entry
  items.push({ title: "Dashboard", href: "/admin/dashboard" });

  // Scan top-level directories under /admin
  const entries = await fs.promises.readdir(root, { withFileTypes: true });

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
    const nested = await fs.promises.readdir(dirPath, { withFileTypes: true });
    for (const sub of nested) {
      if (!sub.isDirectory()) continue;
      const subName = sub.name;
      if (subName.startsWith("_") || subName.startsWith("(") || subName === "components") continue;
      const subPage = path.join(dirPath, subName, "page.tsx");
      if (await exists(subPage)) {
        children.push({
          title: toTitleCase(subName),
          href: `/admin/${name}/${subName}`,
        });
      }
    }

    items.push({
      title: toTitleCase(name),
      href: `/admin/${name}`,
      children: children.length ? children : undefined,
    });
  }

  return items;
}
