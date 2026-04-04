<script setup lang="ts">
import type { NuxtLinkProps } from '#app';

import { AdminRole } from '~/features/shared/admins/admin.model';

const user = useSupabaseUser();

const role = computed<'student' | AdminRole | undefined>(
  () => user.value?.app_metadata?.role
);

const roleRouteMap: Record<'student' | AdminRole, NuxtLinkProps['to']> = {
  [AdminRole.housing_application]: {
    name: 'admin-housing-application-dashboard',
  },
  [AdminRole.maintenance]: { name: 'admin-maintenance-dashboard' },
  [AdminRole.renewal]: { name: 'admin-renewal-dashboard' },
  [AdminRole.root]: { name: 'admin-root-dashboard' },
  student: { name: 'resident-dashboard' },
};

const route = computed(() =>
  role.value ? roleRouteMap[role.value] : undefined
);
</script>

<template>
  <header class="border-b p-2">
    <nav
      class="container mx-auto flex w-full items-center justify-between gap-4"
    >
      <div class="flex items-center">
        <NuxtLink :to="{ name: 'index' }" as-child>
          <Button variant="ghost">
            <span
              class="text-primary sr-only text-base font-bold md:not-sr-only"
              >Lumièrebourg</span
            >
          </Button>
        </NuxtLink>
      </div>

      <div class="flex items-center gap-2">
        <NuxtLink v-if="route" :to="route">
          <Button variant="default" class="rounded-full">
            <span class="">Dashboard</span>
            <Icon name="mdi:arrow-right" />
          </Button>
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>
