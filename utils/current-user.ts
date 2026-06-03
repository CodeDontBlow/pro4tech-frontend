import Cookies from "js-cookie";

export function getCurrentUser() {
    return {
        name: Cookies.get("user_name") ?? "",
        role: Cookies.get("user_role") ?? "",
        token: Cookies.get("token") ?? "",
    };
}