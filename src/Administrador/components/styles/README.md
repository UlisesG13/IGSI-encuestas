# Sistema de Estilos IGSI

Este directorio contiene todos los estilos CSS organizados siguiendo la metodología Atomic Design y las mejores prácticas de CSS.

## Estructura de Archivos

```
styles/
├── index.css          # Archivo principal que importa todos los estilos
├── global.css         # Variables CSS, reset y utilidades globales
├── atoms.css          # Estilos para componentes atómicos
├── molecules.css      # Estilos para componentes moleculares
├── organisms.css      # Estilos para componentes organismos
├── pages.css          # Estilos para páginas completas
└── README.md          # Esta documentación
```

## Metodología

### Atomic Design
Los estilos están organizados siguiendo la metodología Atomic Design:

- **Atoms**: Componentes básicos (botones, inputs, labels, etc.)
- **Molecules**: Combinaciones de átomos (formularios, cards, etc.)
- **Organisms**: Secciones complejas (headers, listas, formularios grandes)
- **Pages**: Páginas completas

### BEM (Block Element Modifier)
Utilizamos la metodología BEM para nombrar las clases CSS:

```css
.block {}
.block__element {}
.block__element--modifier {}
```

Ejemplo:
```css
.departament-card {}
.departament-card__header {}
.departament-card__title {}
.departament-card__title--large {}
```

## Variables CSS

El archivo `global.css` define variables CSS para mantener consistencia:

### Colores
```css
--color-primary: #ea580c;        /* Naranja principal */
--color-secondary: #3b82f6;      /* Azul secundario */
--color-text-primary: #111827;   /* Texto principal */
--color-text-secondary: #374151; /* Texto secundario */
--color-bg-primary: #ffffff;     /* Fondo principal */
--color-bg-secondary: #f9fafb;   /* Fondo secundario */
```

### Espaciado
```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
```

### Tipografía
```css
--font-family-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
```

## Componentes Principales

### Atoms
- `DepartamentMenuButton`: Botón de menú con dropdown
- `InfoCard`: Tarjeta de información
- `Logo`: Logo de la aplicación
- `NavButton`: Botón de navegación
- `PerfilButton`: Botón de perfil
- `CloseSesionButton`: Botón de cerrar sesión
- `InputAtom`: Campo de entrada básico
- `TextArea`: Área de texto
- `LabelAtom`: Etiqueta de formulario
- `ButtomAtom`: Botón básico

### Molecules
- `DepartamentCard`: Tarjeta de departamento
- `DashboardCards`: Conjunto de tarjetas del dashboard
- `HeaderLogo`: Logo del header
- `InputFieldMolecule`: Campo de entrada con etiqueta
- `TextareaFieldMolecule`: Área de texto con etiqueta

### Organisms
- `Header`: Header principal de la aplicación
- `DepartamentsList`: Lista de departamentos
- `DepartmentFormOrganism`: Formulario de departamento

### Pages
- `DepartamentosDashboard`: Página principal del dashboard

## Utilidades CSS

El archivo `global.css` incluye utilidades CSS para:

### Espaciado
```css
.mt-1, .mb-1, .pt-1, .pb-1 /* Márgenes y padding */
```

### Display
```css
.d-flex, .d-grid, .d-none /* Propiedades de display */
```

### Flexbox
```css
.flex-row, .flex-col, .justify-center, .items-center
```

### Grid
```css
.grid-cols-1, .grid-cols-2, .grid-cols-3, .grid-cols-4
```

### Texto
```css
.text-center, .text-left, .text-right
.font-bold, .font-medium, .font-normal
```

### Colores
```css
.text-primary, .text-secondary, .text-muted
.bg-primary, .bg-secondary, .bg-tertiary
```

## Responsive Design

Los estilos incluyen breakpoints para diseño responsive:

```css
@media (max-width: 640px) { /* sm */ }
@media (max-width: 768px) { /* md */ }
@media (max-width: 1024px) { /* lg */ }
```

## Animaciones

Se incluyen animaciones predefinidas:

```css
.fade-in          /* Animación de aparición */
.slide-in-left    /* Deslizamiento desde la izquierda */
.slide-in-right   /* Deslizamiento desde la derecha */
.loading          /* Animación de carga */
```

## Componentes Adicionales

### Modales
```css
.modal-overlay, .modal, .modal__header, .modal__content
```

### Notificaciones
```css
.notification, .notification--success, .notification--error
```

### Tabs
```css
.tabs, .tabs__list, .tabs__button, .tabs__content
```

### Acordeones
```css
.accordion, .accordion__item, .accordion__header
```

### Paginación
```css
.pagination, .pagination__button, .pagination__button--active
```

### Spinners
```css
.spinner, .spinner--sm, .spinner--lg
```

### Skeleton Loading
```css
.skeleton, .skeleton--text, .skeleton--card
```

## Uso

Para usar estos estilos en tu aplicación:

1. Importa el archivo principal en tu componente principal:
```javascript
import './components/styles/index.css';
```

2. Usa las clases CSS en tus componentes:
```jsx
<div className="departament-card">
  <div className="departament-card__header">
    <h3 className="departament-card__title">Título</h3>
  </div>
</div>
```

3. Utiliza las utilidades CSS para ajustes rápidos:
```jsx
<div className="d-flex justify-center items-center gap-3">
  <button className="button-atom">Botón</button>
</div>
```

## Mantenimiento

- Mantén la consistencia usando las variables CSS
- Sigue la metodología BEM para nombrar clases
- Agrega nuevos estilos en el archivo correspondiente según el nivel del componente
- Documenta cualquier cambio significativo en este README
