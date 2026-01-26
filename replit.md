# Belgut Technical Training Institute (BTTI) Website

## Overview

This is the official website for Belgut Technical Training Institute (BTTI), a technical and vocational training institution in Kenya. The application provides information about academic programs, admissions, campuses, news, tenders, and institutional leadership. It features a modern, responsive design with green and gold branding representing education/growth and excellence/prestige respectively.

The platform supports:
- Public-facing pages (Home, About, Academics, Admissions, News, Contact)
- Course catalog browsing by department with search functionality
- Online application submission for prospective students
- News and announcements management
- Contact form for inquiries
- Replit Auth integration for user authentication

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state caching and synchronization
- **Styling**: Tailwind CSS with custom design system (shadcn/ui components)
- **Animations**: Framer Motion for page transitions and scroll animations
- **Typography**: DM Sans (body), Outfit (headings), Libre Baskerville (serif accents)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for validation
- **Build Tool**: Vite for frontend, esbuild for server bundling

### Data Storage
- **Database**: PostgreSQL via Drizzle ORM
- **Schema Location**: `shared/schema.ts` defines all tables (departments, courses, campuses, board members, news, tenders, downloads, applications, inquiries)
- **Migrations**: Drizzle Kit with `db:push` command
- **Session Storage**: PostgreSQL-backed sessions via connect-pg-simple

### Authentication
- **Provider**: Replit Auth (OpenID Connect)
- **Session Management**: Express sessions stored in PostgreSQL
- **Implementation**: Located in `server/replit_integrations/auth/`

### Project Structure
```
client/           # React frontend
  src/
    components/   # Reusable UI components (shadcn/ui)
    pages/        # Route page components
    hooks/        # Custom React hooks (use-content, use-auth, use-admin)
    lib/          # Utilities and query client
server/           # Express backend
  replit_integrations/  # Replit Auth integration
shared/           # Shared types, schemas, and route definitions
  schema.ts       # Drizzle database schema
  routes.ts       # API route definitions with Zod validation
```

### Key Design Patterns
- **Shared Schema**: Database schema and Zod validators shared between frontend and backend
- **Type-Safe API**: Route definitions include method, path, input schema, and response schemas
- **Storage Layer**: `server/storage.ts` abstracts all database operations
- **Component Library**: shadcn/ui components in `client/src/components/ui/`

## External Dependencies

### Database
- **PostgreSQL**: Primary database (requires DATABASE_URL environment variable)
- **Drizzle ORM**: Type-safe database queries and schema management

### Authentication
- **Replit Auth**: OpenID Connect provider for user authentication
- **Required Environment Variables**: 
  - `DATABASE_URL` - PostgreSQL connection string
  - `SESSION_SECRET` - Session encryption key
  - `ISSUER_URL` - Replit OIDC issuer (defaults to https://replit.com/oidc)
  - `REPL_ID` - Replit environment identifier

### UI Libraries
- **Radix UI**: Accessible component primitives (dialogs, dropdowns, forms, etc.)
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel component
- **React Day Picker**: Date picker component
- **React Hook Form**: Form state management with Zod resolver

### Build & Development
- **Vite**: Frontend dev server and bundler
- **esbuild**: Server-side bundling for production
- **Replit Vite Plugins**: Dev banner, cartographer, runtime error overlay