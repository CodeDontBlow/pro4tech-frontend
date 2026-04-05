import { api } from "../api";
import { LoginResponse } from "./auth.types";
import Cookies from "js-cookie";

// LOGIN → retorna token + usuário
export async function login(email: string, password: string) {
    const response = await api.post("/auth/login", { email, password });

    const token = response.data.access_token;
    // salva o token
    localStorage.setItem("token", token);
    Cookies.set("token", token);

    return response.data;
}

// REGISTRO → cria usuário
export async function register(data: {
    name: string;
    email: string;
    password: string;
    role?: "CLIENT" | "AGENT"; // padrão CLIENT
    companyId?: string;             // necessário para agent
}) {
    const response = await api.post("/user/register", data);
    return response.data; // usuário criado
}