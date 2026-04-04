# Admin Roles Comparison

Compares the four admin roles across the **old system** (Prisma + Nitro REST API, JWT auth) and the **new system** (Supabase + RLS, Supabase Auth).

---

## Role Names

| Old (Prisma enum) | New (Supabase check) |
| ----------------- | -------------------- |
| `ROOT`            | `root`               |
| `MAINTENANCE`     | `maintenance`        |
| `RENEWAL`         | `renewal`            |
| `HOUSING_APPLICATION` | `housing_application` |

---

## Key Architectural Difference

**Old system** — Authorization was enforced in API route handlers and middleware (role checked from the JWT session). The database had no concept of roles; all admins shared the same `Admin` model with relations to renewals, housing_applications, and maintenances.

**New system** — Authorization is enforced at the database level via PostgreSQL Row-Level Security (RLS) policies. A helper function `has_admin_role(role)` returns `true` if the current user has the given role **or** the `root` role, meaning root inherits every other role's permissions automatically.

---

## Permissions by Table

`✅` = allowed &nbsp; `❌` = denied &nbsp; `👁` = read-only &nbsp; `(root)` = root inherits this via `has_admin_role()`

### admins

| Action                          | root  | maintenance | renewal | housing_application |
| ------------------------------- | :---: | :---------: | :-----: | :---------: |
| View all admin records          |   ✅   |     👁¹      |   👁¹    |     👁¹      |
| Create / Update / Delete admins |   ✅   |      ❌      |    ❌    |      ❌      |

> ¹ All admins can view the `admins` table (via `is_admin()` policy), but only `root` can modify it.

---

### users

| Action               | root  | maintenance | renewal | housing_application |
| -------------------- | :---: | :---------: | :-----: | :---------: |
| View active profiles |   ✅   |      ✅      |    ✅    |      ✅      |
| Update any profile   |   ✅   |      ❌      |    ❌    |      ❌      |
| Delete profiles      |   ✅   |      ❌      |    ❌    |      ❌      |

---

### residents

| Action                   |   root   | maintenance | renewal | housing_application |
| ----------------------- | :------: | :---------: | :-----: | :---------: |
| View all residents      |    ✅     |      ✅      |    ✅    |      ✅      |
| Create a resident record | ✅ (root) |      ❌      |    ❌    |      ✅      |
| Update resident records  | ✅ (root) |      ❌      |    ✅    |      ❌      |
| Delete resident records  |    ✅     |      ❌      |    ❌    |      ❌      |

> Housing Application admin creates the resident when a housing application is validated. Renewal admin updates the resident record (e.g., faculty, session) on each renewal.

---

### buildings

| Action                             |   root   | maintenance | renewal | housing_application |
| ---------------------------------- | :------: | :---------: | :-----: | :---------: |
| View active buildings              |    ✅     |      ✅      |    ✅    |      ✅      |
| Create / Update / Delete buildings | ✅ (root) |      ❌      |    ❌    |      ✅      |

---

### lodgments

| Action                             |   root   | maintenance | renewal | housing_application |
| ---------------------------------- | :------: | :---------: | :-----: | :---------: |
| View active lodgments              |    ✅     |      ✅      |    ✅    |      ✅      |
| Create / Update / Delete lodgments | ✅ (root) |      ❌      |    ❌    |      ✅      |

---

### housing_applications

| Action                                                     |   root   | maintenance | renewal | housing_application |
| ---------------------------------------------------------- | :------: | :---------: | :-----: | :---------: |
| View all housing applications                              | ✅ (root) |      ❌      |    ❌    |      ✅      |
| Update housing applications (accept / refuse / validate)   | ✅ (root) |      ❌      |    ❌    |      ✅      |
| Delete housing applications                                |    ✅     |      ❌      |    ❌    |      ❌      |

> Anyone (including anonymous) can **submit** a housing application (public intake form).

---

### renewals

| Action                                       |   root   | maintenance | renewal | housing_application |
| -------------------------------------------- | :------: | :---------: | :-----: | :---------: |
| View all renewals                            | ✅ (root) |      ❌      |    ✅    |      ❌      |
| Update renewals (accept / refuse / validate) | ✅ (root) |      ❌      |    ✅    |      ❌      |
| Delete renewals                              |    ✅     |      ❌      |    ❌    |      ❌      |

