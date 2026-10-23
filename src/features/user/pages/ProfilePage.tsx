import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarDays,
  Mail,
  User,
  Shield,
  Edit,
  Settings,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { EditProfileDialog } from "../components/EditProfileDialog";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { formatDate, getInitials, getRoleColor } from "@/shared/utils";

export default function ProfilePage() {
  const { user } = useAuth();

  const [showEditForm, setShowEditForm] = useState(false);
  const [currentProfile] = useState(user);

  if (!currentProfile) return;
  const profileUpdate = {
    firstName: currentProfile.firstName,
    lastName: currentProfile.lastName,
    email: "",
  };

  return (
    <div className="flex min-w-0 w-full items-center justify-center px-3 py-4 sm:px-4">
      <div className="mx-auto w-full max-w-5xl space-y-6 sm:p-4">
        {/* Header minimalista y elegante */}
        <div className="relative">
          <Card className="border-0 bg-white/70 backdrop-blur-xl shadow-xl shadow-black/5">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                {/* Avatar con diseño limpio */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                  <Avatar className="relative h-20 w-20 border-4 border-white shadow-lg">
                    <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                      {getInitials(
                        currentProfile.firstName,
                        currentProfile.lastName
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 border-3 border-white shadow-lg">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Información principal */}
                <div className="flex-1 text-center lg:text-left space-y-3">
                  <div>
                    <h1 className="text-2xl lg:text-2xl font-bold text-gray-900 mb-1">
                      {currentProfile.firstName} {currentProfile.lastName}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                      <Badge
                        variant={getRoleColor(currentProfile.role)}
                        className="font-medium px-3 py-1 text-sm"
                      >
                        <Shield className="w-3 h-3 mr-1" />
                        {currentProfile.role}
                      </Badge>
                      <span className="break-all text-gray-500 text-sm">
                        {currentProfile.email}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                  <Button
                    onClick={() => setShowEditForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grid de información */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Información Personal */}
          <Card className="border-0 bg-white/70 backdrop-blur-xl shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-600 mb-1">
                      Email
                    </p>
                    <p className="text-gray-900 font-medium truncate text-sm">
                      {currentProfile.email}
                    </p>
                  </div>
                </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100">
                    <p className="text-xs font-medium text-gray-600 mb-1">
                      Nombre
                    </p>
                    <p className="text-gray-900 font-medium text-sm">
                      {currentProfile.firstName}
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                    <p className="text-xs font-medium text-gray-600 mb-1">
                      Apellido
                    </p>
                    <p className="text-gray-900 font-medium text-sm">
                      {currentProfile.lastName}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información de Cuenta */}
          <Card className="border-0 bg-white/70 backdrop-blur-xl shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <CalendarDays className="w-5 h-5 text-emerald-600" />
                </div>
                Información de Cuenta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                  <p className="text-xs font-medium text-gray-600 mb-1">
                    Fecha de Registro
                  </p>
                  <p className="text-gray-900 font-medium text-sm">
                    {formatDate(currentProfile.createdAt)}
                  </p>
                </div>

                <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100">
                  <p className="text-xs font-medium text-gray-600 mb-1">
                    Última Actualización
                  </p>
                  <p className="text-gray-900 font-medium text-sm">
                    {formatDate(currentProfile.updatedAt)}
                  </p>
                </div>

                <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-1">
                        Estado
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-emerald-700 font-medium text-sm">
                          Activa
                        </span>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Acciones principales */}
        <Card className="border-0 bg-white/70 backdrop-blur-xl shadow-lg shadow-black/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Settings className="w-5 h-5 text-purple-600" />
              </div>
              Gestión de Cuenta
            </CardTitle>
            <CardDescription className="text-gray-600">
              Administra tu perfil
            </CardDescription>
          </CardHeader>
          <CardContent>
              <div className="grid gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowEditForm(true)}
                className="h-16 justify-start bg-blue-50/50 border-blue-200 hover:bg-blue-100/50 hover:border-blue-300 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                    <Edit className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-sm">
                      Editar Perfil
                    </div>
                    <div className="text-xs text-gray-600">
                      Actualizar información
                    </div>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer elegante */}
        <div className="text-center py-4">
          <span className="text-xs text-gray-500">
            Actualizado {formatDate(currentProfile.updatedAt)}
          </span>
        </div>

        {/* Diálogos */}
        <EditProfileDialog
          open={showEditForm}
          onOpenChange={setShowEditForm}
          profile={profileUpdate}
        />
      </div>
    </div>
  );
}
