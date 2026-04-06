"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const commonItems = [
  { href: "/admin-profile", label: "Meu perfil", icon: "/icons/person.svg" },
  { href: "/admin-dashboard", label: "Dashboard", icon: "/icons/graphic.svg" },
  { href: "/triage-diagram", label: "Editar Triagem", icon: "/icons/diagram.svg" },
];

const adminItems = [
  {
    href: "/manage-companies",
    label: "Gerenciar Empresas",
    icon: "/icons/building.svg",
  },
  {
    href: "/manage-agents",
    label: "Gerenciar Atendentes",
    icon: "/icons/personPlus.svg",
  },
];

export function SidebarAdmin() {
  return (
    <aside className="w-80 p-8 bg-white-base flex flex-col h-full z-10 shadow-[2px_0_10px_rgba(0,0,0,0.05),10px_0_40px_rgba(0,0,0,0.08)]">
      <div className="py-2.5 justify-center flex gap-2.5 items-center mb-10 bg-black-300 rounded-xl">
        <img src="/img/logo-orbita.svg" alt="Logo" className="w-12 h-10" />
        <h1 className="font-ibm text-3xl font-normal text-white-base tracking-tight leading-none translate-y-0.5">
          ORBITA
        </h1>
      </div>

      <nav className="mb-10 flex flex-col gap-2">
        {commonItems.map((item) => (
          <NavItem key={item.label} href={item.href}>
            <img src={item.icon} alt={item.label} className="w-5 h-5" />
            {item.label}
          </NavItem>
        ))}
      </nav>

      <nav className="flex flex-col gap-2">
        <h2 className="text-start font-bold">Gerenciar Usuários</h2>
        {adminItems.map((item) => (
          <NavItem key={item.label} href={item.href}>
            <img src={item.icon} alt={item.label} className="w-5 h-5" />
            {item.label}
          </NavItem>
        ))}
      </nav>
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
        ${isActive
          ? "bg-white-500 text-teal-base font-medium"
          : "text-black-base hover:bg-white-500 hover:translate-x-1"
        }`}
    >
      {children}
    </Link>
  );
}
