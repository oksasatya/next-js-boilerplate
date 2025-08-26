// layout.tsx
import { ReactNode, Suspense } from "react";
import { getAdminMenu } from "@/lib/get-admin-menu";
import Sidebar from "@/components/layout/sidebar";
import AuthedHeader from "@/components/layout/authed-header";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const menuItems = await getAdminMenu();

  return (
    <div className="bg-background min-h-screen transition-colors duration-300">
      <div className="flex h-screen overflow-hidden">
        <Sidebar menuItems={menuItems} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AuthedHeader />
          <main className="bg-background flex-1 overflow-y-auto p-6 transition-colors duration-300">
            <Suspense>{children}</Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}
