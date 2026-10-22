import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Phone, Mail, MapPin, PawPrint, ChevronLeft, ChevronRight } from "lucide-react"
import type { OwnerWithPatients } from "../schemas/owner.schema"

interface OwnersTableProps {
    owners: OwnerWithPatients[]
    onViewDetails: (owner: OwnerWithPatients) => void
    onEditOwner: (owner: OwnerWithPatients) => void
    currentPage?: number
    totalPages?: number
    startIndex?: number
    itemsPerPage?: number
    onPageChange?: (page: number) => void
}

export function OwnersTable({
    owners,
    onViewDetails,
    onEditOwner,
    currentPage = 1,
    totalPages = 1,
    startIndex = 0,
    itemsPerPage = 5,
    onPageChange,
}: OwnersTableProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    return (
        <div className="w-full min-w-0 rounded-xl border bg-white shadow-sm">
            <div className="border-b p-3 sm:p-4 md:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <PawPrint className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Lista de Propietarios</h3>
                    </div>
                    <p className="text-sm text-gray-500 sm:text-right">
                        Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, startIndex + owners.length)} de{" "}
                        {startIndex + owners.length} propietarios
                    </p>
                </div>
            </div>

            <div className="rounded-md border-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Propietario</TableHead>
                            <TableHead>Contacto</TableHead>
                            <TableHead>Mascotas</TableHead>
                            <TableHead>Registro</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {owners.map((owner) => (
                            <TableRow key={owner._id}>
                                <TableCell>
                                    <div className="space-y-1">
                                        <div className="font-medium">{owner.name}</div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span>Doc: {owner.document}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <MapPin className="h-3 w-3" />
                                            <span className="truncate max-w-[200px]">{owner.address}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1 text-sm">
                                            <Phone className="h-3 w-3" />
                                            <span>{owner.telephone}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm">
                                            <Mail className="h-3 w-3" />
                                            <span className="truncate max-w-[180px]">{owner.email}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="flex items-center gap-1">
                                            <PawPrint className="h-3 w-3" />
                                            {owner.patients.length}
                                        </Badge>
                                        {owner.patients.length > 0 && (
                                            <div className="text-sm text-muted-foreground">
                                                {owner.patients
                                                    .slice(0, 2)
                                                    .map((patient) => patient.name)
                                                    .join(", ")}
                                                {owner.patients.length > 2 && ` +${owner.patients.length - 2}`}
                                            </div>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm text-muted-foreground">{formatDate(owner.createdAt)}</div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="sm" onClick={() => onViewDetails(owner)}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => onEditOwner(owner)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {onPageChange && totalPages > 1 && (
                <div className="flex flex-col gap-3 border-t px-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-4 md:px-6">
                    <p className="text-sm text-gray-500">
                        Página {currentPage} de {totalPages}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className="flex items-center gap-1"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Anterior
                        </Button>

                        {/* Page numbers */}
                        <div className="flex flex-wrap items-center justify-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={page === currentPage ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => onPageChange(page)}
                                    className={page === currentPage ? "bg-blue-600 hover:bg-blue-700" : ""}
                                >
                                    {page}
                                </Button>
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage >= totalPages}
                            className="flex items-center gap-1"
                        >
                            Siguiente
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
