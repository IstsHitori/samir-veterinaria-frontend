import {
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Users,
  Pencil,
} from "lucide-react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { roleColors, roleLabels, roleIcons } from "../constants/user-constants";
import { getInitials, formatDate } from "@/shared/utils";
import type { User } from "../schemas/user.schema";

interface UsersTableProps {
  users: User[];
  currentPage: number;
  totalPages: number;
  startIndex: number;
  itemsPerPage: number;
  onViewDetails: (user: User) => void;
  onEditUser: (user: User) => void;
  onDeactivateUser: (user: User) => void;
  onActivateUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  onPageChange: (page: number) => void;
}

export function UsersTable({
  users,
  currentPage,
  totalPages,
  startIndex,
  itemsPerPage,
  onViewDetails,
  onEditUser,
  onDeactivateUser,
  onActivateUser,
  onDeleteUser,
  onPageChange,
}: UsersTableProps) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          Lista de Usuarios
        </CardTitle>
        <CardDescription>
          Mostrando {startIndex + 1}-
          {Math.min(startIndex + itemsPerPage, users.length)} de {users.length}{" "}
          usuarios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="overflow-x-auto overscroll-x-contain"
          role="region"
          aria-label="Tabla de usuarios"
          tabIndex={0}
        >
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="font-semibold text-gray-700">
                  Usuario
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Rol
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Estado
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Último Acceso
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Fecha Registro
                </TableHead>
                <TableHead className="text-right font-semibold text-gray-700">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                const RoleIcon = roleIcons[user.role];
                return (
                  <TableRow
                    key={user._id}
                    className="hover:bg-blue-50/50 transition-colors border-gray-100"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 ring-2 ring-blue-100">
                          <AvatarImage
                            src={`/placeholder.svg?height=48&width=48`}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 font-semibold">
                            {getInitials(user.firstName, user.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {user._id}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="text-sm font-medium">{user.email}</span>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={`${
                          roleColors[user.role]
                        } font-medium flex items-center gap-1 w-fit`}
                      >
                        <RoleIcon className="h-3 w-3" />
                        {roleLabels[user.role]}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={user.isActive ? "default" : "secondary"}
                        className={
                          user.isActive
                            ? "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border-green-200 font-medium"
                            : "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border-gray-200 font-medium"
                        }
                      >
                        {user.isActive ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="text-sm font-medium text-gray-700">
                        {user.lastLogin
                          ? formatDate(user.lastLogin)
                          : "Sin registro"}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-sm font-medium text-gray-700">
                        {formatDate(user.createdAt)}
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-blue-50"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => onViewDetails(user)}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Eye className="h-4 w-4" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onEditUser(user)}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Pencil className="h-4 w-4" />
                            Editar usuario
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              user.isActive
                                ? onDeactivateUser(user)
                                : onActivateUser(user)
                            }
                            className="flex items-center gap-2"
                          >
                            {user.isActive ? (
                              <>
                                <XCircle className="h-4 w-4" />
                                Desactivar
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4" />
                                Activar
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onDeleteUser(user)}
                            className="text-red-600 flex items-center gap-2"
                          >
                            <XCircle className="h-4 w-4" />
                            Eliminar usuario
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-gray-600">
              Página {currentPage} de {totalPages}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>

              <div className="flex flex-wrap items-center justify-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => onPageChange(page)}
                      className={
                        currentPage === page
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "hover:bg-blue-50"
                      }
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1"
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
