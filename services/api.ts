import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333")
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");

export const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use((config) => {
  const token =
    Cookies.get("token") ||
    (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
