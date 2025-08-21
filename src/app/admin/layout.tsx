import { ReactNode, Suspense } from "react";
import { getAdminMenu } from "@/lib/get-admin-menu";
import Sidebar from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const menuItems = await getAdminMenu();

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="flex h-screen overflow-hidden">
        <Sidebar menuItems={menuItems} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <Suspense>{children}</Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}
