import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Heart, PawPrint, TrendingUp } from "lucide-react"

export interface OwnerStatsCardsProps {
    stats: {
        totalOwners: number
        totalPatients: number
        ownersWithMultiplePets: number
        averagePetsPerOwner: string
    }
}


export function OwnerStatsCards({ stats }: OwnerStatsCardsProps) {

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Propietarios</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalOwners}</div>
                    <p className="text-xs text-muted-foreground">Propietarios registrados</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Mascotas</CardTitle>
                    <PawPrint className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalPatients}</div>
                    <p className="text-xs text-muted-foreground">Mascotas bajo cuidado</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Múltiples Mascotas</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.ownersWithMultiplePets}</div>
                    <p className="text-xs text-muted-foreground">Propietarios con 2+ mascotas</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Promedio por Propietario</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.averagePetsPerOwner}</div>
                    <p className="text-xs text-muted-foreground">Mascotas por propietario</p>
                </CardContent>
            </Card>
        </div>
    )
}
