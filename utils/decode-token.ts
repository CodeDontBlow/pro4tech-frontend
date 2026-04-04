// src/utils/decode-token.ts

import { jwtDecode } from "jwt-decode";

type TokenPayload = {
    sub: string;
    email: string;
    role: "ADMIN" | "AGENT" | "CLIENT";
    companyId?: string;
};

export function decodeToken(token: string): TokenPayload {
    return jwtDecode(token);
}