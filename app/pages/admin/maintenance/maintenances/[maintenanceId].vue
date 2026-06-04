<script setup lang="ts">
import type { Maintenance } from '#imports';

import { useQuery } from '@pinia/colada';

import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import MaintenanceInfoCard from '~/features/admin/maintenances/MaintenanceInfoCard.vue';
import MaintenanceLocationCard from '~/features/admin/maintenances/MaintenanceLocationCard.vue';
import MaintenanceMaintainersCard from '~/features/admin/maintenances/MaintenanceMaintainersCard.vue';
import MaintenanceResidentCard from '~/features/admin/maintenances/MaintenanceResidentCard.vue';
import { maintenanceByIdQuery } from '~/features/shared/maintenances/maintenance.query';

const route = useRoute();
const maintenanceId = computed(() => route.params.maintenanceId as string);

const { state } = useQuery(() =>
  maintenanceByIdQuery({ id: maintenanceId.value })
);

const maintenance = computed<null | Serialize<Maintenance>>(
  () => state.value?.data ?? null
);
</script>

<template>
  <div class="container mx-auto p-2">
    <div class="mb-4">
      <Button as-child size="sm" variant="outline">
        <NuxtLinkLocale :to="{ name: 'admin-maintenance-maintenances' }">
          <Icon name="mdi:arrow-left" />
          {{ $t('admin.maintenances.backToList') }}
        </NuxtLinkLocale>
      </Button>
    </div>

    <template v-if="state.status === 'pending'">
      <Skeleton class="mb-4 h-8 w-64" />
      <div class="grid gap-4 lg:grid-cols-3">
        <div class="space-y-4 lg:col-span-2">
          <Skeleton class="h-64 w-full rounded-xl" />
          <Skeleton class="h-40 w-full rounded-xl" />
        </div>
        <div class="space-y-4">
          <Skeleton class="h-32 w-full rounded-xl" />
          <Skeleton class="h-32 w-full rounded-xl" />
        </div>
      </div>
    </template>

    <template v-else-if="maintenance">
      <h1 class="mb-4 text-2xl font-bold">
        {{
          $t('admin.maintenances.detailTitleWithLocation', {
            building: maintenance.lodgment.building.name,
            room: maintenance.lodgment.roomNumber,
          })
        }}
      </h1>

      <div class="grid gap-4 lg:grid-cols-3">
        <div class="space-y-4 lg:col-span-2">
          <MaintenanceInfoCard :maintenance="maintenance" />
          <MaintenanceMaintainersCard :maintenance="maintenance" />
        </div>

        <div class="space-y-4">
          <MaintenanceLocationCard :maintenance="maintenance" />
          <MaintenanceResidentCard :maintenance="maintenance" />
        </div>
      </div>
    </template>

    <template v-else>
      <p class="text-muted-foreground mb-4">
        Cette maintenance est introuvable ou a été supprimée.
      </p>
      <Button as-child variant="outline">
        <NuxtLinkLocale :to="{ name: 'admin-maintenance-maintenances' }">
          {{ $t('admin.maintenances.backToList') }}
        </NuxtLinkLocale>
      </Button>
    </template>
  </div>
</template>
