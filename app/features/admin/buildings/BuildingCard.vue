<script setup lang="ts">
import type { Building } from '~/features/shared/buildings/building.model';

import { Card, CardContent } from '~/components/ui/card';
import { getBuildingOccupancyStatus } from '~/features/shared/buildings/building.model';
import BuildingOccupancyStatusBadge from '~/features/shared/buildings/components/BuildingOccupancyStatusBadge.vue';

const props = defineProps<{
  building: Building;
}>();

const occupancyStatus = computed(() =>
  getBuildingOccupancyStatus(
    props.building.residents_count,
    props.building.total_capacity
  )
);
</script>

<template>
  <Card class="flex overflow-hidden">
    <CardContent class="relative flex flex-1 flex-row gap-2">
      <!-- Left side: Info -->
      <div class="flex w-full flex-col justify-between">
        <h3 class="text-foreground text-lg font-bold">
          Bâtiment {{ props.building.name }}
        </h3>

        <div class="flex flex-col gap-2">
          <div class="flex flex-col">
            <p class="text-lg font-bold text-gray-900">
              {{ props.building.lodgments_count }}
            </p>
            <p class="text-xs text-gray-600">Logements</p>
          </div>
          <div class="flex flex-col">
            <p class="text-lg font-bold text-gray-900">
              {{ props.building.floors }}
            </p>
            <p class="text-xs text-gray-600">Étages</p>
          </div>
          <div class="flex flex-col">
            <p class="text-lg font-bold text-gray-900">
              {{ props.building.residents_count }}/{{
                props.building.total_capacity
              }}
            </p>
            <p class="text-xs text-gray-600">Capacité</p>
          </div>
        </div>
      </div>

      <BuildingOccupancyStatusBadge
        :value="occupancyStatus"
        class="absolute top-2 right-6"
      />

      <!-- Right side: Image -->
      <div
        v-if="props.building.illustration_url"
        class="shrink-0 overflow-hidden"
      >
        <img
          :src="props.building.illustration_url"
          :alt="`Bâtiment ${props.building.name}`"
          class="h-48 w-36 rounded-md object-cover"
        />
      </div>
    </CardContent>
  </Card>
</template>
