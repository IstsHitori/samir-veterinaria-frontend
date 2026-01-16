import { useQuery } from "@tanstack/react-query";
import {
  calculateDashboardStats,
  getDashboardStats,
} from "../services/dashboard.service";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      try {
        // Intentar obtener stats del endpoint primero
        return await getDashboardStats();
      } catch (error) {
        // Si falla, calcular manualmente
        return await calculateDashboardStats();
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: true,
  });
}
