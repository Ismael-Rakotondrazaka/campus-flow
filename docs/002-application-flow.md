# Campus Flow — Application Flow Documentation

## Table of Contents

1. [System Architecture](#1-system-architecture)
2. [Data Model](#2-data-model)
3. [Authentication & Authorization](#3-authentication--authorization)
4. [Housing Application Workflow](#4-housing-application-workflow)
5. [Renewal Workflow](#5-renewal-workflow)
6. [Maintenance Workflow](#6-maintenance-workflow)
7. [API Endpoints Overview](#7-api-endpoints-overview)

---

## 1. System Architecture

```mermaid
graph TB
    subgraph Client["Client Layer"]
        Browser["Browser (Nuxt SSR/SPA)"]
    end

    subgraph App["Application Layer"]
        Nuxt["Nuxt 4 Frontend\n(Vue 3 + TypeScript)"]
        Nitro["Nitro Server Routes\n(server/api/ + server/routes/)"]
    end

    subgraph Services["External Services"]
        S3["S3-compatible Storage\n(SeaweedFS — images, documents)"]
        Brevo["Brevo SMTP\n(Email notifications)"]
    end

    subgraph Data["Data Layer"]
        Prisma["Prisma ORM"]
        Postgres["PostgreSQL (self-hosted)"]
    end

    Browser --> Nuxt
    Nuxt --> Nitro
    Nitro --> Prisma
    Prisma --> Postgres
    Nitro --> S3
    Nitro --> Brevo
    Browser --> S3
```

> The browser uploads files **directly to S3** using presigned PUT URLs obtained from Nitro. Nitro never streams file bytes.

---

## 2. Data Model

> All IDs are `String` (UUID v4). Field names follow Prisma camelCase convention.

```mermaid
erDiagram
    User {
        String id PK
        String email
        String role "admin | resident"
        DateTime deletedAt
    }

    UserIdentity {
        String id PK
        String userId FK
        String provider "email | google | ..."
        String providerId
        String password "scrypt hash (email only)"
    }

    Admin {
        String id PK_FK
        String firstName
        String lastName
        String phoneNumber
        String imageUrl
        String role "root | maintenance | renewal | housing_application"
        DateTime deletedAt
    }

    Resident {
        String id PK_FK
        String firstName
        String lastName
        String phoneNumber
        String imageUrl
        String facultyId FK
        String academicSessionId FK
        String lodgmentId FK
        String gender "male | female"
        String origin "national | foreigner"
        String emergencyNumber
        String nic
        DateTime deletedAt
    }

    Faculty {
        String id PK
        String name
        DateTime deletedAt
    }

    AcademicSession {
        String id PK
        DateTime startAt
        DateTime endAt
        DateTime applicationOpenAt
        DateTime applicationCloseAt
        DateTime renewalOpenAt
        DateTime renewalCloseAt
        DateTime deletedAt
    }

    Building {
        String id PK
        String name
        Int floors
        String illustrationUrl
        Int lodgmentsCount
        Int residentsCount
        Int totalCapacity
        Int capacityRemaining
        DateTime deletedAt
    }

    Lodgment {
        String id PK
        String buildingId FK
        Int floor
        Int roomNumber
        Int capacity
        Int residentsCount
        Int capacityRemaining
        DateTime deletedAt
    }

    HousingApplication {
        String id PK
        String firstName
        String lastName
        String phoneNumber
        String imageUrl
        String email
        String gender
        String origin
        String emergencyNumber
        String nic
        String nicUrl
        String schoolCertificateUrl
        String facultyId FK
        String academicSessionId FK
        String lodgmentId FK
        String status "pending | accepted | refused | validated"
        String refusalReason
    }

    Renewal {
        String id PK
        String residentId FK
        String academicSessionId FK
        String facultyId FK
        String phoneNumber
        String emergencyNumber
        String imageUrl
        String nicUrl
        String schoolCertificateUrl
        String status "pending | accepted | refused | validated"
        String refusalReason
    }

    Maintenance {
        String id PK
        String residentId FK
        String lodgmentId FK
        String type "electrical | plumbing | equipment | hvac | other"
        String description
        String status "pending | accepted | done | refused"
        DateTime startAt
        DateTime endAt
    }

    Maintainer {
        String id PK
        String firstName
        String lastName
        String phoneNumber
        String imageUrl
        DateTime deletedAt
    }

    MaintenanceMaintainer {
        String maintenanceId PK_FK
        String maintainerId PK_FK
        DateTime assignedAt
    }

    Announcement {
        String id PK
        String title
        String content
        String illustrationUrl
        String status "draft | published"
        DateTime deletedAt
    }

    AuditLog {
        String id PK
        String actorId
        String action
        String targetTable
        String targetId
        Json metadata
        DateTime createdAt
    }

    User ||--o| Admin : "is"
    User ||--o| Resident : "is"
    User ||--o{ UserIdentity : "authenticated via"
    Faculty ||--o{ Resident : "enrolled in"
    Faculty ||--o{ HousingApplication : "applied for"
    Faculty ||--o{ Renewal : "declared in"
    AcademicSession ||--o{ Resident : "registered in"
    AcademicSession ||--o{ HousingApplication : "for"
    AcademicSession ||--o{ Renewal : "for"
    Building ||--o{ Lodgment : "contains"
    Lodgment ||--o{ Resident : "assigned to"
    Lodgment ||--o{ HousingApplication : "assigned at validation"
    Lodgment ||--o{ Maintenance : "subject of"
    Resident ||--o{ Renewal : "submits"
    Resident ||--o{ Maintenance : "submits"
    Maintenance }o--o{ Maintainer : "assigned to"
    MaintenanceMaintainer }|--|| Maintenance : ""
    MaintenanceMaintainer }|--|| Maintainer : ""
```

---

## 3. Authentication & Authorization

### Login Flow

```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant API as Nitro API
    participant DB as PostgreSQL (Prisma)

    User->>Frontend: POST /login (email, password)
    Frontend->>API: POST /api/auth/login
    API->>DB: Find User + UserIdentity by email
    DB-->>API: User + hashed password
    API->>API: verifyPassword(password, hash)

    alt Invalid credentials
        API-->>Frontend: 401 Unauthorized
        Frontend-->>User: Show error
    else Valid credentials
        API->>API: setUserSession(event, { user })
        API-->>Frontend: Set-Cookie (HTTP-only session)
        Frontend-->>User: Redirect to dashboard
    end
```

> Sessions are managed by **nuxt-auth-utils** using signed HTTP-only cookies. There are no JWT access tokens or refresh tokens.

### Session Shape

```mermaid
graph LR
    subgraph AdminSession
        A1["id\nemail\nfirstName\nlastName\nfullName\nrole\nimageUrl"]
    end

    subgraph ResidentSession
        R1["id\nemail\nfirstName\nlastName\nfullName\nnic\nimageUrl"]
    end

    AdminSession -->|used in| AdminRoutes["Admin-only routes"]
    ResidentSession -->|used in| ResidentRoutes["Resident-only routes"]
```

### Role-Based Access Control

```mermaid
graph LR
    subgraph Roles
        Root["root admin\n(full access)"]
        HA["housing_application admin"]
        Renewal["renewal admin"]
        Maintenance["maintenance admin"]
        Resident["Resident (authenticated)"]
    end

    subgraph Resources
        Core["Admins, Residents\nFaculties, AcademicSessions\nAnnouncements"]
        BuildingsLodgments["Buildings, Lodgments\nHousing Applications"]
        Renewals["Renewals"]
        Maintenances["Maintenances, Maintainers"]
        OwnData["Own Renewals\nOwn Maintenances"]
    end

    Root -->|manage all| Core
    Root -->|manage all| BuildingsLodgments
    Root -->|manage all| Renewals
    Root -->|manage all| Maintenances
    HA -->|manage| BuildingsLodgments
    Renewal -->|process| Renewals
    Maintenance -->|process| Maintenances
    Resident -->|submit & view own| OwnData
```

---

## 4. Housing Application Workflow

A **HousingApplication** is submitted by an anonymous visitor via `/join-community`.
On validation an admin assigns a lodgment and the system creates `User + UserIdentity + Resident` records.

```mermaid
flowchart TD
    A([Anonymous Visitor]) -->|opens /join-community| B{Active application\nsession exists?}
    B -- No --> CLOSED[Show 'Applications closed' message]
    B -- Yes --> C[Fill out 4-step form\nname, faculty, documents, preview]

    C --> D[Upload 3 documents to S3\nvia presigned PUT URLs\nphoto, NIC, school certificate]
    D --> E[POST /api/housing-applications\nstatus = pending]
    E --> F[Brevo: notify applicant by email]

    F --> G([housing_application admin\nreviews in dashboard])
    G --> H{Decision}

    H -->|Refuse| I[PUT /api/housing-applications/:id\nstatus = refused\nrefusalReason required]
    I --> J[Brevo: notify applicant of refusal]

    H -->|Accept| K[PUT /api/housing-applications/:id\nstatus = accepted]
    K --> L[PUT /api/housing-applications/:id\nstatus = validated\nlodgmentId required]
    L --> M[Create User + UserIdentity + Resident\nGenerate temp password\nhash with scrypt]
    M --> N[Brevo: send welcome email\nwith temporary password]
    N --> O([Applicant becomes Resident])
```

### Status State Machine

```mermaid
stateDiagram-v2
    [*] --> pending : POST /api/housing-applications (anonymous)
    pending --> accepted : housing_application admin approves
    pending --> refused : housing_application admin refuses
    accepted --> validated : Admin validates → lodgment assigned → Resident account created
    accepted --> refused : Admin changes decision
    refused --> [*]
    validated --> [*]
```

### Refusal Reasons

```mermaid
graph LR
    refused --> R1[capacity_limit_reached]
    refused --> R2[incomplete_documents]
    refused --> R3[falsified_documents]
    refused --> R4[past_behavior]
    refused --> R5[ineligibility]
    refused --> R6[other]
```

---

## 5. Renewal Workflow

A **Renewal** is submitted annually by an authenticated `Resident` to keep their housing for the next session.

```mermaid
flowchart TD
    A([Authenticated Resident]) -->|opens /resident/renewals/create| B[Fill out form\nphone, emergency number, 3 documents]

    B --> C[Upload 3 documents to S3\nvia presigned PUT URLs\nphoto, NIC, school certificate]
    C --> D[POST /api/renewals\nacademicSessionId from resident profile]

    D --> E{Renewal window open?\nchecked in ability layer}
    E -- No --> ERR1[403 Forbidden]
    E -- Yes --> F[Create Renewal\nstatus = pending]

    F --> G([renewal admin\nreviews in dashboard])
    G --> H{Decision}

    H -->|Refuse| I[PUT /api/renewals/:id\nstatus = refused\nrefusalReason required]
    H -->|Accept| J[PUT /api/renewals/:id\nstatus = accepted]
    J --> K[PUT /api/renewals/:id\nstatus = validated]
    K --> L([Resident confirmed for next session])
```

### Status State Machine

```mermaid
stateDiagram-v2
    [*] --> pending : POST /api/renewals (authenticated resident)
    pending --> accepted : renewal admin approves
    pending --> refused : renewal admin refuses
    accepted --> validated : renewal admin confirms
    accepted --> refused : Admin changes decision
    refused --> [*]
    validated --> [*]
```

---

## 6. Maintenance Workflow

A **Maintenance** is a repair request submitted by an authenticated `Resident`. The lodgment is auto-resolved from `resident.lodgmentId` — not passed in the request body.

```mermaid
flowchart TD
    A([Authenticated Resident]) -->|opens /resident/maintenances/create| B[Fill out form\ntype, description]
    B --> C[POST /api/maintenances\ntype, description]
    C --> D[Auto-resolve lodgment\nfrom resident.lodgmentId]
    D --> E{Lodgment found?}
    E -- No --> ERR[404 Not Found]
    E -- Yes --> F[Create Maintenance\nstatus = pending\nlodgmentId resolved]

    F --> G([maintenance admin\nreviews in dashboard])
    G --> H{Decision}

    H -->|Refuse| I[PUT /api/maintenances/:id\nstatus = refused]
    H -->|Accept| J[PUT /api/maintenances/:id\nstatus = accepted]
    J --> K[Assign maintainer(s)\nPOST /api/maintenances/:id/maintainers]
    K --> L([External maintainer performs work])
    L --> M[PUT /api/maintenances/:id\nstatus = done]
```

### Status State Machine

```mermaid
stateDiagram-v2
    [*] --> pending : POST /api/maintenances (authenticated resident)
    pending --> accepted : maintenance admin accepts
    pending --> refused : maintenance admin refuses
    accepted --> done : Admin marks complete
    refused --> [*]
    done --> [*]
```

### Maintenance Types

```mermaid
graph LR
    Maintenance --> T1[electrical]
    Maintenance --> T2[plumbing]
    Maintenance --> T3[equipment]
    Maintenance --> T4["hvac\n(Heating, Ventilation, Air Conditioning)"]
    Maintenance --> T5[other]
```

---

## 7. API Endpoints Overview

```mermaid
graph TD
    subgraph Public["Public (no auth)"]
        P1[POST /api/auth/login]
        P2[POST /api/auth/logout]
        P3[GET /api/announcements]
        P4[GET /api/announcements/:id]
        P5[POST /api/housing-applications]
        P6[GET /api/academic-sessions/active-application]
    end

    subgraph Resident["Resident session required"]
        S1[POST /api/renewals]
        S2[GET /api/renewals/:id]
        S3[POST /api/maintenances]
        S4[GET /api/maintenances/:id]
        S5[Storage presign endpoints]
    end

    subgraph HA["housing_application admin"]
        HA1[GET/POST /api/buildings]
        HA2[GET/PUT/DELETE /api/buildings/:id]
        HA3[GET/POST /api/lodgments]
        HA4[GET/PUT/DELETE /api/lodgments/:id]
        HA5[GET /api/housing-applications]
        HA6[GET /api/housing-applications/:id]
        HA7[PUT /api/housing-applications/:id]
    end

    subgraph RN["renewal admin"]
        RN1[GET /api/renewals]
        RN2[PUT /api/renewals/:id]
    end

    subgraph MA["maintenance admin"]
        MA1[GET /api/maintenances]
        MA2[PUT /api/maintenances/:id]
        MA3[GET/POST /api/maintainers]
        MA4[GET/PUT/DELETE /api/maintainers/:id]
        MA5[POST /api/maintenances/:id/maintainers]
        MA6[DELETE /api/maintenances/:id/maintainers/:maintainerId]
    end

    subgraph Root["root admin"]
        RO1[GET /api/admins]
        RO2[GET /api/admins/:id]
        RO3[GET/POST /api/faculties]
        RO4[GET/PUT/DELETE /api/faculties/:id]
        RO5[GET/POST /api/academic-sessions]
        RO6[GET/PUT/DELETE /api/academic-sessions/:id]
        RO7[GET /api/residents]
        RO8[GET /api/residents/:id]
        RO9[GET/POST/PUT/DELETE /api/announcements]
    end
```
