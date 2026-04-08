"use client";
import { SidebarAgent } from "@/app/components/layout/sidebarAgent";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full">
      <SidebarAgent
        client={{
          name: "Agente",
        }}
      />
      <main className="flex-1 overflow-y-auto bg-white-300">{children}</main>
    </div>
  );
}
