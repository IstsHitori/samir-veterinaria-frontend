import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { User, Phone, Mail, MapPin, Calendar, PawPrint, Shield, Stethoscope, AlertTriangle } from "lucide-react"
import type { OwnerWithPatients } from "../schemas/owner.schema"

interface OwnerDetailsModalProps {
    owner: OwnerWithPatients | null
    isOpen: boolean
    onClose: () => void
}

export function OwnerDetailsModal({ owner, isOpen, onClose }: OwnerDetailsModalProps) {
    if (!owner) return null

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }
    const getSpeciesIcon = (type: string) => {
        switch (type) {
            case "perro":
                return "🐕"
            case "gato":
                return "🐱"
            case "ave":
                return "🐦"
            case "conejo":
                return "🐰"
            case "hamster":
                return "🐹"
            case "tortuga":
                return "🐢"
            case "pez":
                return "🐠"
            case "huron":
                return "🦡"
            case "otro":
                return "🐾"
            default:
                return "🐾"
        }
    }

    const getGenderColor = (gender: string) => {
        return gender === "male" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Detalles del Propietario
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Información Personal */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Información Personal</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">Nombre:</span>
                                        <span>{owner.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">Documento:</span>
                                        <span>{owner.document}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">Teléfono:</span>
                                        <span>{owner.telephone}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">Email:</span>
                                        <span>{owner.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">Dirección:</span>
                                        <span>{owner.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">Registro:</span>
                                        <span>{formatDate(owner.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Estadísticas de Mascotas */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PawPrint className="h-5 w-5" />
                                Resumen de Mascotas ({owner.patients.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {owner.patients.length === 0 ? (
                                <p className="text-muted-foreground text-center py-4">Este propietario no tiene mascotas registradas</p>
                            ) : (
                                <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {owner.patients.filter((p) => p.isVaccinated).length}
                                        </div>
                                        <div className="text-sm text-muted-foreground">Vacunadas</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">
                                            {owner.patients.filter((p) => p.isActive).length}
                                        </div>
                                        <div className="text-sm text-muted-foreground">Activas</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-orange-600">
                                            {owner.patients.filter((p) => p.medicalConditions.length > 0).length}
                                        </div>
                                        <div className="text-sm text-muted-foreground">Con Condiciones</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-red-600">
                                            {owner.patients.filter((p) => p.allergies.length > 0).length}
                                        </div>
                                        <div className="text-sm text-muted-foreground">Con Alergias</div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Lista de Mascotas */}
                    {owner.patients.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Mascotas Registradas</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {owner.patients.map((patient, index) => (
                                        <div key={patient._id}>
                                            <div className="flex items-start justify-between p-4 border rounded-lg">
                                                <div className="flex items-start gap-4">
                                                    <div className="text-2xl">{getSpeciesIcon(patient.type)}</div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="font-semibold">{patient.name}</h4>
                                                            <Badge className={getGenderColor(patient.gender)}>
                                                                {patient.gender}
                                                            </Badge>
                                                            {patient.isVaccinated && (
                                                                <Badge variant="outline" className="text-green-600">
                                                                    <Shield className="h-3 w-3 mr-1" />
                                                                    Vacunado
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground space-y-1">
                                                            <div>
                                                                <span className="font-medium">Raza:</span> {patient.breed} |
                                                                <span className="font-medium"> Peso:</span> {patient.weight}kg |
                                                                <span className="font-medium"> Tamaño:</span> {patient.size}
                                                            </div>
                                                            <div>
                                                                <span className="font-medium">Nacimiento:</span> {formatDate(patient.birthDate)}
                                                            </div>
                                                            {patient.medicalConditions.length > 0 && (
                                                                <div className="flex items-center gap-1">
                                                                    <Stethoscope className="h-3 w-3 text-orange-500" />
                                                                    <span className="font-medium">Condiciones:</span>
                                                                    <span>{patient.medicalConditions.join(", ")}</span>
                                                                </div>
                                                            )}
                                                            {patient.allergies.length > 0 && (
                                                                <div className="flex items-center gap-1">
                                                                    <AlertTriangle className="h-3 w-3 text-red-500" />
                                                                    <span className="font-medium">Alergias:</span>
                                                                    <span>{patient.allergies.join(", ")}</span>
                                                                </div>
                                                            )}
                                                            {patient.vaccines.length > 0 && (
                                                                <div className="flex items-center gap-1">
                                                                    <Shield className="h-3 w-3 text-green-500" />
                                                                    <span className="font-medium">Vacunas:</span>
                                                                    <span>{patient.vaccines.join(", ")}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Badge variant={patient.isActive ? "default" : "secondary"}>
                                                    {patient.isActive ? "Activo" : "Inactivo"}
                                                </Badge>
                                            </div>
                                            {index < owner.patients.length - 1 && <Separator className="my-2" />}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
