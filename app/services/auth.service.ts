import { api } from "./api";

// LOGIN → retorna token + usuário
export async function login(email: string, password: string) {
    const response = await api.post("/auth/login", { email, password });
    return response.data; // { token, user }
}

// REGISTRO → cria usuário CLIENT ou agent (admin)
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