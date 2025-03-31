# Project Structure

This document provides an in-depth overview of the project's architecture and file organization to facilitate navigation and development.

## Architecture Overview

The portfolio website follows a feature-based architecture with a clear separation of concerns:

1. **Core** - Contains foundational application code (types, hooks, configurations)
2. **Features** - Organizes business logic and data by feature/page
3. **Responsive** - Implements device-specific UI components (desktop/mobile)
4. **Shared** - Houses reusable components, hooks, and assets

This architecture prioritizes:
- **Modularity**: Independent features that can be developed in isolation
- **Reusability**: Shared components and hooks across the application
- **Maintainability**: Clear organization making it easier to update specific parts
- **Scalability**: New features can be added without affecting existing ones

## Directory Structure

```
src/
├── core/                      # Core application logic
│   ├── App.tsx                # Main App component with routing
│   ├── config/                # App configuration and constants 
│   │   └── routes.ts          # Route definitions
│   ├── hooks/                 # Custom React hooks
│   │   ├── useScrollPosition.ts  # Track scroll position
│   │   └── useMediaQuery.ts   # Media query detection
│   ├── styles/                # Global styles
│   │   └── globals.css        # Global CSS
│   ├── types/                 # Shared type definitions
│   │   ├── home.ts            # Home page types
│   │   └── projects.ts        # Project types
│   └── utils/                 # Utility functions
│       ├── animations.ts      # Animation utilities
│       └── formatting.ts      # Text/data formatting utilities
│
├── features/                  # Feature-based organization
│   ├── about/                 # About page feature
│   │   ├── components/        # About-specific components
│   │   ├── data/              # About page data
│   │   └── types/             # About-specific types
│   ├── home/                  # Home page feature
│   │   ├── components/        # Home-specific components
│   │   └── data/              # Home page data
│   ├── projects/              # Projects/Work feature
│   │   ├── components/        # Project-specific components
│   │   ├── data/              # Project data
│   │   └── types/             # Project-specific types
│   └── resources/             # Resources feature
│       ├── components/        # Resource-specific components
│       └── data/              # Resources data
│
├── shared/                    # Shared across the application
│   ├── assets/                # Static assets
│   │   ├── etron.png          # Project images
│   │   ├── hydroforce.png     # Project images
│   │   ├── pininfarina.png    # Project images
│   │   ├── profile.jpg        # Profile image
│   │   └── rkm.png            # Project images
│   ├── components/            # Shared components
│   │   ├── Button.tsx         # Button component
│   │   ├── Card.tsx           # Card component
│   │   └── Modal.tsx          # Modal component
│   └── hooks/                 # Shared hooks
│       ├── useCursor.ts       # Custom cursor hook
│       └── useIntersection.ts # Intersection observer hook
│
├── responsive/                # Responsive versions
│   ├── desktop/               # Desktop-specific code
│   │   ├── home/              # Desktop home page
│   │   │   ├── heroSection/   # Home hero section
│   │   │   │   └── component.tsx  # Hero section component
│   │   │   ├── featuredWorkSection/  # Featured work section
│   │   │   │   └── component.tsx  # Featured work component
│   │   │   └── ...            # Other home sections
│   │   ├── work/              # Work/Projects page
│   │   │   ├── heroSection/   # Work hero section
│   │   │   ├── projectsGrid/  # Projects grid display
│   │   │   ├── projectCard/   # Project card component
│   │   │   ├── filterSection/ # Projects filter
│   │   │   ├── projectDetailsModal/  # Project details modal
│   │   │   └── videoLightbox/ # Video popup component
│   │   ├── about/             # About page
│   │   │   ├── heroSection/   # About hero section
│   │   │   ├── timelineSection/  # Career timeline
│   │   │   └── skillsSection/ # Skills display
│   │   └── resources/         # Resources page
│   │       └── ...            # Resources page sections
│   └── mobile/                # Mobile-specific code
│       ├── home/              # Mobile home components
│       │   ├── heroSection/   # Mobile hero section 
│       │   └── ...            # Other mobile sections
│       ├── work/              # Mobile work page
│       ├── about/             # Mobile about page
│       └── resources/         # Mobile resources page
│
├── App.tsx                    # Root App component
├── main.tsx                   # Application entry point
├── index.css                  # Root CSS file (imports TailwindCSS)
└── vite-env.d.ts              # Vite type declarations
```

## Component Organization Pattern

Each component in the responsive directory follows a consistent structure:

```
componentName/
├── component.tsx       # Main component implementation
├── styles.ts           # Component-specific styles (if needed)
└── index.tsx           # Re-export file (if needed)
```

## Key Architecture Patterns

### 1. Feature-First Organization

The codebase is organized by feature rather than by component type. This makes it easier to:
- Understand what each part of the application does
- Find related code quickly
- Make changes to a specific feature without affecting others

### 2. Responsive Component Separation

Instead of using CSS media queries alone, the project separates desktop and mobile implementations into different components:
- **Benefits**: More targeted code, better performance on each device
- **Implementation**: The main App component determines which version to render based on screen size

### 3. Type-Driven Development

TypeScript interfaces define the shape of data throughout the application:
- **Core Types**: Fundamental types used across features (in `core/types/`)
- **Feature-Specific Types**: Types relevant only to a specific feature (in `features/*/types/`)

### 4. Props Pattern

Components receive data and callbacks through props, following a consistent pattern:
- Props interfaces extend base interfaces (e.g., `HomeProps`, `AboutSectionProps`)
- Event handlers like `onCursorChange` are passed down through props
- Animation-related values (opacity, scale) are controlled through props

### 5. Animation Strategy

Animations are implemented using Framer Motion:
- Scroll-triggered animations use `whileInView`
- Interactive elements use `whileHover` and `whileTap`
- Page transitions use AnimatePresence
- Complex animations are controlled via custom hooks

## Code Style Conventions

- **Component Files**: PascalCase component names (e.g., `HeroSection.tsx`)
- **Function Names**: camelCase function names (e.g., `handleClick`)
- **Type Names**: PascalCase type names (e.g., `ProjectProps`)
- **CSS Classes**: TailwindCSS utility classes with consistent ordering
- **File Structure**: Imports → Types → Component → Exports

## Data Management

The application manages data through a structured approach:
- Static data is stored in feature-specific data files (e.g., `features/projects/data/index.ts`)
- Shared assets are stored in the `shared/assets` directory
- Component state is managed with React hooks
- Global app state is handled through prop drilling (for this scale of application)

## Build and Deployment

The project uses Vite for development and building:
- **Development**: `npm run dev` starts the development server
- **Building**: `npm run build` creates an optimized production build
- **Deployment**: Netlify automatically deploys from the main branch
- **Sitemap**: Generated during the build process via `scripts/generate-sitemap.cjs`

## Future Expansion Recommendations

1. **State Management**: For growing complexity, consider adding a lightweight state management solution
2. **Testing**: Add Jest and React Testing Library for unit/integration tests
3. **Storybook**: Implement Storybook for component documentation and testing
4. **Internationalization**: Add i18n support for multiple languages
5. **Performance Monitoring**: Implement Lighthouse CI or similar for performance tracking 