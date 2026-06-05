<script setup lang="ts">
import type { Maintenance } from '#imports';

import { useQuery } from '@pinia/colada';

import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import MaintenanceStatusBadge from '~/features/shared/maintenances/components/MaintenanceStatusBadge.vue';
import MaintenanceTypeBadge from '~/features/shared/maintenances/components/MaintenanceTypeBadge.vue';
import { maintenanceListQuery } from '~/features/shared/maintenances/maintenance.query';

const { user: authUser } = useUserSession();
const { locale, t } = useI18n();

const residentId = computed(() => authUser.value!.id);

const dateLocale = computed(() => (locale.value === 'fr' ? 'fr-FR' : 'en-US'));

const { state } = useQuery(() =>
  maintenanceListQuery({
    orderBy: MaintenanceOrderBy.createdAt,
    residentId: residentId.value,
    sortOrder: SortOrder.desc,
  })
);

const maintenances = computed<Serialize<Maintenance>[]>(
  () => state.value?.data?.data ?? []
);

const getOrdinalFloor = (floor: number) => {
  if (floor === 0) return t('resident.maintenances.floor.ground');
  if (floor < 0) {
    return t('resident.maintenances.floor.basementNumber', {
      n: Math.abs(floor),
    });
  }
  if (floor === 1) return t('resident.maintenances.floor.first');
  return t('resident.maintenances.floor.ordinal', { n: floor });
};

const formatLocation = (maintenance: Serialize<Maintenance>) =>
  t('resident.maintenances.locationLine', {
    building: maintenance.lodgment.building.name,
    floor: getOrdinalFloor(maintenance.lodgment.floor),
    room: maintenance.lodgment.roomNumber,
  });

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString(dateLocale.value, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
</script>

<template>
  <div class="w-full">
    <div class="mb-4 flex items-center justify-end">
      <Button as-child size="sm">
        <NuxtLinkLocale :to="{ name: 'resident-maintenances-create' }">
          <Icon name="mdi:plus" />
          {{ t('resident.maintenances.reportCta') }}
        </NuxtLinkLocale>
      </Button>
    </div>

    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{{ t('common.cards.type') }}</TableHead>
            <TableHead>{{ t('common.cards.location') }}</TableHead>
            <TableHead>{{ t('common.cards.status') }}</TableHead>
            <TableHead>{{ t('common.cards.reportedAt') }}</TableHead>
            <TableHead>{{ t('common.tables.action') }}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <template v-if="state.status === 'pending'">
            <TableRow v-for="i in 4" :key="`skeleton-${i}`">
              <TableCell>
                <Skeleton class="h-5 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-40" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-5 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-28" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-7" />
              </TableCell>
            </TableRow>
          </template>

          <template v-else-if="maintenances.length">
            <TableRow v-for="maintenance in maintenances" :key="maintenance.id">
              <TableCell>
                <MaintenanceTypeBadge :value="maintenance.type" />
              </TableCell>
              <TableCell class="text-sm">
                {{ formatLocation(maintenance) }}
              </TableCell>
              <TableCell>
                <MaintenanceStatusBadge :value="maintenance.status" />
              </TableCell>
              <TableCell class="text-sm">
                {{ formatDate(maintenance.createdAt) }}
              </TableCell>
              <TableCell>
                <NuxtLinkLocale
                  class="inline-flex items-center justify-center hover:text-blue-600"
                  :title="t('common.buttons.viewDetails')"
                  :to="{
                    name: 'resident-maintenances-maintenanceId',
                    params: { maintenanceId: maintenance.id },
                  }"
                >
                  <Icon name="mdi:eye" size="1.2rem" />
                </NuxtLinkLocale>
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell class="h-24 text-center" :colspan="5">
              {{ t('resident.maintenances.listEmptyShort') }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
