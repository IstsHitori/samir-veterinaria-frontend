const routesByRole: Record<string, readonly string[]> = {
  admin: [
    "/app/profile",
    "/app/dashboard",
    "/app/users",
    "/app/medical-reports",
    "/app/patients",
    "/app/owners",
  ],
  veterinario: [
    "/app/profile",
    "/app/medical-reports",
    "/app/patients",
    "/app/owners",
  ],
  auxiliar: ["/app/profile", "/app/patients", "/app/owners"],
};

const homeRouteByRole: Record<string, string> = {
  admin: "/app/dashboard",
  veterinario: "/app/medical-reports",
  auxiliar: "/app/patients",
};

export function getRoleHomeRoute(role: string): string {
  return homeRouteByRole[role] ?? "/app/profile";
}

export function canAccessRoleRoute(role: string, pathname: string): boolean {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const allowedRoutes = routesByRole[role] ?? ["/app/profile"];

  return allowedRoutes.includes(normalizedPath);
}
