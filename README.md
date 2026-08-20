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

Demo accounts are created through Supabase Auth Admin API and synchronized to `public.profiles`. The seeder does not contain credentials, role lists, branch IDs, or other account data in source code; provide them at runtime through `DEMO_ACCOUNTS_JSON`.

```bash
export SUPABASE_URL="https://<project-ref>.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="<server-only-service-role-key>"
export DEMO_ACCOUNTS_JSON='[
  {"email":"owner@petora.local","password":"<strong-password>","role":"OWNER","full_name":"Demo Owner","branch_id":null},
  {"email":"admin@petora.local","password":"<strong-password>","role":"ADMIN","full_name":"Demo Admin","branch_id":null},
  {"email":"manager@petora.local","password":"<strong-password>","role":"MANAGER","full_name":"Demo Manager","branch_id":null},
  {"email":"doctor@petora.local","password":"<strong-password>","role":"DOKTER","full_name":"Demo Doctor","branch_id":null},
  {"email":"cashier@petora.local","password":"<strong-password>","role":"KASIR","full_name":"Demo Cashier","branch_id":null},
  {"email":"groomer@petora.local","password":"<strong-password>","role":"GROOMER","full_name":"Demo Groomer","branch_id":null},
  {"email":"courier@petora.local","password":"<strong-password>","role":"COURIER","full_name":"Demo Courier","branch_id":null},
  {"email":"customer@petora.local","password":"<strong-password>","role":"CUSTOMER","full_name":"Demo Customer","branch_id":null}
]'
npm run seed:demo-accounts
```

The seed supports every application role: `OWNER`, `ADMIN`, `MANAGER`, `DOKTER`, `KASIR`, `GROOMER`, `COURIER`, and `CUSTOMER`. Replace the example values with environment-managed credentials and, for staff accounts, the UUID of the target branch; never commit the service-role key or real passwords.

## Environment Variables

See `.env.example` for required variables. `SUPABASE_SERVICE_ROLE_KEY` must remain server-only and is required only when running the demo-account seeder.

## License

Private - Petora Development Team
