import { Heart, Activity, Shield, Dog, Cat, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PatientStatsCardsProps {
  stats: {
    total: number;
    active: number;
    vaccinated: number;
    dogs: number;
    cats: number;
    others: number;
  };
}

export function PatientStatsCards({ stats }: PatientStatsCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-500 to-blue-600">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-white/90">
            Total Pacientes
          </CardTitle>
          <div className="p-2 bg-white/20 rounded-lg">
            <Heart className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold text-white">{stats.total}</div>
          <p className="text-white/80 text-sm mt-1">Pacientes registrados</p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-500 to-green-600">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-white/90">
            Pacientes Activos
          </CardTitle>
          <div className="p-2 bg-white/20 rounded-lg">
            <Activity className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold text-white">{stats.active}</div>
          <p className="text-white/80 text-sm mt-1">En tratamiento</p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-500 to-purple-600">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-white/90">
            Vacunados
          </CardTitle>
          <div className="p-2 bg-white/20 rounded-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold text-white">
            {stats.vaccinated}
          </div>
          <p className="text-white/80 text-sm mt-1">Con vacunas al día</p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-500 to-amber-600">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-white/90">
            Perros
          </CardTitle>
          <div className="p-2 bg-white/20 rounded-lg">
            <Dog className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold text-white">{stats.dogs}</div>
          <p className="text-white/80 text-sm mt-1">Caninos registrados</p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-500 to-purple-600">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-white/90">
            Gatos
          </CardTitle>
          <div className="p-2 bg-white/20 rounded-lg">
            <Cat className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold text-white">{stats.cats}</div>
          <p className="text-white/80 text-sm mt-1">Felinos registrados</p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-teal-500 to-teal-600">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-transparent"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-white/90">
            Otros
          </CardTitle>
          <div className="p-2 bg-white/20 rounded-lg">
            <Zap className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold text-white">{stats.others}</div>
          <p className="text-white/80 text-sm mt-1">Otras especies</p>
        </CardContent>
      </Card>
    </div>
  );
}
