"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token", { path: "/" });
    Cookies.remove("user_role", { path: "/" });

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 group cursor-pointer"
    >
      <LogOut size={20} />
      <span className="font-medium">Sair da conta</span>
    </button>
  );
}
