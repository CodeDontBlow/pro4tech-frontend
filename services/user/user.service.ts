import { api } from "../api";

export async function getMe() {
    const response = await api.get("/user/me");
    return response.data;
}

export async function getAll(role?: string) {
  const response = await api.get('/user', {
    params: { role } 
  });
  return response.data;
}