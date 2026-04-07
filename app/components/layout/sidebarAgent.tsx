"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LogoutButton } from "../ui/logoutButton";
import { Menu, X } from "lucide-react";

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

type Client = {
  avatarUrl?: string;
  name: string;
};

type SidebarAgentProps = {
  client: Client;
};

export function SidebarAgent({ client }: SidebarAgentProps) {
  const [isStatusActive, setIsStatusActive] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
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
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-teal-base text-white rounded-lg shadow-md cursor-pointer"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 md:sticky md:top-0
          w-80 p-6 bg-white-300 flex flex-col h-screen border-r border-gray-100 shadow-sm
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-5 right-5 p-2 text-gray-400 hover:text-black-base transition-colors cursor-pointer"
        >
          <X size={24} />
        </button>

        <div className="py-2.5 flex gap-2.5 items-center mb-10">
          <img src="/img/logo-orbita.svg" alt="Logo" className="w-12 h-10" />
          <h1 className="text-3xl font-normal text-teal-base tracking-tight leading-none translate-y-0.5">
            ORBITA
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto space-y-8">
          <nav className="flex flex-col gap-1">
            <p className="px-4 text-start text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Menu do Agente
            </p>
            {items.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </nav>

          <div className="px-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 text-start">
              Chamado em aberto
            </p>
            <div className="flex gap-3 bg-white p-3 rounded-xl items-center cursor-pointer border border-gray-100 transition-all duration-200 hover:shadow-md hover:scale-[1.02] group">
              <div className="bg-teal-base/10 p-1 rounded-full overflow-hidden w-10 h-10 flex-shrink-0">
                <img
                  src={client.avatarUrl || "/icons/personFill.svg"}
                  alt="Foto do Cliente"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-start font-semibold text-black-base truncate">
                  {client.name || "Nome do Cliente"}
                </p>
                <div className="flex gap-2 items-center">
                  <p className="font-medium text-teal-700 text-[11px] whitespace-nowrap">
                    Continuar Atendendo
                  </p>
                  <img
                    src="/icons/vector.svg"
                    alt=""
                    className="w-1.5 h-3 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200"
                    style={{ display: "block" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 space-y-4">
          <div className="bg-gray-50 p-3.5 px-5 rounded-xl flex items-center justify-between border border-gray-100">
            <div className="flex flex-col text-start">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Status
              </span>
              <span
                className={`text-xs font-bold transition-colors duration-300 ${isStatusActive ? "text-green-600" : "text-orange-600"}`}
              >
                {isStatusActive ? "DISPONÍVEL" : "OCUPADO"}
              </span>
            </div>

            <button
              onClick={() => setIsStatusActive(!isStatusActive)}
              className="relative cursor-pointer w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none shadow-inner"
              style={{
                backgroundColor: isStatusActive ? "#2FAF7A" : "#D6D6DB",
              }}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm flex items-center justify-center
                ${isStatusActive ? "left-7" : "left-1"}`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${isStatusActive ? "bg-green-600" : "bg-gray-400"}`}
                />
              </div>
            </button>
          </div>

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
  item: (typeof items)[0];
  onClick: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm
        ${
          isActive
            ? "bg-teal-base/10 text-teal-700 font-semibold"
            : "text-black-base hover:bg-gray-50 hover:translate-x-1"
        }`}
    >
      {isActive && (
        <div className="absolute left-0 w-1 h-6 bg-teal-base rounded-r-full" />
      )}

      <img
        src={item.icon}
        alt={item.label}
        className={`w-5 h-5 object-contain transition-opacity ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`}
      />
      {item.label}
    </Link>
  );
}
