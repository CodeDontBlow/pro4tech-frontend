"use client";
import { SidebarAdmin } from "@/app/components/layout/sidebarAdmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full">
      <SidebarAdmin />
      <main className="flex-1 overflow-y-auto bg-white-300">{children}</main>
    </div>
  );
}
