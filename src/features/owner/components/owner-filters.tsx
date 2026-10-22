import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OwnerFiltersProps {
    searchTerm: string
    setSearchTerm: (value: string) => void
    petsFilter: string
    setPetsFilter: (value: string) => void
    sortBy: string
    setSortBy: (value: string) => void
}

export function OwnerFilters({
    searchTerm,
    setSearchTerm,
    petsFilter,
    setPetsFilter,
    sortBy,
    setSortBy,
}: OwnerFiltersProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border p-3 sm:p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
                <Search className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-900">Filtros y Búsqueda</h3>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {/* Search */}
                <div className="relative min-w-0 md:col-span-2 xl:col-span-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Buscar por nombre, documento, email o teléfono..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Pets Filter */}
                <Select value={petsFilter} onValueChange={setPetsFilter}>
                    <SelectTrigger>
                        <SelectValue placeholder="Todas las mascotas" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas las mascotas</SelectItem>
                        <SelectItem value="none">Sin mascotas</SelectItem>
                        <SelectItem value="single">1 mascota</SelectItem>
                        <SelectItem value="multiple">Múltiples mascotas</SelectItem>
                    </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                        <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name">Nombre A-Z</SelectItem>
                        <SelectItem value="pets">Más mascotas</SelectItem>
                        <SelectItem value="recent">Más reciente</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
