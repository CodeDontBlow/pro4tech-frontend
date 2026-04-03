export function getRedirectPath(role?: string) {
    switch (role) {
        case "ADMIN":
            return "/admin";
        case "AGENT":
            return "/agent";
        default:
            return "/";
    }
}