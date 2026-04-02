import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    const pathname = req.nextUrl.pathname;

    console.log("middleware:", pathname, token);

    if (
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/user")
    ) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/user/:path*"],
};