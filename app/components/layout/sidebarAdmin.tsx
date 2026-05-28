"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LogoutButton } from "../ui/logoutButton";
import { Menu, X, ChevronDown } from "lucide-react"; 

interface SubMenuItem {
  href: string;
  label: string;
}

interface MenuItem {
  href: string;
  label: string;
  icon: string;
  subMenu?: SubMenuItem[];
}

const commonItems: MenuItem[] = [
  // { href: "/admin-profile", label: "Meu perfil", icon: "/icons/person.svg" },
  { 
    href: "/admin-dashboard", 
    label: "Dashboard", 
    icon: "/icons/graphic.svg",
    subMenu: [
      { href: "/admin-overview", label: "Visão Geral" },
      { href: "/admin-agents", label: "Desempenho da Equipe" }
    ]
  },
  { href: "/triage-diagram", label: "Editar Triagem", icon: "/icons/diagram.svg" },
];

const adminItems: MenuItem[] = [
  { href: "/manage-admins", label: "Cadastrar Administrador", icon: "/icons/patchPlusFill.svg" },
  { href: "/manage-companies", label: "Empresas", icon: "/icons/building.svg" },
  { href: "/manage-agents", label: "Atendentes", icon: "/icons/personPlus.svg" },
  { href: "/ticket-subject", label: "Assuntos dos Chamados", icon: "/icons/diagram.svg" },
  { href: "/support-group", label: "Grupos de Suporte", icon: "/icons/groups.svg" }
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

        <div className="flex items-center justify-center gap-3 py-4 mb-10 bg-black-300 rounded-2xl shadow-lg shadow-teal-700/20 flex-shrink-0">
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
            <p className="px-4 text-start text-[10px] font-bold text-black-base uppercase tracking-widest mb-2">
              Menu Principal
            </p>
            {commonItems.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                onCloseSidebar={() => setIsOpen(false)}
              />
            ))}
          </nav>

          <nav className="flex flex-col gap-1">
            <p className="px-4 text-start text-[10px] font-bold text-black-base uppercase tracking-widest mb-2">
              Gerenciamento
            </p>
            {adminItems.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                onCloseSidebar={() => setIsOpen(false)}
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
  onCloseSidebar,
}: {
  item: MenuItem;
  onCloseSidebar: () => void;
}) {
  const pathname = usePathname();
  const hasSubMenu = !!item.subMenu && item.subMenu.length > 0;
  
  const isChildActive = hasSubMenu && item.subMenu!.some(sub => pathname === sub.href);
  const isDirectActive = pathname === item.href;
  const isParentActive = isDirectActive || isChildActive;

  const [isDropdownOpen, setIsDropdownOpen] = useState(isChildActive);

  useEffect(() => {
    if (isChildActive) {
      setIsDropdownOpen(true);
    }
  }, [pathname, isChildActive]);

  if (hasSubMenu) {
    return (
      <div className="w-full flex flex-col">
        
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`group relative flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 text-sm cursor-pointer w-full text-start
            ${isParentActive
              ? "text-teal-base font-semibold"
              : "text-black-base hover:text-teal-base"
            }`}
        >
          {isDirectActive && (
            <div className="absolute left-0 w-1 h-6 bg-teal-base rounded-r-full" />
          )}

          <div className="flex items-center gap-3 truncate">
            <img
              src={item.icon}
              alt={item.label}
              className={`w-5 h-5 object-contain transition-opacity ${isParentActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`}
            />
            <span className="truncate">{item.label}</span>
          </div>

          <ChevronDown 
            size={16} 
            className={`transition-transform duration-200 shrink-0 ${isDropdownOpen ? "rotate-180 text-teal-base" : "opacity-60 group-hover:opacity-100"}`} 
          />
        </button>

        <div 
          className={`grid transition-all duration-200 ease-in-out pl-4 pr-2 ${
            isDropdownOpen ? "grid-rows-[1fr] opacity-100 mt-1 mb-2" : "grid-rows-[0fr] opacity-0 pointer-events-none"
          }`}
        >
          
          <div className="overflow-hidden flex flex-col gap-1.5 pl-8 text-start justify-start items-start w-full">
            {item.subMenu!.map((sub) => {
              const isSubActive = pathname === sub.href;
              return (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={onCloseSidebar}
                  className={`text-xs py-1.5 transition-colors block text-start w-full truncate rounded-md ${
                    isSubActive 
                      ? "text-teal-base font-bold" 
                      : "text-black-base opacity-70 hover:opacity-100 hover:text-teal-base"
                  }`}
                >
                  {sub.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onCloseSidebar}
      className={`group relative flex text-start items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm w-full
        ${isDirectActive
          ? "text-teal-base font-semibold"
          : "text-black-base hover:text-teal-base hover:translate-x-1"
        }`}
    >
      {isDirectActive && (
        <div className="absolute left-0 w-1 h-6 bg-teal-base rounded-r-full" />
      )}

      <img
        src={item.icon}
        alt={item.label}
        className={`w-5 h-5 object-contain transition-opacity ${isDirectActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`}
      />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}