import { AgentStatus, SidebarAgent } from "@/components/sidebarAgent";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full">
      <SidebarAgent
        client={{
          name: "Nome do Cliente",
        }}
      />
      <main className="flex-1 overflow-y-auto bg-white-base">{children}</main>
    </div>
  );
}
