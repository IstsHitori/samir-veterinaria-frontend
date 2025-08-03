import { Mail, Shield, Activity, Calendar, Clock, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { getInitials, formatDate } from "@/shared/utils";
import { roleIcons, roleColors, roleLabels } from "../constants/user-constants";
import type { User } from "../schemas/user.schema";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export function UserDetailsModal({
  isOpen,
  onClose,
  user,
}: UserDetailsModalProps) {
  if (!user) return null;

  const RoleIcon = roleIcons[user.role];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-4xl !w-[800px] max-h-[95vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50/30 p-0">
        {/* Header con diseño mejorado */}
        <DialogHeader className="relative p-6 pb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-green-600/10 rounded-t-lg"></div>
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative flex-shrink-0">
              <Avatar className="h-16 w-16 sm:h-20 sm:w-20 ring-4 ring-white shadow-xl">
                <AvatarImage src={`/placeholder.svg?height=96&width=96`} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-base sm:text-lg font-bold">
                  {getInitials(user.firstName, user.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full shadow-lg">
                <RoleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <DialogTitle className="text-lg sm:text-xl font-bold text-gray-900 mb-2 break-words">
                {user.firstName} {user.lastName}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge
                  className={`${
                    roleColors[user.role]
                  } font-semibold text-xs px-2 py-0.5 flex items-center gap-1`}
                >
                  <RoleIcon className="h-3 w-3" />
                  {roleLabels[user.role]}
                </Badge>
                <Badge
                  className={
                    user.isActive
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold px-2 py-0.5 flex items-center gap-1 text-xs"
                      : "bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold px-2 py-0.5 flex items-center gap-1 text-xs"
                  }
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      user.isActive ? "bg-green-200" : "bg-gray-200"
                    }`}
                  ></div>
                  {user.isActive ? "Activo" : "Inactivo"}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-gray-600 break-all">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{user.email}</span>
                {user.emailValidated ? (
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-6">
          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600">
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8"></div>
              <CardContent className="p-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-blue-100 text-xs font-medium">
                      ID Usuario
                    </p>
                    <p className="text-white text-base sm:text-lg font-bold break-all">
                      #{user._id}
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-white/20 rounded-full flex-shrink-0">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600">
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8"></div>
              <CardContent className="p-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-purple-100 text-xs font-medium">
                      Estado Email
                    </p>
                    <p className="text-white text-base font-bold">
                      {user.emailValidated ? "Verificado" : "Pendiente"}
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-white/20 rounded-full flex-shrink-0">
                    {user.emailValidated ? (
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    ) : (
                      <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg p-4">
                <CardTitle className="flex items-center gap-3 text-base">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Mail className="h-4 w-4" />
                  </div>
                  Información de Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <Mail className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Email Principal
                    </p>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base break-all">
                      {user.email}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {user.emailValidated ? (
                        <>
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          <span className="text-xs text-green-600 font-medium">
                            Verificado
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 text-red-400 flex-shrink-0" />
                          <span className="text-xs text-red-500 font-medium">
                            No verificado
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Role Information */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg p-4">
                <CardTitle className="flex items-center gap-3 text-base">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Shield className="h-4 w-4" />
                  </div>
                  Información del Rol
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-500">
                  <RoleIcon className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Rol Asignado
                    </p>
                    <p className="font-bold text-base sm:text-lg text-gray-900 mb-2">
                      {roleLabels[user.role]}
                    </p>
                    <p className="text-xs text-gray-600">
                      {user.role === "admin" && "Acceso completo al sistema"}
                      {user.role === "veterinario" &&
                        "Gestión de consultas y tratamientos"}
                      {user.role === "auxiliar" && "Apoyo en recepción y citas"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Timeline */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg p-4">
              <CardTitle className="flex items-center gap-3 text-base">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Activity className="h-4 w-4" />
                </div>
                Historial de Actividad
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-500">
                  <div className="p-2 bg-green-500 rounded-full flex-shrink-0">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                      Último Acceso
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {user.lastLogin
                        ? formatDate(user.lastLogin)
                        : "No hay registro"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-l-4 border-blue-500">
                  <div className="p-2 bg-blue-500 rounded-full flex-shrink-0">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                      Fecha de Registro
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-500">
                  <div className="p-2 bg-purple-500 rounded-full flex-shrink-0">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                      Última Actualización
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {formatDate(user.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
