/**
 * 🎯 DASHBOARD - ESTRUCTURA DEL PROYECTO
 * 
 * Este archivo documenta la estructura completa del dashboard implementado
 */

/*
┌─────────────────────────────────────────────────────────────────────────┐
│                          DASHBOARD PAGE                                  │
│                     /app/dashboard                                       │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  📊 SECCIÓN: ESTADÍSTICAS PRINCIPALES                                     │
│  Grid: 4 columnas en desktop, 2 en tablet, 1 en mobile                   │
├──────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ 🐾 Pacientes │  │ 👥 Dueños    │  │ 📄 Reportes  │  │ ✅ Personal  │ │
│  │              │  │              │  │              │  │              │ │
│  │    123       │  │     45       │  │     678      │  │     12       │ │
│  │ 100 activos  │  │ Registrados  │  │ 45 este mes  │  │ De 15 total  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘ │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  📈 SECCIÓN: ESTADÍSTICAS SECUNDARIAS                                     │
│  Grid: 3 columnas                                                         │
├──────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                   │
│  │ 📅 Semana    │  │ 📈 Tendencia │  │ ⚡ Promedio   │                   │
│  │              │  │              │  │              │                   │
│  │     23       │  │    +12%      │  │      3       │                   │
│  │  Reportes    │  │ Incremento   │  │ Reportes/día │                   │
│  └──────────────┘  └──────────────┘  └──────────────┘                   │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  📊 SECCIÓN: GRÁFICOS Y VISUALIZACIONES                                   │
│  Grid: 7 columnas (4 + 3)                                                │
├──────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────┐  ┌─────────────────────────────┐   │
│  │  🐕 Pacientes por Especie       │  │  👤 Personal por Rol        │   │
│  ├─────────────────────────────────┤  ├─────────────────────────────┤   │
│  │  🐕 Perros     [████████] 45%   │  │  🟣 Administradores    3    │   │
│  │  🐈 Gatos      [██████  ] 30%   │  │                             │   │
│  │  🐦 Aves       [███     ] 15%   │  │  🔵 Veterinarios       8    │   │
│  │  🐰 Conejos    [██      ] 10%   │  │                             │   │
│  │  🐾 Otros      [█       ]  5%   │  │  🟢 Auxiliares         4    │   │
│  └─────────────────────────────────┘  └─────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  ⚡ SECCIÓN: ACCIONES RÁPIDAS                                             │
│  Grid: 4 columnas                                                         │
├──────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ 🔵 Nuevo     │  │ 🟢 Nuevo     │  │ 🟣 Crear     │  │ 🟠 Nuevo     │ │
│  │  Paciente    │  │  Propietario │  │  Reporte     │  │  Usuario     │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘ │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  🔔 SECCIÓN: ACTIVIDAD RECIENTE                                           │
├──────────────────────────────────────────────────────────────────────────┤
│  🐾 Nuevo paciente: Max                                                   │
│     Por Juan Pérez · 15 ene 2026, 10:30                                  │
│                                                                           │
│  👥 Nuevo propietario: María García                                       │
│     Por Ana López · 15 ene 2026, 09:15                                   │
│                                                                           │
│  🐾 Nuevo paciente: Luna                                                  │
│     Por Carlos Ruiz · 14 ene 2026, 16:45                                 │
└──────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════
                        ARQUITECTURA DE ARCHIVOS
═══════════════════════════════════════════════════════════════════════════

src/features/user/
│
├── 📁 pages/
│   └── DashboardPage.tsx              ← Página principal
│
├── 📁 components/
│   ├── StatCard.tsx                   ← Tarjeta de estadística
│   ├── SpeciesChart.tsx               ← Gráfico de especies
│   ├── StaffRoles.tsx                 ← Roles del personal
│   ├── RecentActivity.tsx             ← Actividad reciente
│   └── QuickActions.tsx               ← Acciones rápidas
│
├── 📁 services/
│   └── dashboard.service.ts           ← Lógica de datos
│       ├── getDashboardStats()        ← Obtener del servidor
│       └── calculateDashboardStats()  ← Calcular manualmente
│
├── 📁 hooks/
│   └── useDashboardStats.ts           ← Hook personalizado
│       └── Usa TanStack Query
│
└── index.ts                           ← Exportaciones centralizadas


═══════════════════════════════════════════════════════════════════════════
                           FLUJO DE DATOS
═══════════════════════════════════════════════════════════════════════════

┌─────────────┐
│ DashboardPage│
└──────┬──────┘
       │
       │ usa
       ▼
┌──────────────────┐
│useDashboardStats │  ← TanStack Query (cache 5min)
└──────┬───────────┘
       │
       │ llama
       ▼
┌────────────────────┐         ┌─────────────────────┐
│ getDashboardStats()│─error─→ │calculateDashboard   │
│  API: /stats       │         │Stats() - Fallback   │
└────────────────────┘         └──────┬──────────────┘
                                      │
                              APIs:   │
                              /patient│
                              /owner  │
                              /user   │
                                      ▼
                              ┌───────────────┐
                              │ DashboardStats│
                              └───────────────┘
                                      │
                      ┌───────────────┼───────────────┐
                      ▼               ▼               ▼
                ┌─────────┐    ┌──────────┐   ┌──────────┐
                │StatCard │    │Charts    │   │Activity  │
                └─────────┘    └──────────┘   └──────────┘


═══════════════════════════════════════════════════════════════════════════
                        COMPONENTES REUTILIZABLES
═══════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────┐
│ StatCard                                                                 │
├─────────────────────────────────────────────────────────────────────────┤
│ Props:                                                                   │
│   - title: string                                                        │
│   - value: number | string                                               │
│   - icon: LucideIcon                                                     │
│   - description?: ReactNode                                              │
│   - isLoading?: boolean                                                  │
│                                                                          │
│ Uso: <StatCard title="Total" value={100} icon={Icon} />                 │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ SpeciesChart                                                             │
├─────────────────────────────────────────────────────────────────────────┤
│ Props:                                                                   │
│   - data: Array<{species: string, count: number}>                       │
│   - total: number                                                        │
│   - isLoading?: boolean                                                  │
│                                                                          │
│ Uso: <SpeciesChart data={species} total={100} />                        │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ StaffRoles                                                               │
├─────────────────────────────────────────────────────────────────────────┤
│ Props:                                                                   │
│   - data: Array<{role: string, count: number}>                          │
│   - total: number                                                        │
│   - isLoading?: boolean                                                  │
│                                                                          │
│ Uso: <StaffRoles data={roles} total={15} />                             │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ RecentActivity                                                           │
├─────────────────────────────────────────────────────────────────────────┤
│ Props:                                                                   │
│   - activities: Array<ActivityItem>                                     │
│   - isLoading?: boolean                                                  │
│                                                                          │
│ Uso: <RecentActivity activities={list} />                               │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ QuickActions                                                             │
├─────────────────────────────────────────────────────────────────────────┤
│ Props: Ninguna (configuración interna)                                  │
│                                                                          │
│ Acciones:                                                                │
│   - Nuevo Paciente    → /app/patients                                   │
│   - Nuevo Propietario → /app/owners                                     │
│   - Crear Reporte     → /app/medical-reports                            │
│   - Nuevo Usuario     → /app/users                                      │
│                                                                          │
│ Uso: <QuickActions />                                                    │
└─────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════
                           TIPO DE DATOS
═══════════════════════════════════════════════════════════════════════════

interface DashboardStats {
  totalPatients: number;
  activePatients: number;
  inactivePatients: number;
  totalOwners: number;
  totalUsers: number;
  activeUsers: number;
  totalReports: number;
  reportsThisMonth: number;
  reportsThisWeek: number;
  
  patientsBySpecies: Array<{
    species: string;
    count: number;
  }>;
  
  recentActivity: Array<{
    type: string;
    description: string;
    date: string;
    user?: string;
  }>;
  
  usersByRole: Array<{
    role: string;
    count: number;
  }>;
}


═══════════════════════════════════════════════════════════════════════════
                         CARACTERÍSTICAS CLAVE
═══════════════════════════════════════════════════════════════════════════

✅ Diseño Responsivo
   - Mobile-first approach
   - Breakpoints: 768px (tablet), 1024px (desktop)
   - Grid adaptativo

✅ Dark Mode
   - Soporte completo
   - Variables CSS automáticas
   - Contraste optimizado

✅ Performance
   - Cache de 5 minutos
   - Parallel API calls
   - Lazy loading
   - Memoización

✅ UX/UI
   - Animaciones suaves
   - Hover effects
   - Loading states
   - Error handling

✅ Accesibilidad
   - Semantic HTML
   - ARIA labels
   - Keyboard navigation
   - Screen reader friendly

✅ TypeScript
   - 100% tipado
   - Props validadas
   - No any permitidos
   - Schemas con Zod


═══════════════════════════════════════════════════════════════════════════
                      RUTAS Y NAVEGACIÓN
═══════════════════════════════════════════════════════════════════════════

Ruta Principal:
  /app/dashboard  → DashboardPage

Acciones Rápidas Navegan a:
  Nuevo Paciente    → /app/patients
  Nuevo Propietario → /app/owners
  Crear Reporte     → /app/medical-reports
  Nuevo Usuario     → /app/users


═══════════════════════════════════════════════════════════════════════════
                    🎉 DASHBOARD COMPLETO Y LISTO 🎉
═══════════════════════════════════════════════════════════════════════════
*/

export {};
