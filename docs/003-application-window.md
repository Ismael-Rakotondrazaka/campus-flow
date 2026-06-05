# 003 — Application Window: Housing & Renewal Periods

## Problem Statement

Students need to know whether applications are open for a given academic session, and the system must prevent submissions outside the intended window. The same applies to renewal requests from current residents.

---

## Solution: Application & Renewal Windows

The `academic_sessions` table includes four columns to control submission periods:

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

- **Application window**: 1 month duration, ending 1 month before the academic session starts
- **Renewal window**: 1 month duration, ending 2 weeks before the application window closes
  - Allows existing residents to renew slightly earlier than new students apply

### Seed Data

All three seeded academic sessions (2023-24, 2024-25, 2025-26) follow this pattern:
- **Application**: July 1 – August 1
- **Renewal**: June 18 – July 18
- Academic session starts: September 1

---

## Implementation Status

### Backend — ✅ COMPLETED

Window enforcement is handled in the ability layer:

- ✅ `StoreHousingApplicationAbility` checks `applicationOpenAt` / `applicationCloseAt` before inserting
- ✅ `StoreRenewalAbility` checks `renewalOpenAt` / `renewalCloseAt` before inserting
- ✅ `GET /api/academic-sessions/active-application` returns the session whose application window is currently open (used by the frontend to gate `/join-community`)

### Frontend — ⚠️ PARTIAL

- ✅ `/join-community` fetches the active application session on page load; shows a "closed" message if none is found
- ❌ `/resident/renewals/create` has no equivalent window guard- ❌ No `GET /api/academic-sessions/active-renewal` endpoint exists yet

### Admin UI — TODO

The "Create/Edit Academic Session" form should include date-time pickers for all four window fields:
- `application_open_at`
- `application_close_at`
- `renewal_open_at`
- `renewal_close_at`
