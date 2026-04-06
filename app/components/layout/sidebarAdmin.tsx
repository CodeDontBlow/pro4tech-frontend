"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

const commonItems = [
  { href: "/admin-profile", label: "Meu perfil", icon: "/icons/person.svg" },
  { href: "/admin-dashboard", label: "Dashboard", icon: "/icons/graphic.svg" },
  { href: "/triage-diagram", label: "Editar Triagem", icon: "/icons/diagram.svg" },
];

const adminItems = [
  { href: "/manage-companies", label: "Gerenciar Empresas", icon: "/icons/building.svg" },
  { href: "/manage-agents", label: "Gerenciar Atendentes", icon: "/icons/personPlus.svg" },
];

export function SidebarAdmin() {
  return (
    <aside className="w-72 p-6 bg-white-300 flex flex-col h-screen sticky top-0 border-r border-gray-100 shadow-sm">
      
      <div className="flex items-center justify-center gap-3 py-4 mb-10 bg-teal-base rounded-2xl shadow-lg shadow-teal-700/20">
        <img src="/img/logo-orbita.svg" alt="Logo" className="w-10 h-10 object-contain" />
        <h1 className="font-martel text-2xl font-bold text-white-300 tracking-tight leading-none mt-2">
          ORBITA
        </h1>
      </div>

      {/* NAVEGAÇÃO */}
      <div className="flex-1 overflow-y-auto space-y-8">
        <nav className="flex flex-col gap-1">
          <p className="px-4 text-start text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            Menu Principal
          </p>
          {commonItems.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </nav>

        <nav className="flex flex-col gap-1">
          <p className="px-4 text-start text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            Administração
          </p>
          {adminItems.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </nav>
      </div>

      {/* FOOTER */}
      <div className="pt-6 border-t border-gray-100">
        <button className="flex w-full items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 group cursor-pointer">
          <LogOut size={20} />
          <span className="font-ibm-plex font-medium">Sair da conta</span>
        </button>
      </div>
    </aside>
  );
}

function NavItem({ item }: { item: typeof commonItems[0] }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-ibm-plex text-sm
        ${
          isActive
            ? "bg-teal-base/10 text-teal-700 font-semibold"
            : "text-black-base hover:bg-gray-50 hover:translate-x-1"
        }`}
    >
      {/* Indicador de item ativo */}
      {isActive && (
        <div className="absolute left-0 w-1 h-6 bg-teal-base rounded-r-full" />
      )}

      {/* Ícones com cores originais conforme solicitado */}
      <img 
        src={item.icon} 
        alt={item.label} 
        className="w-5 h-5 object-contain" 
      />
      {item.label}
    </Link>
  );
}