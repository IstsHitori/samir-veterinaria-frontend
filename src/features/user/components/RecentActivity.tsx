import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, FileText, PawPrint, Users } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ActivityItem {
  type: string;
  description: string;
  date: string;
  user?: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
  isLoading?: boolean;
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case "patient":
      return <PawPrint className="h-4 w-4" />;
    case "owner":
      return <Users className="h-4 w-4" />;
    case "report":
      return <FileText className="h-4 w-4" />;
    default:
      return <Activity className="h-4 w-4" />;
  }
};

const getActivityLabel = (type: string) => {
  switch (type) {
    case "patient":
      return "Paciente";
    case "owner":
      return "Propietario";
    case "report":
      return "Reporte";
    default:
      return type;
  }
};

export function RecentActivity({ activities, isLoading }: RecentActivityProps) {
  if (isLoading) {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.user && `Por ${activity.user} · `}
                  {format(new Date(activity.date), "PPp", { locale: es })}
                </p>
              </div>
              <Badge variant="outline" className="capitalize">
                {getActivityLabel(activity.type)}
              </Badge>
            </div>
          ))}
          {activities.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No hay actividad reciente
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
