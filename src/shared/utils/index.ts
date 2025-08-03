export function getCutName(name: string): string {
  return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
}
// Función para obtener las iniciales

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}
// Función para obtener el color del badge según el rol
export function getRoleColor(
  role: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (role.toLowerCase()) {
    case "admin":
      return "destructive";
    case "auxiliar":
      return "secondary";
    case "veterinario":
      return "default";
    default:
      return "outline";
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
