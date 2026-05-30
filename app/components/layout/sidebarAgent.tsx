"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LogoutButton } from "../ui/logoutButton";
import Avatar from "../ui/avatar";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";
import { decodeToken } from "@/utils/decode-token";
import { api } from "@/services/api";
import { ITicket } from "@/services/ticket/ticket.interface";

const items = [
  { href: "/profile", label: "Meu perfil", icon: "/icons/person.svg" },
  { href: "/tickets", label: "Chamados", icon: "/icons/spreadsheet.svg" },
  {
    href: "/history",
    label: "Histórico",
    icon: "/icons/clock.svg",
  },
];

type Client = {
  avatarUrl?: string;
  name: string;
};

type SidebarAgentProps = {
  client: Client;
};

const CLOSED_STATUSES = ["RESOLVED", "CLOSED"];
const POLL_INTERVAL_MS = 15000;
const OPEN_TICKETS_LIMIT = 20;

export function SidebarAgent({ client }: SidebarAgentProps) {
  const [isStatusActive, setIsStatusActive] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [openTickets, setOpenTickets] = useState<ITicket[]>([]);
  const router = useRouter();

  const agentId = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const token = Cookies.get("token") || localStorage.getItem("token");
    if (!token) {
      return null;
    }

    try {
      return decodeToken(token).sub;
    } catch {
      return null;
    }
  }, []);

  const fetchOpenTickets = useCallback(
    async (options?: { silent?: boolean }) => {
      if (!agentId) {
        if (!options?.silent) {
          setOpenTickets([]);
        }
        return;
      }

      try {
        const response = await api.get("/tickets", {
          params: {
            agentId,
            limit: OPEN_TICKETS_LIMIT,
          },
        });

        const data = (response.data.data ?? []) as ITicket[];
        const filtered = data.filter(
          (ticket) =>
            ticket.agentId === agentId
            && !CLOSED_STATUSES.includes(ticket.status)
        );

        setOpenTickets(filtered);
      } catch (error) {
        console.error("Erro ao carregar chamados em aberto", error);
        setOpenTickets([]);
      }
    },
    [agentId]
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchOpenTickets();
  }, [fetchOpenTickets]);

  // Busca o status atual do usuário para inicializar o toggle
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get('/user/me');
        const chatStatus = res.data.chatStatus as string | undefined;
        setIsStatusActive(chatStatus === 'ONLINE');
      } catch (err) {
        console.error('Erro ao buscar dados do usuário', err);
      }
    };

    fetchMe();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchOpenTickets({ silent: true });
    }, POLL_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [fetchOpenTickets]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-teal-base text-white-300 rounded-lg shadow-md cursor-pointer"
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
          w-80 p-6 bg-white-300 flex flex-col h-screen border-r border-white-500 shadow-sm
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-5 right-5 p-2 text-white-base hover:text-black-base transition-colors cursor-pointer"
        >
          <X size={24} />
        </button>

        <div className="flex items-center ml-2 gap-3 py-4 mb-10 rounded-2xl  flex-shrink-0">
          <img
            src="/img/logo-orbita.svg"
            alt="Logo"
            className="w-10 h-10 object-contain"
          />

          <h1 className="subtitle-2 text-black-base/90 tracking-tight leading-none text-teal-base">
            ORBITA
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto space-y-8 pr-2 pb-4">
          <nav className="flex flex-col gap-1">
            {items.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </nav>

          <div className="px-2">
            <p className="text-[10px] font-bold text-black-base uppercase tracking-widest mb-3 text-start">
              Chamados em aberto
            </p>
            {openTickets.length === 0 ? (
              <div className="text-xs text-black-base/60 text-start px-2 py-3">
                Nenhum chamado em atendimento.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {openTickets.map((ticket) => (
                  <button
                    key={ticket.id}
                    type="button"
                    onClick={() => router.push(`/chat?id=${ticket.id}`)}
                    className="flex gap-3 bg-white-300 p-3 rounded-xl items-center cursor-pointer border border-white-700 transition-all duration-200 hover:shadow-md hover:scale-[1.02] group"
                  >
                    <div className="bg-white-base p-1 rounded-full overflow-hidden w-10 h-10 flex-shrink-0">
                      <img
                        src={client.avatarUrl || "/icons/personFill.svg"}
                        alt="Foto do Cliente"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 text-start">
                      <p className="text-sm font-semibold text-black-base truncate">
                        {ticket.client?.name ?? "Cliente"}
                      </p>
                      <p className="text-[11px] text-black-base/70 truncate">
                        {ticket.subject?.name ?? "Assunto"} · {ticket.company?.name ?? "Empresa"}
                      </p>
                      <div className="flex gap-2 items-center mt-1">
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
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-white-700 space-y-4 shrink-0">
          <div className="bg-white-300 p-3.5 px-5 rounded-xl flex items-center justify-between border border-white-700">
            <div className="flex flex-col text-start">
              <span className="text-[10px] font-bold text-black-base uppercase tracking-widest">
                Status
              </span>
              <span
                className={`text-xs font-bold transition-colors duration-300 ${isStatusActive ? "text-green-600" : "text-gray-500"}`}
              >
                {isStatusActive ? "DISPONÍVEL" : "AUSENTE"}
              </span>
            </div>

            <button
              type="button"
              onClick={async () => {
                // calcula novo estado e persiste no backend
                const newState = !isStatusActive;
                try {
                  await api.patch('/user/me', {
                    chatStatus: newState ? 'ONLINE' : 'OFFLINE',
                  });

                  setIsStatusActive(newState);

                  // notifica outras partes da UI para refetch (por exemplo, availability summaries)
                  try {
                    window.dispatchEvent(new CustomEvent('agent-status-changed'));
                  } catch (e) {
                    // fallback silencioso
                  }
                } catch (err) {
                  console.error('Erro ao atualizar status do usuário', err);
                }
              }}
              className="relative cursor-pointer w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none shadow-inner"
              style={{
                backgroundColor: isStatusActive ? "var(--green-base)" : "var(--white-700)",
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
            ? "text-teal-base font-semibold"
            : "text-black-base hover:text-teal-base hover:translate-x-1"
        }`}
    >
      {isActive && (
        <div className="absolute left-0 w-1 h-6 bg-teal-base rounded-r-full" />
      )}

      <img
        src={item.icon}
        alt={item.label}
        className={`w-5 h-5 object-contain transition-opacity ${
          isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"
        }`}
      />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}
