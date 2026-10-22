"use client";

import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PatientFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  genderFilter: string;
  setGenderFilter: (value: string) => void;
  sizeFilter: string;
  setSizeFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  speciesFilter: string;
  setSpeciesFilter: (value: string) => void;
}

export function PatientFilters({
  searchTerm,
  setSearchTerm,
  genderFilter,
  setGenderFilter,
  sizeFilter,
  setSizeFilter,
  statusFilter,
  setStatusFilter,
  speciesFilter,
  setSpeciesFilter,
}: PatientFiltersProps) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Search className="h-5 w-5 text-blue-600" />
          Filtros y Búsqueda
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-5">
          <div className="relative min-w-0 sm:col-span-2 2xl:col-span-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar por nombre, raza o propietario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
            <SelectTrigger className="w-full min-w-0 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Filtrar por especie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las especies</SelectItem>
              <SelectItem value="perro">Perro</SelectItem>
              <SelectItem value="gato">Gato</SelectItem>
              <SelectItem value="ave">Ave</SelectItem>
              <SelectItem value="conejo">Conejo</SelectItem>
              <SelectItem value="hamster">Hámster</SelectItem>
              <SelectItem value="tortuga">Tortuga</SelectItem>
              <SelectItem value="pez">Pez</SelectItem>
              <SelectItem value="huron">Hurón</SelectItem>
              <SelectItem value="otro">Otro</SelectItem>
            </SelectContent>
          </Select>

          <Select value={genderFilter} onValueChange={setGenderFilter}>
            <SelectTrigger className="w-full min-w-0 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Filtrar por género" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los géneros</SelectItem>
              <SelectItem value="masculino">Macho</SelectItem>
              <SelectItem value="femenino">Hembra</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sizeFilter} onValueChange={setSizeFilter}>
            <SelectTrigger className="w-full min-w-0 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Filtrar por tamaño" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tamaños</SelectItem>
              <SelectItem value="pequeno">Pequeño</SelectItem>
              <SelectItem value="mediano">Mediano</SelectItem>
              <SelectItem value="grande">Grande</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full min-w-0 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="active">Activos</SelectItem>
              <SelectItem value="inactive">Inactivos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
