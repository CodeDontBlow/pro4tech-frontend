'use client'
import { AgentStatus, SidebarAgent } from "@/app/components/layout/sidebarAgent";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        const role = localStorage.getItem("role");

        if (role !== "ADMIN") {
            router.push("/login");
        }
    }, []);

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
