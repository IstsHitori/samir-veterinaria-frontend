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
            <Card className="bg-gradient-to-br from-blue-400 to-blue-500 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Propietarios</CardTitle>
                    <Users className="h-4 w-4 text-white" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalOwners}</div>
                    <p className="text-xs text-white">Propietarios registrados</p>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-400 to-green-500 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Mascotas</CardTitle>
                    <PawPrint className="h-4 w-4 text-white" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalPatients}</div>
                    <p className="text-xs text-white">Mascotas bajo cuidado</p>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-400 to-pink-500 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Múltiples Mascotas</CardTitle>
                    <Heart className="h-4 w-4 text-white" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.ownersWithMultiplePets}</div>
                    <p className="text-xs text-white">Propietarios con 2+ mascotas</p>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Promedio por Propietario</CardTitle>
                    <TrendingUp className="h-4 w-4 text-white" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.averagePetsPerOwner}</div>
                    <p className="text-xs text-white">Mascotas por propietario</p>
                </CardContent>
            </Card>
        </div>
    )
}
