# Campus Flow

Campus housing management platform for universities. Handles housing applications from prospective students, annual renewal requests from current residents, and lodgment maintenance tracking — all backed by a role-based admin workflow.

## Tech Stack

- **Frontend**: Nuxt 4, Vue 3, TypeScript, TailwindCSS 4, shadcn-nuxt, Reka UI
- **Backend**: Nitro server routes (within Nuxt)
- **Database**: PostgreSQL (self-hosted) via Prisma ORM
- **Auth**: nuxt-auth-utils (HTTP-only cookie sessions, scrypt password hashing)
- **Storage**: S3-compatible storage (SeaweedFS) via AWS SDK — presigned PUT URLs for direct browser uploads
- **Email**: Brevo SMTP
- **Forms**: VeeValidate + Zod
- **State**: Pinia + Pinia Colada
- **i18n**: @nuxtjs/i18n — French (default) and English

## Setup

Copy `.env.example` to `.env` and fill in the required values, then install dependencies:

```bash
npm install
```

Set up the database:

```bash
npx prisma migrate dev
npx prisma db seed
```

## Development

```bash
npm run dev        # http://localhost:3000
npm run typecheck  # TypeScript check
npm run lint       # ESLint
npm run lint:fix   # ESLint auto-fix
```

## Database

```bash
npx prisma migrate dev    # Apply migrations + regenerate client
npx prisma generate       # Regenerate client after schema changes
npx prisma db seed        # Run seed scripts
npx prisma studio         # Open DB browser
npx prisma migrate reset  # Reset DB and re-seed
```

## Production

```bash
npm run build
npm run preview
```

## Roles

| Role | Access |
|------|--------|
| `root` | Full access — admins, residents, all domains |
| `housing_application` | Buildings, lodgments, housing applications |
| `renewal` | Renewal requests |
| `maintenance` | Maintenance requests, maintainers |
| Resident | Own renewals and maintenance requests |
