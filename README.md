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

The default SQL seed (`supabase/seed/0001_default_data.sql`) provisions one aligned legacy owner identity: `owner@petora.app` / `Demo Owner`. The Supabase Auth account is then created or updated by `scripts/seed-demo-accounts.mjs`, which synchronizes the same identity to `public.profiles`. All Auth credentials are configured through one server-only environment variable, `DEMO_ACCOUNTS`; passwords are never stored in SQL.

```bash
export SUPABASE_URL="https://<project-ref>.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="<server-only-service-role-key>"
export DEMO_ACCOUNTS="OWNER|owner@petora.local|<strong-password>|Demo Owner|;ADMIN|admin@petora.local|<strong-password>|Demo Admin|;MANAGER|manager@petora.local|<strong-password>|Demo Manager|;DOKTER|doctor@petora.local|<strong-password>|Demo Doctor|;KASIR|cashier@petora.local|<strong-password>|Demo Cashier|;GROOMER|groomer@petora.local|<strong-password>|Demo Groomer|;COURIER|courier@petora.local|<strong-password>|Demo Courier|;CUSTOMER|customer@petora.local|<strong-password>|Demo Customer|"
npm run seed:demo-accounts
```

Format setiap akun: `ROLE|EMAIL|PASSWORD|FULL_NAME|BRANCH_ID`, dipisahkan dengan `;`. `BRANCH_ID` opsional dan boleh kosong. Seeder membuat atau memperbarui Supabase Auth users, mengonfirmasi email, mengatur role di `app_metadata`, dan meng-upsert profile langsung ke Supabase. Jangan commit service-role key atau password asli.

## Environment Variables

See `.env.example` for required variables. `SUPABASE_SERVICE_ROLE_KEY` must remain server-only and is required only when running the demo-account seeder.

## License

Private - Petora Development Team
