# Dashboard de la Aplicación Veterinaria

## Descripción General

El dashboard es la página principal de la aplicación veterinaria que proporciona una vista completa y en tiempo real de todas las operaciones de la clínica.

## Características Principales

### 📊 Estadísticas Principales

El dashboard muestra 4 métricas principales en tarjetas destacadas:

1. **Total Pacientes**
   - Muestra el número total de pacientes registrados
   - Indica cuántos están activos e inactivos
   - Icono: Huella de pata (PawPrint)

2. **Total Propietarios**
   - Muestra el número total de clientes registrados
   - Descripción: "Clientes registrados en el sistema"
   - Icono: Usuarios (Users)

3. **Reportes Clínicos**
   - Muestra el número total de reportes médicos
   - Destaca los reportes del mes actual
   - Icono: Archivo de texto (FileText)

4. **Personal Activo**
   - Muestra el número de usuarios activos
   - Indica el total de usuarios registrados
   - Icono: Usuario con check (UserCheck)

### 📈 Estadísticas Secundarias

Tres tarjetas adicionales con métricas complementarias:

1. **Esta Semana**: Reportes registrados en los últimos 7 días
2. **Tendencia**: Muestra el crecimiento porcentual (+12%)
3. **Promedio Diario**: Cálculo de reportes promedio por día

### 📉 Gráficos y Visualizaciones

#### Pacientes por Especie
- Gráfico de barras horizontal con distribución de pacientes por tipo de animal
- Incluye emojis para cada especie (🐕 perro, 🐈 gato, 🐦 ave, etc.)
- Muestra el porcentaje y cantidad de cada especie
- Barras animadas con colores del tema

#### Personal por Rol
- Tarjetas individuales para cada rol (Admin, Veterinario, Auxiliar)
- Código de colores distintivo:
  - 🟣 Administradores: Morado
  - 🔵 Veterinarios: Azul
  - 🟢 Auxiliares: Verde
- Muestra el porcentaje del total de personal

### ⚡ Acciones Rápidas

Botones de acceso directo a las funciones principales:

1. **Nuevo Paciente** (Azul)
   - Navega a la página de pacientes
   - Permite registrar nuevos pacientes

2. **Nuevo Propietario** (Verde)
   - Navega a la página de propietarios
   - Permite registrar nuevos clientes

3. **Crear Reporte** (Morado)
   - Navega a reportes médicos
   - Permite crear nuevos reportes clínicos

4. **Nuevo Usuario** (Naranja)
   - Navega a la gestión de usuarios
   - Permite añadir nuevo personal

### 🔔 Actividad Reciente

Lista cronológica de las últimas acciones en el sistema:

- Muestra hasta 8 actividades recientes
- Incluye:
  - Nuevos pacientes registrados
  - Nuevos propietarios añadidos
  - Fecha y hora formateada en español
  - Usuario que realizó la acción
- Badges con categorías (Paciente, Propietario, Reporte)

## Arquitectura Técnica

### Estructura de Archivos

```
features/user/
├── pages/
│   └── DashboardPage.tsx          # Página principal del dashboard
├── components/
│   ├── StatCard.tsx               # Tarjetas de estadísticas reutilizables
│   ├── SpeciesChart.tsx           # Gráfico de pacientes por especie
│   ├── StaffRoles.tsx             # Componente de roles de personal
│   ├── RecentActivity.tsx         # Lista de actividad reciente
│   └── QuickActions.tsx           # Botones de acciones rápidas
├── services/
│   └── dashboard.service.ts       # Servicios para obtener estadísticas
└── hooks/
    └── useDashboardStats.ts       # Hook personalizado para datos
```

### Tecnologías Utilizadas

- **React 19**: Framework principal
- **TypeScript**: Tipado fuerte
- **TanStack Query**: Gestión de estado del servidor
- **Shadcn UI**: Componentes de interfaz
- **Tailwind CSS**: Estilos y diseño responsivo
- **Lucide React**: Iconos
- **date-fns**: Formateo de fechas en español
- **React Router**: Navegación
- **Zod**: Validación de esquemas

