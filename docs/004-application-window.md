# 004 — Application Window: Housing & Renewal Periods

## Problem Statement

Students need to know whether applications are open for a given academic session, and the system must prevent submissions outside the intended window. The same applies to renewal requests from current residents.

---

## Solution: Application & Renewal Windows

The `academic_sessions` table now includes four columns to control submission periods:

| Column | Type | Purpose |
|--------|------|---------|
| `application_open_at` | `timestamptz` | Start of new application submission period |
| `application_close_at` | `timestamptz` | End of new application submission period |
| `renewal_open_at` | `timestamptz` | Start of renewal submission period |
| `renewal_close_at` | `timestamptz` | End of renewal submission period |

Additional constraints ensure:
- Application window dates are valid (`application_close_at > application_open_at`)
- Renewal window dates are valid (`renewal_close_at > renewal_open_at`)
- Renewal ends before application closes (`renewal_close_at < application_close_at`)

---

## Implementation Details

### Window Timing

For the current implementation:
- **Application window**: 1 month duration, ending 1 month before the academic session starts
  - Provides time for admins to process applications before the session begins
- **Renewal window**: 1 month duration, ending 2 weeks before the application window closes
  - Allows existing residents to renew slightly earlier than new students apply

### Seed Data

All three seeded academic sessions (2023-24, 2024-25, 2025-26) follow this pattern:
- **Application**: July 1 – August 1
- **Renewal**: June 18 – July 18
- Academic session starts: September 1

---

## Implementation Status

### Backend (Supabase RLS Policies) — ✅ COMPLETED

Window enforcement policies have been added to `housing_applications` and `renewals` tables:

- ✅ `housing_applications` INSERT policy enforces `application_open_at` / `application_close_at`
- ✅ `renewals` INSERT policy enforces `renewal_open_at` / `renewal_close_at`
- ✅ Both policies verify the session is active (`deleted_at IS NULL`)

### Frontend — TODO

Implement window status checking:

```ts
type WindowStatus = 'upcoming' | 'open' | 'closed' | 'not_scheduled'

function getWindowStatus(openAt: string | null, closeAt: string | null): WindowStatus {
  if (!openAt || !closeAt) return 'not_scheduled'
  const now = new Date()
  const open = new Date(openAt)
  const close = new Date(closeAt)
  
  if (now < open) return 'upcoming'
  if (now > close) return 'closed'
  return 'open'
}
```

Use this to:
- Show the application/renewal form only when status is `'open'`
- Display countdown timers when status is `'upcoming'`
- Display closure message when status is `'closed'`

### Admin UI — TODO

The "Create/Edit Academic Session" form should include date-time pickers for:
- `application_open_at`
- `application_close_at`
- `renewal_open_at`
- `renewal_close_at`
