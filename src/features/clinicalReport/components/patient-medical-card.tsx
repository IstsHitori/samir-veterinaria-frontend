import type { Patient } from "@/features/patient/schemas/patient.schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, Calendar, Weight, Ruler, User, Phone, Eye } from "lucide-react";

interface PatientMedicalCardProps {
  patient: Patient;
  onViewDetails: (patient: Patient) => void;
}

export function PatientMedicalCard({
  patient,
  onViewDetails,
}: PatientMedicalCardProps) {
  const getSpeciesIcon = (species: string) => {
    switch (species) {
      case "perro":
        return "🐕";
      case "gato":
        return "🐱";
      case "ave":
        return "🐦";
      case "conejo":
        return "🐰";
      case "hamster":
        return "🐹";
      case "tortuga":
        return "🐢";
      case "pez":
        return "🐠";
      case "huron":
        return "🦫";
      default:
        return "🐾";
    }
  };

  const getSpeciesColor = (species: string) => {
    switch (species) {
      case "perro":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "gato":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "ave":
        return "bg-sky-100 text-sky-800 border-sky-200";
      case "conejo":
        return "bg-pink-100 text-pink-800 border-pink-200";
      case "hamster":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "tortuga":
        return "bg-green-100 text-green-800 border-green-200";
      case "pez":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "huron":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const years = today.getFullYear() - birth.getFullYear();
    const months = today.getMonth() - birth.getMonth();

    if (years > 0) {
      return `${years} año${years > 1 ? "s" : ""}`;
    } else {
      return `${months} mes${months > 1 ? "es" : ""}`;
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 bg-gradient-to-r from-white to-blue-50/30">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 bg-gradient-to-br from-blue-500 to-blue-600">
              <AvatarFallback className="text-white text-xl font-bold">
                {getSpeciesIcon(patient.type)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {patient.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge
                  className={`${getSpeciesColor(patient.type)} font-medium`}
                >
                  {patient.type}
                </Badge>
                <Badge variant="outline" className="text-gray-600">
                  {patient.breed}
                </Badge>
              </div>
            </div>
          </div>
          <Button
            onClick={() => onViewDetails(patient)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Eye className="h-4 w-4 mr-2" />
            Ver Detalles
          </Button>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span>{calculateAge(patient.birthDate)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Weight className="h-4 w-4 text-green-500" />
            <span>{patient.weight}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Ruler className="h-4 w-4 text-purple-500" />
            <span className="capitalize">{patient.size}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Heart
              className={`h-4 w-4 ${
                patient.isVaccinated ? "text-green-500" : "text-red-500"
              }`}
            />
            <span>{patient.isVaccinated ? "Vacunado" : "Sin vacunar"}</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {patient.ownerId.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {patient.ownerId.telephone}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
