import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SpeciesData {
  species: string;
  count: number;
}

interface SpeciesChartProps {
  data: SpeciesData[];
  total: number;
  isLoading?: boolean;
}

const getSpeciesEmoji = (species: string) => {
  const emojis: { [key: string]: string } = {
    perro: "🐕",
    gato: "🐈",
    ave: "🐦",
    conejo: "🐰",
    hamster: "🐹",
    tortuga: "🐢",
    pez: "🐠",
    huron: "🦦",
    otro: "🐾",
  };
  return emojis[species.toLowerCase()] || "🐾";
};

export function SpeciesChart({ data, total, isLoading }: SpeciesChartProps) {
  if (isLoading) {
    return (
      <Card className="col-span-4 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Pacientes por Especie</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const sortedData = [...data].sort((a, b) => b.count - a.count);

  return (
    <Card className="col-span-4 hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>Pacientes por Especie</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="space-y-4">
          {sortedData.map((item) => {
            const percentage = ((item.count / total) * 100).toFixed(1);
            return (
              <div key={item.species} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getSpeciesEmoji(item.species)}</span>
                    <span className="font-medium capitalize">{item.species}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{item.count}</span>
                    <Badge variant="secondary" className="ml-2">
                      {percentage}%
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
          {data.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No hay datos disponibles
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
