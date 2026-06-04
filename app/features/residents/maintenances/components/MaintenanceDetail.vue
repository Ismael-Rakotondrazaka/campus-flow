<script setup lang="ts">
import type { Maintenance } from '#imports';

import { useQuery } from '@pinia/colada';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import MaintenanceStatusBadge from '~/features/shared/maintenances/components/MaintenanceStatusBadge.vue';
import MaintenanceTypeBadge from '~/features/shared/maintenances/components/MaintenanceTypeBadge.vue';
import { maintenanceByIdQuery } from '~/features/shared/maintenances/maintenance.query';

interface Props {
  maintenanceId: string;
}

const props = defineProps<Props>();

const { locale, t } = useI18n();

const dateLocale = computed(() => (locale.value === 'fr' ? 'fr-FR' : 'en-US'));

const { state } = useQuery(() =>
  maintenanceByIdQuery({ id: props.maintenanceId })
);

const maintenance = computed<null | Serialize<Maintenance>>(
  () => state.value?.data ?? null
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

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString(dateLocale.value, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
</script>

<template>
  <div>
    <div class="mb-4">
      <Button as-child size="sm" variant="outline">
        <NuxtLinkLocale :to="{ name: 'resident-maintenances' }">
          <Icon name="mdi:arrow-left" />
          {{ t('resident.maintenances.backToList') }}
        </NuxtLinkLocale>
      </Button>
    </div>

    <template v-if="state.status === 'pending'">
      <Skeleton class="mb-4 h-8 w-64" />
      <div class="grid gap-4 md:grid-cols-2">
        <Skeleton class="h-56 w-full rounded-xl" />
        <Skeleton class="h-40 w-full rounded-xl" />
      </div>
    </template>

    <template v-else-if="maintenance">
      <h1 class="mb-4 text-2xl font-bold">
        {{
          t('resident.maintenances.detailTitleWithLocation', {
            building: maintenance.lodgment.building.name,
            room: maintenance.lodgment.roomNumber,
          })
        }}
      </h1>

      <div class="grid gap-4 md:grid-cols-2">
        <!-- Info card -->
        <Card>
          <CardHeader>
            <CardTitle>{{ t('common.cards.information') }}</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="grid gap-y-3 text-sm sm:grid-cols-2">
              <div>
                <p class="text-muted-foreground">
                  {{ t('common.cards.type') }}
                </p>
                <MaintenanceTypeBadge :value="maintenance.type" />
              </div>
              <div>
                <p class="text-muted-foreground">
                  {{ t('common.cards.status') }}
                </p>
                <MaintenanceStatusBadge :value="maintenance.status" />
              </div>
              <div>
                <p class="text-muted-foreground">
                  {{ t('common.cards.reportedAt') }}
                </p>
                <p class="font-medium">
                  {{ formatDate(maintenance.createdAt) }}
                </p>
              </div>
              <div v-if="maintenance.startAt">
                <p class="text-muted-foreground">
                  {{ t('common.cards.workStart') }}
                </p>
                <p class="font-medium">
                  {{ formatDate(maintenance.startAt) }}
                </p>
              </div>
              <div v-if="maintenance.endAt">
                <p class="text-muted-foreground">
                  {{ t('common.cards.workEnd') }}
                </p>
                <p class="font-medium">
                  {{ formatDate(maintenance.endAt) }}
                </p>
              </div>
            </div>

            <div v-if="maintenance.description">
              <p class="text-muted-foreground mb-1 text-sm">
                {{ t('common.cards.description') }}
              </p>
              <p class="text-sm">{{ maintenance.description }}</p>
            </div>
          </CardContent>
        </Card>

        <!-- Location card -->
        <Card>
          <CardHeader>
            <CardTitle>{{ t('common.cards.location') }}</CardTitle>
          </CardHeader>
          <CardContent class="grid gap-y-3 text-sm sm:grid-cols-2">
            <div>
              <p class="text-muted-foreground">
                {{ t('common.cards.building') }}
              </p>
              <p class="font-medium">
                {{ maintenance.lodgment.building.name }}
              </p>
            </div>
            <div>
              <p class="text-muted-foreground">
                {{ t('common.cards.floor') }}
              </p>
              <p class="font-medium">
                {{ getOrdinalFloor(maintenance.lodgment.floor) }}
              </p>
            </div>
            <div>
              <p class="text-muted-foreground">
                {{ t('resident.maintenances.door') }}
              </p>
              <p class="font-medium">
                {{
                  t('resident.maintenances.roomNumber', {
                    room: maintenance.lodgment.roomNumber,
                  })
                }}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>

    <template v-else>
      <p class="text-muted-foreground mb-4">
        {{ t('common.notFound.maintenance') }}
      </p>
      <Button as-child variant="outline">
        <NuxtLinkLocale :to="{ name: 'resident-maintenances' }">
          {{ t('resident.maintenances.backToList') }}
        </NuxtLinkLocale>
      </Button>
    </template>
  </div>
</template>
