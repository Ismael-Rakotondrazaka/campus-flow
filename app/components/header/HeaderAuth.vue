<script setup lang="ts">
import type { RouteLocationNamedI18n } from 'vue-router';

import { AdminRole } from '#imports';

const { user } = useUserSession();

const role = computed<'resident' | AdminRole | undefined>(
  () => user.value?.role
);

const roleRouteMap: Record<'resident' | AdminRole, RouteLocationNamedI18n> = {
  [AdminRole.housing_application]: {
    name: 'admin-housing-application-dashboard',
  },
  [AdminRole.maintenance]: { name: 'admin-maintenance-dashboard' },
  [AdminRole.renewal]: { name: 'admin-renewal-dashboard' },
  [AdminRole.root]: { name: 'admin-root-dashboard' },
  resident: { name: 'resident-dashboard' },
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
        <NuxtLinkLocale :to="{ name: 'index' }" as-child>
          <Button variant="ghost">
            <span
              class="text-primary sr-only text-base font-bold md:not-sr-only"
              >{{ $t('header.brand.name') }}</span
            >
          </Button>
        </NuxtLinkLocale>
      </div>

      <div class="flex items-center gap-2">
        <HeaderLocaleSwitcher />

        <NuxtLinkLocale v-if="route" :to="route">
          <Button variant="default" class="rounded-full">
            <span>{{ $t('header.end.dashboard') }}</span>
            <Icon name="mdi:arrow-right" />
          </Button>
        </NuxtLinkLocale>
      </div>
    </nav>
  </header>
</template>
