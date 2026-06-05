<script setup lang="ts">
import type { Building } from '#imports';

import { getBuildingOccupancyStatus } from '#imports';

import { Card, CardContent } from '~/components/ui/card';
import BuildingOccupancyStatusBadge from '~/features/shared/buildings/components/BuildingOccupancyStatusBadge.vue';

interface Props {
  building: Serialize<Building>;
}

const props = defineProps<Props>();

const occupancyStatus = computed(() =>
  getBuildingOccupancyStatus(
    props.building.residentsCount,
    props.building.totalCapacity
  )
);
</script>

<template>
  <Card class="flex overflow-hidden">
    <CardContent class="relative flex flex-1 flex-row gap-2">
      <!-- Left side: Info -->
      <div class="flex w-full flex-col justify-between">
        <h3 class="text-foreground text-lg font-bold">
          {{
            $t('admin.buildings.buildingTitle', { name: props.building.name })
          }}
        </h3>

        <div class="flex flex-col gap-2">
          <div class="flex flex-col">
            <p class="text-lg font-bold text-gray-900">
              {{ props.building.lodgmentsCount }}
            </p>
            <p class="text-xs text-gray-600">
              {{ $t('admin.buildings.lodgments') }}
            </p>
          </div>
          <div class="flex flex-col">
            <p class="text-lg font-bold text-gray-900">
              {{ props.building.floors }}
            </p>
            <p class="text-xs text-gray-600">
              {{ $t('admin.buildings.floors') }}
            </p>
          </div>
          <div class="flex flex-col">
            <p class="text-lg font-bold text-gray-900">
              {{ props.building.residentsCount }}/{{
                props.building.totalCapacity
              }}
            </p>
            <p class="text-xs text-gray-600">
              {{ $t('common.cards.capacity') }}
            </p>
          </div>
        </div>
      </div>

      <BuildingOccupancyStatusBadge
        :value="occupancyStatus"
        class="absolute top-2 right-6"
      />

      <!-- Right side: Image -->
      <div
        v-if="props.building.illustrationUrl"
        class="shrink-0 overflow-hidden"
      >
        <img
          :src="props.building.illustrationUrl"
          :alt="
            $t('admin.buildings.buildingTitle', { name: props.building.name })
          "
          class="h-48 w-36 rounded-md object-cover"
        />
      </div>
    </CardContent>
  </Card>
</template>
