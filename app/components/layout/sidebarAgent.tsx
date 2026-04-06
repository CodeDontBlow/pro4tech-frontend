"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const items = [
  { href: "/profile", label: "Meu perfil", icon: "/icons/person.svg" },
  { href: "/tickets", label: "Ver Chamados", icon: "/icons/spreadsheet.svg" },
  {
    href: "/history",
    label: "Histórico de Atendimentos",
    icon: "/icons/clock.svg",
  },
  { href: "/dashboard", label: "Dashboard", icon: "/icons/graphic.svg" },
];

export enum AgentStatus {
  Ativo = "ativo",
  Inativo = "inativo",
}

type Client = {
  avatarUrl?: string;
  name: string;
};

type SidebarAgentProps = {
  client: Client;
};

export function SidebarAgent({ client }: SidebarAgentProps) {
  const [isStatusActive, setIsStatusActive] = useState(true);

  return (
    <aside className="w-80 p-8 bg-white-base flex flex-col h-full z-10 shadow-[2px_0_10px_rgba(0,0,0,0.05),10px_0_40px_rgba(0,0,0,0.08)]">
      <div className="py-2.5 flex gap-2.5 items-center mb-10">
        <img src="/img/logo-orbita.svg" alt="Logo" className="w-12 h-10" />
        <h1 className="font-martel text-3xl font-normal text-teal-base tracking-tight leading-none translate-y-0.5">
          ORBITA
        </h1>
      </div>

      <nav className="mb-10 flex flex-col gap-2">
        {items.map((item) => (
          <NavItem key={item.label} href={item.href}>
            <img src={item.icon} alt={item.label} className="w-5 h-5" />
            {item.label}
          </NavItem>
        ))}
      </nav>

      <div className="text-black-base font-ibm-plex">
        <p className="mb-2.5">Você tem chamados abertos!</p>
        <div className="flex gap-2 bg-white-500 py-3 px-2.5 rounded-xl items-center cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
          <div className="bg-white rounded-full">
            <img
              src={client.avatarUrl || "/icons/personFill.svg"}
              alt="Foto do Cliente"
              width={40}
              height={40}
            />
          </div>
          <div>
            <p>{client.name || "Nome do Cliente"}</p>
            <div className="flex gap-2 items-center">
              <p className="font-light text-xs">Continuar Atendendo</p>
              <img src="/icons/vector.svg" alt="" width={6} height={12} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="bg-white-500 py-3.5 px-5 rounded-xl flex items-center justify-between">
          <p className="text-black-base font-ibm-plex">
            Status
            <span
              className="ml-2 text-white text-xs rounded-xl px-2 py-0.5 transition-colors duration-300"
              style={{
                backgroundColor: isStatusActive ? "#2FAF7A" : "#D17A2A",
              }}
            >
              {isStatusActive ? "Ativo" : "Inativo"}
            </span>
          </p>
          <button
            onClick={() => setIsStatusActive(!isStatusActive)}
            aria-label="Alternar status"
            style={{
              width: 60,
              height: 32,
              borderRadius: 16,
              backgroundColor: "#D6D6DB",
              position: "relative",
              border: "none",
              cursor: "pointer",
              boxShadow:
                "inset 0 2px 4px rgba(0,0,0,0.12), inset 0 -1px 2px rgba(255,255,255,0.7)",
            }}
          >
            <img
              src={
                isStatusActive
                  ? "/icons/checkCircleFill.svg"
                  : "/icons/xCircleFill.svg"
              }
              alt={isStatusActive ? "Ativo" : "Inativo"}
              style={{
                position: "absolute",
                top: 4,
                left: isStatusActive ? 32 : 4,
                width: 24,
                height: 24,
                transition: "left 0.3s",
              }}
            />
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 font-normal font-ibm-plex
        ${
          isActive
            ? "bg-white-500 text-teal-base font-medium"
            : "text-black-base hover:bg-white-500 hover:translate-x-1"
        }`}
    >
      {children}
    </Link>
  );
}
