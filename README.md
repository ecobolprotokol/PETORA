# Petora — Sistem Manajemen Terpadu Petshop & Petcare

Sistem manajemen all-in-one untuk bisnis Petshop & Petcare di Indonesia. Mengintegrasikan seluruh operasional bisnis dalam satu platform modern, owner-configurable, dan siap multi-cabang.

## Tech Stack

- **Frontend:** Next.js 16 + TypeScript + Tailwind CSS v4 + shadcn/ui
- **Backend:** Supabase (PostgreSQL + Auth + RLS + Storage + Realtime)
- **State:** Zustand + TanStack Query v5
- **Forms:** React Hook Form + Zod
- **Deploy:** Vercel

## Features

- Customer & Pet Management
- Appointment & Queue System
- Medical Records & Prescriptions
- Pet Hotel & Grooming
- POS & Invoicing
- Inventory Management
- Payment System (Manual + Gateway)
- Loyalty Program & Promotions
- Multi-branch Support
- Customer Portal & Self-Service Kiosk
- Telemedicine
- Delivery Management
- Subscription Plans
- Employee Commissions
- Marketing Campaigns

## Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Setup shadcn/ui
npx shadcn@latest init --defaults --force
npx shadcn@latest add button card input ...

# Start development server
npm run dev
```

## Database Setup

```bash
# Start Supabase locally
supabase start

# Run migrations
supabase db push

# Seed default data
npm run seed
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Login, forgot-password
│   ├── (dashboard)/       # Staff dashboard
│   ├── (portal)/          # Customer portal
│   ├── (kiosk)/           # Self-service kiosk
│   ├── actions/           # Server Actions
│   └── api/               # Webhooks
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── shared/            # Reusable components
│   ├── domain/            # Feature-specific components
│   └── layout/            # Layout components
├── lib/
│   ├── supabase/          # Supabase clients
│   ├── services/          # Domain services
│   ├── utils/             # Utilities
│   └── constants/         # Default settings
├── hooks/                 # Custom React hooks
├── stores/                # Zustand stores
├── types/                 # TypeScript types
├── schemas/               # Zod schemas
└── messages/              # i18n translations
```

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Lint code
npm run seed         # Seed database
```

## Seed Demo Accounts

Demo accounts are created directly through the Supabase Auth Admin API and synchronized to `public.profiles`. Account credentials are read from individual server-only environment variables; the seeder does not use JSON configuration or hardcoded credentials.

```bash
export SUPABASE_URL="https://<project-ref>.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="<server-only-service-role-key>"
export DEMO_OWNER_EMAIL="owner@petora.local"
export DEMO_OWNER_PASSWORD="<strong-password>"
export DEMO_OWNER_FULL_NAME="Demo Owner"
# Repeat EMAIL, PASSWORD, FULL_NAME for ADMIN, MANAGER, DOKTER, KASIR, GROOMER, COURIER, CUSTOMER.
# Optional for staff: DEMO_<ROLE>_BRANCH_ID="<branch-uuid>"
npm run seed:demo-accounts
```

The seed supports every application role: `OWNER`, `ADMIN`, `MANAGER`, `DOKTER`, `KASIR`, `GROOMER`, `COURIER`, and `CUSTOMER`. It creates or updates Supabase Auth users, confirms their email, sets the role in `app_metadata`, and upserts their profile directly in Supabase. Never commit the service-role key or real passwords.

## Environment Variables

See `.env.example` for required variables. `SUPABASE_SERVICE_ROLE_KEY` must remain server-only and is required only when running the demo-account seeder.

## License

Private - Petora Development Team
