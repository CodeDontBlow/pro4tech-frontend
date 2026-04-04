import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) { 
    const token = req.cookies.get("token")?.value;
    const userRole = req.cookies.get("user_role")?.value; 
    const { pathname } = req.nextUrl;

    const adminPaths = [
        "/admin-profile", 
        "/admin-dashboard", 
        "/manage-agents", 
        "/manage-companies", 
        "/screening"
    ];

    const agentPaths = [
        "/profile", 
        "/dashboard", 
        "/history", 
        "/tickets"
    ];

    const isAdminRoute = adminPaths.some(path => pathname.startsWith(path));
    const isAgentRoute = agentPaths.some(path => pathname.startsWith(path));

    // 1. Sem token -> Login
    if ((isAdminRoute || isAgentRoute) && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // 2. Bloqueia AGENT de entrar em rotas ADMIN
    if (isAdminRoute && userRole !== "ADMIN") {
        // Se ele for um AGENT ou não tiver role, manda para a página dele
        const fallback = userRole === "AGENT" ? "/profile" : "/login";
        return NextResponse.redirect(new URL(fallback, req.url)); 
    }

    // 3. Bloqueia ADMIN de entrar em rotas AGENT
    if (isAgentRoute && userRole === "ADMIN") {
        return NextResponse.redirect(new URL("/admin-profile", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        //admin
        "/admin-profile/:path*",
        "/admin-dashboard/:path*",
        "/manage-agents/:path*",
        "/manage-companies/:path*",
        "/screening/:path*",

        //agent
        "/profile/:path*",
        "/dashboard/:path*",
        "/history/:path*",
        "/tickets/:path*",
    ],
};