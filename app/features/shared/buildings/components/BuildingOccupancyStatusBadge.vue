<template>
  <Badge :class="colorClass">
    {{ label }}
  </Badge>
</template>

<script lang="ts" setup>
import Badge from '~/components/ui/badge/Badge.vue';
import {
  type BuildingOccupancyStatus,
  BuildingOccupancyStatusColor,
  BuildingOccupancyStatusLabel,
} from '~/features/shared/buildings/building.model';

interface Props {
  value: BuildingOccupancyStatus;
}

const props = defineProps<Props>();

const colorClass = computed(() => {
  return BuildingOccupancyStatusColor[props.value];
});

const label = computed(() => {
  return BuildingOccupancyStatusLabel[props.value];
});
</script>

<style></style>
