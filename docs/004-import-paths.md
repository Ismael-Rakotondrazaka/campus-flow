# Import Path Standard

Import conventions for the entire codebase.

---

## TL;DR

| What you want to import            | Alias to use  | Example                                      |
| ---------------------------------- | ------------- | -------------------------------------------- |
| Anything inside `app/`             | `~/`          | `~/features/users/user.model`                |
| Anything inside `shared/`          | `#shared/`    | `#shared/requests/request`                   |
| Anything inside `server/`          | `#server/`    | `#server/utils/s3`                           |
| Nuxt / module internals            | `#`           | `#auth-utils` · `#app` · `#imports`          |
| npm packages                       | bare specifier| `vue` · `@pinia/colada` · `zod`              |

---

## Canonical Aliases

### `~/` — app directory

Use for all imports whose source lives under `app/`.

```ts
// ✅ correct
import { useAuth } from '~/composables/useAuth'
import type { Resident } from '~/features/residents/resident.model'
import ResidentCard from '~/features/residents/components/ResidentCard.vue'
```

> **Why `~/` over `@/`?**
> Both resolve to the same `app/` directory, but `~/` is the Nuxt-native
> convention and is visually unambiguous: `@` is already used for npm org
> scopes (`@nuxt/`, `@pinia/`, `@vueuse/`), so a reader skimming an import
> block cannot instantly tell whether `@/foo` is local code or a package.
> `~/` carries no such ambiguity.

**`@/` is banned** for user-written imports. The only allowed use of `@/` is
inside tool/plugin configuration files (e.g. the `shadcn.componentDir` field
in `nuxt.config.ts`).

---

### `#shared/` — shared directory

Use for anything that lives under `shared/` and needs to be consumed from both
`app/` and `server/`.

```ts
// ✅ correct — from app code
import type { Request } from '#shared/requests/request'
import type { ResponseError } from '#shared/responses/response'

// ✅ correct — from server code
import type { User } from '#shared/types/user'
```

---

### `#server/` — server directory

Use for cross-feature imports within `server/` (e.g. a handler importing a
shared utility). Do **not** use `#server/` from `app/` code — the browser
bundle must never contain server code.

```ts
// ✅ correct — inside server/
import { generateStorageKey } from '#server/core'
import { createS3UploadUrl } from '#server/utils/s3'
```

---

### `#` — Nuxt / module internals

This prefix is **reserved** for Nuxt-generated or module-generated virtual
modules. Never invent `#` aliases for your own code (except `#shared/` and
`#server/` which are established project aliases).

```ts
// ✅ correct — framework-provided
import type { User } from '#auth-utils'
import { defineNuxtPlugin } from '#app'
```

---

### Bare specifiers — npm packages

External packages always use their exact package name. No aliasing.

```ts
// ✅ correct
import { ref, computed } from 'vue'
import { useQuery } from '@pinia/colada'
import { z } from 'zod'
import type { H3Event } from 'h3'
```

---

## Rules

1. **One alias per destination.** Never mix `~/` and `@/` for the same import
   target, even across different files in the same feature.

2. **No `@@/` or `~~/`.** These root-level aliases are configured but must not
   be used. Use `#shared/` or `#server/` depending on the destination.

3. **No relative paths for cross-feature imports.** Relative paths (`../`, `./`)
   are allowed only within the same feature folder. For anything that crosses
   a feature boundary, use the canonical alias.

   ```ts
   // ✅ within the same feature — relative path is fine
   import { residentSchema } from './resident.schema'

   // ✅ cross-feature — use alias
   import type { Building } from '~/features/buildings/building.model'

   // ❌ cross-feature with relative path — do not do this
   import type { Building } from '../../buildings/building.model'
   ```

4. **No `index` in import paths.** Omit the `/index` segment; module resolution
   handles it.

   ```ts
   // ✅
   import { something } from '~/features/buildings'

   // ❌
   import { something } from '~/features/buildings/index'
   ```

5. **No file extensions** (except in `.vue` component imports where Nuxt/Vite
   requires them for auto-import disambiguation).

   ```ts
   // ✅
   import { buildingService } from '~/features/buildings/building.service'
   import BuildingCard from '~/features/buildings/components/BuildingCard.vue'

   // ❌
   import { buildingService } from '~/features/buildings/building.service.ts'
   ```

---

## Quick Reference by File Location

| File lives in   | Import from `app/` | Import from `shared/` | Import from `server/` |
| --------------- | ------------------ | --------------------- | --------------------- |
| `app/**`        | `~/`               | `#shared/`            | ❌ not allowed        |
| `server/**`     | ❌ not allowed     | `#shared/`            | `#server/`            |
| `shared/**`     | ❌ not allowed     | relative (`./`)       | ❌ not allowed        |
