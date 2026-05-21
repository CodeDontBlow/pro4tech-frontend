import axios from "axios";
import Cookies from "js-cookie";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:3333";

export const api = axios.create({
  baseURL: apiBaseUrl,
});

api.interceptors.request.use((config) => {
  const localStorageToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const token = Cookies.get("token") || localStorageToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
