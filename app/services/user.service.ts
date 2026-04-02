import { api } from "./api";

// GET info do usuário logado
export async function getMe() {
    const response = await api.get("/user/me");
    return response.data;
}

// PATCH atualizar perfil
export async function updateMe(data: { name?: string; email?: string; password?: string }) {
    const response = await api.patch("/user/me", data);
    return response.data;
}

// DELETE usuário
export async function deleteMe() {
    const response = await api.delete("/user/me");
    return response.data;
}