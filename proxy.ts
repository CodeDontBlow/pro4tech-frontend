import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) { 
    const token = req.cookies.get("token")?.value;
    const userRole = req.cookies.get("user_role")?.value;
    const pathname = req.nextUrl.pathname;

    const isAdminRoute = 
        pathname.startsWith("/admin-dashboard") || 
        pathname.startsWith("/admin-profile") || 
        pathname.startsWith("/manage-agents") || 
        pathname.startsWith("/manage-companies") || 
        pathname.startsWith("/screening");

    const isAgentRoute = 
        pathname.startsWith("/dashboard") || 
        pathname.startsWith("/history") || 
        pathname.startsWith("/profile") || 
        pathname.startsWith("/tickets");

    // 1. Verificação token 
    if ((isAdminRoute || isAgentRoute) && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // 2. Bloqueia AGENT de entrar em rota ADMIN
    if (isAdminRoute && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/profile", req.url));
    }

    // 3. Bloqueia ADMIN de entrar em rota AGENT    
    if (isAgentRoute && userRole === "ADMIN") {
        return NextResponse.redirect(new URL("/admin-profile", req.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: [
        // Agent rotas
        "/dashboard/:path*",
        "/history/:path*",
        "/profile/:path*",
        "/tickets/:path*",

        // Admin rotas
        "/admin-dashboard/:path*",
        "/admin-profile/:path*",
        "/manage-agents/:path*",
        "/manage-companies/:path*",
        "/screening/:path*",
    ],
};