import { Users, UserCheck, Stethoscope, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardsProps {
  stats: {
    total: number;
    active: number;
    admin: number;
    veterinario: number;
    auxiliar: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-500 to-blue-600">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-white/90">
            Total Usuarios
          </CardTitle>
          <div className="p-2 bg-white/20 rounded-lg">
            <Users className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold text-white">{stats.total}</div>
          <p className="text-white/80 text-sm mt-1">Usuarios registrados</p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-500 to-green-600">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-white/90">
            Usuarios Activos
          </CardTitle>
          <div className="p-2 bg-white/20 rounded-lg">
            <UserCheck className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold text-white">{stats.active}</div>
          <p className="text-white/80 text-sm mt-1">Conectados recientemente</p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-500 to-purple-600">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-white/90">
            Veterinarios
          </CardTitle>
          <div className="p-2 bg-white/20 rounded-lg">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold text-white">
            {stats.veterinario}
          </div>
          <p className="text-white/80 text-sm mt-1">Profesionales médicos</p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-teal-500 to-teal-600">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-transparent"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-white/90">
            Auxiliares
          </CardTitle>
          <div className="p-2 bg-white/20 rounded-lg">
            <Heart className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold text-white">{stats.auxiliar}</div>
          <p className="text-white/80 text-sm mt-1">Personal de apoyo</p>
        </CardContent>
      </Card>
    </div>
  );
}
