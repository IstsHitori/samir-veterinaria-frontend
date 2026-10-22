import { useDashboardStats } from "../hooks/useDashboardStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Activity,
  Users,
  PawPrint,
  FileText,
  TrendingUp,
  UserCheck,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { StatCard } from "../components/StatCard";
import { SpeciesChart } from "../components/SpeciesChart";
import { StaffRoles } from "../components/StaffRoles";
import { RecentActivity } from "../components/RecentActivity";
import { QuickActions } from "../components/QuickActions";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { data: stats, isLoading, isError } = useDashboardStats();

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error al cargar las estadísticas del dashboard. Por favor, intenta
            nuevamente.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-5 p-3 sm:gap-6 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Vista general de tu clínica veterinaria
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Pacientes"
          value={stats?.totalPatients || 0}
          icon={PawPrint}
          description={
            <>
              <span className="text-green-600 font-medium">
                {stats?.activePatients || 0} activos
              </span>{" "}
              · {stats?.inactivePatients || 0} inactivos
            </>
          }
          isLoading={isLoading}
        />

        <StatCard
          title="Total Propietarios"
          value={stats?.totalOwners || 0}
          icon={Users}
          description="Clientes registrados en el sistema"
          isLoading={isLoading}
        />

        <StatCard
          title="Reportes Clínicos"
          value={stats?.totalReports || 0}
          icon={FileText}
          description={
            <>
              <span className="text-blue-600 font-medium">
                {stats?.reportsThisMonth || 0} este mes
              </span>
            </>
          }
          isLoading={isLoading}
        />

        <StatCard
          title="Personal Activo"
          value={stats?.activeUsers || 0}
          icon={UserCheck}
          description={`De ${stats?.totalUsers || 0} usuarios totales`}
          isLoading={isLoading}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Esta Semana"
          value={stats?.reportsThisWeek || 0}
          icon={Calendar}
          description="Reportes registrados"
          isLoading={isLoading}
        />

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tendencia</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold text-green-600">+12%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Incremento este mes
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <StatCard
          title="Promedio Diario"
          value={Math.round((stats?.reportsThisWeek || 0) / 7)}
          icon={Activity}
          description="Reportes por día"
          isLoading={isLoading}
        />
      </div>

      {/* Charts and Details Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <SpeciesChart
          data={stats?.patientsBySpecies || []}
          total={stats?.totalPatients || 1}
          isLoading={isLoading}
        />

        <StaffRoles
          data={stats?.usersByRole || []}
          total={stats?.totalUsers || 1}
          isLoading={isLoading}
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Activity */}
      <RecentActivity
        activities={stats?.recentActivity || []}
        isLoading={isLoading}
      />
    </div>
  );
}