> Residents can submit and update their own pending renewal.

---

### maintenances

| Action                                                  |   root   | maintenance | renewal | housing_application |
| ------------------------------------------------------- | :------: | :---------: | :-----: | :---------: |
| View all maintenance requests                           | ✅ (root) |      ✅      |    ❌    |      ❌      |
| Update maintenance requests (accept / schedule / close) | ✅ (root) |      ✅      |    ❌    |      ❌      |
| Delete maintenance requests                             |    ✅     |      ❌      |    ❌    |      ❌      |

> Residents can submit and view their own maintenance requests.

---

### maintainers (external workers)

| Action                               |   root   | maintenance | renewal | housing_application |
| ------------------------------------ | :------: | :---------: | :-----: | :---------: |
| View active maintainers              | ✅ (root) |      ✅      |    ❌    |      ❌      |
| Create / Update / Delete maintainers | ✅ (root) |      ✅      |    ❌    |      ❌      |

---

### maintenance_maintainers (assignments)

| Action                                     |   root   | maintenance | renewal | housing_application |
| ------------------------------------------ | :------: | :---------: | :-----: | :---------: |
| Assign / remove maintainers from a request | ✅ (root) |      ✅      |    ❌    |      ❌      |

---

### academic_sessions

| Action                            | root  | maintenance | renewal | housing_application |
| --------------------------------- | :---: | :---------: | :-----: | :---------: |
| View active sessions              |   ✅   |      ✅      |    ✅    |      ✅      |
| Create / Update / Delete sessions |   ✅   |      ❌      |    ❌    |      ❌      |

---

### faculties

| Action                             | root  | maintenance | renewal | housing_application |
| ---------------------------------- | :---: | :---------: | :-----: | :---------: |
| View active faculties              |   ✅   |      ✅      |    ✅    |      ✅      |
| Create / Update / Delete faculties |   ✅   |      ❌      |    ❌    |      ❌      |

---

### announcements

| Action                                 | root  | maintenance | renewal | housing_application |
| -------------------------------------- | :---: | :---------: | :-----: | :---------: |
| View published announcements           |   ✅   |      ✅      |    ✅    |      ✅      |
| View draft announcements               |   ✅   |      ✅      |    ✅    |      ✅      |
| Create / Update / Delete announcements |   ✅   |      ❌      |    ❌    |      ❌      |

> All admins can see drafts (via `is_admin()`). Only `root` can manage them.

---

## Summary

| Role                      | Primary Responsibility                     | Exclusive Access                                                                     |
| ------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------- |
| **root**                  | System administration, global oversight    | Admins, users, faculties, academic sessions, announcements, delete on all tables      |
| **housing_application**   | Initial housing intake for new residents    | Housing applications, buildings, lodgments, resident creation                         |
| **renewal**               | Annual re-enrollment for existing residents | Renewals, resident record updates                                                     |
| **maintenance**           | Lodgment repair management                 | Maintenance requests, maintainers, assignments                                        |

---

## Old vs New: Notable Differences

| Aspect                   | Old                                              | New                                      |
| ------------------------ | ------------------------------------------------ | ---------------------------------------- |
| Auth mechanism           | JWT (access + refresh tokens)                    | Supabase Auth (sessions)                 |
| Authorization layer      | API route handlers / middleware                  | PostgreSQL RLS policies                  |
| Role casing              | `ROOT`, `MAINTENANCE`, etc.                      | `root`, `maintenance`, etc.              |
| Root inheritance         | Enforced in code                                 | Enforced in DB via `has_admin_role()`    |
| Admin → request relation | Prisma FK relations on `Admin` model (all types) | `admin_id` nullable FK per request table |
| Announcement management  | Any admin (not enforced at DB level)             | Root only (RLS enforced)                 |
| Export endpoints         | Dedicated `/exports/*` routes per entity         | Not yet defined                          |
| Real-time events         | Socket.io on status changes                      | Not yet defined                          |
| Password reset           | JWT reset tokens + email flow                    | Supabase Auth built-in                   |
