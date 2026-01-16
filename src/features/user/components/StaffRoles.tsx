import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface RoleData {
  role: string;
  count: number;
}

interface StaffRolesProps {
  data: RoleData[];
  total: number;
  isLoading?: boolean;
}

const getRoleLabel = (role: string) => {
  const labels: { [key: string]: string } = {
    admin: "Administradores",
    veterinario: "Veterinarios",
    auxiliar: "Auxiliares",
  };
  return labels[role] || role;
};

const getRoleColor = (role: string) => {
  const colors: { [key: string]: string } = {
    admin: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
    veterinario: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    auxiliar: "bg-green-500/10 text-green-700 dark:text-green-400",
  };
  return colors[role] || "bg-gray-500/10 text-gray-700 dark:text-gray-400";
};

export function StaffRoles({ data, total, isLoading }: StaffRolesProps) {
  if (isLoading) {
    return (
      <Card className="col-span-3 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Personal por Rol</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-3 hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>Personal por Rol</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => {
            const percentage = ((item.count / total) * 100).toFixed(0);
            return (
              <div
                key={item.role}
                className={`flex items-center justify-between p-3 rounded-lg transition-all hover:scale-105 ${getRoleColor(
                  item.role
                )}`}
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{getRoleLabel(item.role)}</p>
                  <p className="text-xs opacity-70">{percentage}% del personal</p>
                </div>
                <div className="text-2xl font-bold">{item.count}</div>
              </div>
            );
          })}
          {data.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No hay datos disponibles
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
