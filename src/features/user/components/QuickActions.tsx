import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PawPrint, Users, FileText, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Nuevo Paciente",
      description: "Registrar un nuevo paciente",
      icon: PawPrint,
      onClick: () => navigate("/app/patients"),
      color: "bg-blue-500/10 text-blue-700 dark:text-blue-400 hover:bg-blue-500/20",
    },
    {
      title: "Nuevo Propietario",
      description: "Registrar un nuevo propietario",
      icon: Users,
      onClick: () => navigate("/app/owners"),
      color: "bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20",
    },
    {
      title: "Crear Reporte",
      description: "Añadir reporte clínico",
      icon: FileText,
      onClick: () => navigate("/app/medical-reports"),
      color: "bg-purple-500/10 text-purple-700 dark:text-purple-400 hover:bg-purple-500/20",
    },
    {
      title: "Nuevo Usuario",
      description: "Añadir personal",
      icon: UserPlus,
      onClick: () => navigate("/app/users"),
      color: "bg-orange-500/10 text-orange-700 dark:text-orange-400 hover:bg-orange-500/20",
    },
  ];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.title}
                onClick={action.onClick}
                variant="outline"
                className={`h-auto flex-col gap-2 p-4 ${action.color} border-0`}
              >
                <Icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs opacity-70">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
