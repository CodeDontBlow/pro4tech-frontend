import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const pathname = req.nextUrl.pathname;

    // --- ROTAS DO AGENT ---
    const isAgentRoute = 
        pathname.startsWith("/dashboard") || 
        pathname.startsWith("/history") || 
        pathname.startsWith("/profile") || 
        pathname.startsWith("/tickets");

    // --- ROTAS DO ADMIN ---
    const isAdminRoute = 
        pathname.startsWith("/admin-dashboard") || 
        pathname.startsWith("/admin-profile") || 
        pathname.startsWith("/manage-agents") || 
        pathname.startsWith("/manage-companies") || 
        pathname.startsWith("/screening");

    // --- LOGICA DE PROTEÇÃO ---
    if (isAgentRoute && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/history/:path*",
        "/profile/:path*",
        "/tickets/:path*",
    ],
};