// Archivo de índice que exporta todos los componentes del dashboard
// Facilita las importaciones y mantiene la organización

// Componentes principales
export { default as DashboardPage } from './pages/DashboardPage';

// Componentes reutilizables
export { StatCard } from './components/StatCard';
export { SpeciesChart } from './components/SpeciesChart';
export { StaffRoles } from './components/StaffRoles';
export { RecentActivity } from './components/RecentActivity';
export { QuickActions } from './components/QuickActions';

// Hooks
export { useDashboardStats } from './hooks/useDashboardStats';

// Services
export {
  getDashboardStats,
  calculateDashboardStats,
  type DashboardStats,
} from './services/dashboard.service';

// Uso recomendado:
// import { DashboardPage, useDashboardStats } from '@/features/user';