### Servicios

#### getDashboardStats()
Intenta obtener estadísticas desde el endpoint del servidor:
```typescript
GET /api/dashboard/stats
```

#### calculateDashboardStats()
Si el endpoint no está disponible, calcula las estadísticas manualmente combinando datos de:
- `/api/patient` - Información de pacientes
- `/api/owner` - Información de propietarios
- `/api/user` - Información de usuarios

### Hook Personalizado

`useDashboardStats()` implementa:
- Cache de 5 minutos (staleTime)
- Refetch automático al cambiar de ventana
- Manejo de errores con fallback
- Loading states para cada componente

## Diseño y UX

### Características de Diseño

1. **Responsivo**: Adaptable a móviles, tablets y desktop
2. **Dark Mode**: Soporte completo para tema oscuro
3. **Animaciones Suaves**: Transiciones y hover effects
4. **Loading States**: Skeletons mientras cargan los datos
5. **Error Handling**: Mensajes claros de error

### Grid System

- Mobile (< 768px): 1 columna
- Tablet (768px - 1024px): 2 columnas
- Desktop (> 1024px): 4 columnas para stats, 7 columnas para gráficos

### Paleta de Colores

- **Primary**: Basado en el tema del sistema
- **Success/Active**: Verde (#10b981)
- **Info/Reports**: Azul (#3b82f6)
- **Trend Positive**: Verde (#16a34a)
- **Secondary**: Basado en el tema

## Mantenimiento y Extensión

### Añadir Nuevas Estadísticas

1. Actualizar el schema en `dashboard.service.ts`:
```typescript
const dashboardStatsSchema = z.object({
  // ... estadísticas existentes
  nuevaMetrica: z.number(),
});
```

2. Actualizar la función `calculateDashboardStats()` para calcular la nueva métrica

3. Crear o actualizar componente para mostrar la estadística

### Añadir Nuevos Gráficos

1. Crear componente en `features/user/components/`
2. Importar en `DashboardPage.tsx`
3. Añadir al grid correspondiente
4. Pasar datos desde el hook `useDashboardStats()`

### Personalizar Acciones Rápidas

Editar el array `actions` en `QuickActions.tsx`:
```typescript
const actions = [
  {
    title: "Nueva Acción",
    description: "Descripción",
    icon: IconComponent,
    onClick: () => navigate("/ruta"),
    color: "bg-color-500/10 text-color-700",
  },
];
```

## Performance

### Optimizaciones Implementadas

1. **Query Caching**: 5 minutos de cache con TanStack Query
2. **Lazy Loading**: Componentes cargados bajo demanda
3. **Memoización**: Cálculos optimizados en componentes
4. **Skeleton Loading**: Mejora percepción de velocidad
5. **Parallel Requests**: Múltiples endpoints en paralelo

### Métricas Objetivo

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Total Load Time**: < 4s

## Seguridad

- Validación de datos con Zod
- Manejo seguro de tokens
- Sanitización de datos del servidor
- Error boundaries para manejo de errores

## Testing

### Áreas de Testing Recomendadas

1. **Unit Tests**:
   - Servicios de dashboard
   - Hooks personalizados
   - Funciones de cálculo

2. **Integration Tests**:
   - Flujo completo de carga de datos
   - Interacción con acciones rápidas
   - Navegación entre páginas

3. **E2E Tests**:
   - Carga completa del dashboard
   - Verificación de estadísticas
   - Responsive design

## Recursos Adicionales

- [Documentación de Shadcn UI](https://ui.shadcn.com/)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Lucide Icons](https://lucide.dev/)
- [date-fns Documentation](https://date-fns.org/)

## Contacto y Soporte

Para reportar bugs o sugerir mejoras al dashboard, contactar al equipo de desarrollo.
