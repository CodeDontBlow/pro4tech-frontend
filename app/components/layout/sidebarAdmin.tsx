"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LogoutButton } from "../ui/logoutButton";
import { Menu, X } from "lucide-react";

const commonItems = [
  { href: "/admin-profile", label: "Meu perfil", icon: "/icons/person.svg" },
  { href: "/admin-dashboard", label: "Dashboard", icon: "/icons/graphic.svg" },
  {
    href: "/triage-diagram",
    label: "Editar Triagem",
    icon: "/icons/diagram.svg",
  },
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
  {
    href: "/ticket-subject",
    label: "Gerenciar Chamados",
    icon: "/icons/support_agent.svg",
  },
  {
    href: "/support-group",
    label: "Gerenciar Grupos de Suporte",
    icon: "/icons/groups.svg",
  }
];

export function SidebarAdmin() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-teal-base text-white-300 rounded-lg shadow-md cursor-pointer"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 lg:sticky lg:top-0
          w-80 p-6 bg-white-300 flex flex-col h-screen border-r border-white-500 shadow-sm
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-5 right-5 p-2 text-white-base hover:text-black-base transition-colors cursor-pointer"
        >
          <X size={24} />
        </button>

        <div className="flex items-center justify-center gap-3 py-4 mb-10 bg-teal-base rounded-2xl shadow-lg shadow-teal-700/20 flex-shrink-0">
          <img
            src="/img/logo-orbita.svg"
            alt="Logo"
            className="w-10 h-10 object-contain"
          />

          <h1 className="text-2xl font-bold font-martel text-white-300 tracking-tight leading-none mt-2">
            ORBITA
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto space-y-8 pr-2">
          <nav className="flex flex-col gap-1">
            <p className="px-4 text-start text-[10px] font-bold text-black- uppercase tracking-widest mb-2">
              Menu Principal
            </p>
            {commonItems.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </nav>

          <nav className="flex flex-col gap-1">
            <p className="px-4 text-start text-[10px] font-bold text-black-base uppercase tracking-widest mb-2">
              Administração
            </p>
            {adminItems.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-white-700 shrink-0">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}

function NavItem({
  item,
  onClick,
}: {
  item: (typeof commonItems)[0];
  onClick: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm
        ${isActive
          ? "text-teal-base font-semibold"
          : "text-black-base hover:text-teal-base hover:font- hover:translate-x-1"
        }`}
    >
      {isActive && (
        <div className="absolute left-0 w-1 h-6 bg-teal-base rounded-r-full" />
      )}

      <img
        src={item.icon}
        alt={item.label}
        className={`w-5 h-5 object-contain transition-opacity ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"
          }`}
      />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}
