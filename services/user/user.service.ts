import { api } from "../api";
import {
  IUserCreateRequest,
  IUserUpdateRequest,
} from "./user.interface";

export async function getMe() {
  const response = await api.get("/user/me");
  return response.data;
}

export async function create(data: IUserCreateRequest) {
  const response = await api.post("/user", data);
  return response.data;
}

export async function update(id: string, data: IUserUpdateRequest) {
  const response = await api.put(`/user/${id}`, data);
  return response.data;
}

export async function remove(id: string) {
  const response = await api.delete(`/user/${id}`);
  return response.data;
}