
import { useState, useEffect } from "react";
import { Search, User, Plus, Check, Phone, Mail, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useOwnerSearch } from "../hooks/use-owner-search";
import type { Owner } from "@/features/owner/schemas/owner.schema";

interface OwnerSearchSelectorProps {
  owners: Owner[];
  selectedOwnerId: string | null;
  onOwnerSelect: (ownerId: string) => void;
  onCreateOwner: () => void;
  error?: string;
}

export function OwnerSearchSelector({
  owners,
  selectedOwnerId,
  onOwnerSelect,
  onCreateOwner,
  error,
}: OwnerSearchSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const searchResults = useOwnerSearch({ owners, searchTerm });
  const selectedOwner = owners.find((owner) => owner._id === selectedOwnerId);

  useEffect(() => {
    setIsSearching(searchTerm.length > 0);
  }, [searchTerm]);

  const handleOwnerSelect = (owner: Owner) => {
    onOwnerSelect(owner._id);
    setSearchTerm("");
    setIsSearching(false);
  };

  const clearSelection = () => {
    onOwnerSelect("");
    setSearchTerm("");
    setIsSearching(false);
  };

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-1 text-sm font-medium">
        <User className="h-4 w-4" />
        Propietario
      </Label>

      {/* Selected Owner Display */}
      {selectedOwner && !isSearching && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-green-800">
                    Propietario Seleccionado
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">
                    {selectedOwner.name}
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                    <Badge variant="outline" className="bg-white">
                      <FileText className="h-3 w-3 mr-1" />
                      {selectedOwner.document}
                    </Badge>
                    <Badge variant="outline" className="bg-white">
                      <Phone className="h-3 w-3 mr-1" />
                      {selectedOwner.telephone}
                    </Badge>
                    <Badge variant="outline" className="bg-white">
                      <Mail className="h-3 w-3 mr-1" />
                      {selectedOwner.email}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={clearSelection}
                className="text-gray-600 hover:text-gray-800 bg-transparent"
              >
                Cambiar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Input */}
      {(!selectedOwner || isSearching) && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar por nombre, documento, teléfono o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Search Results */}
      {isSearching && (
        <Card className="border-gray-200">
          <CardContent className="p-0">
            {searchResults.length > 0 ? (
              <ScrollArea className="max-h-60">
                <div className="p-2">
                  {searchResults.map((owner) => (
                    <div
                      key={owner._id}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                      onClick={() => handleOwnerSelect(owner)}
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {owner.name}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            Doc: {owner.document}
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {owner.telephone}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Seleccionar
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="p-6 text-center">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-3">
                  No se encontraron propietarios
                </p>
                <Button
                  type="button"
                  onClick={onCreateOwner}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Crear Nuevo Propietario
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Create Owner Button (when no search) */}
      {!isSearching && !selectedOwner && (
        <Button
          type="button"
          variant="outline"
          onClick={onCreateOwner}
          className="w-full border-dashed border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 bg-transparent"
        >
          <Plus className="mr-2 h-4 w-4" />
          Crear Nuevo Propietario
        </Button>
      )}

      {/* Error Message */}
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}
