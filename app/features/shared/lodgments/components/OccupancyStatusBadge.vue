<template>
  <Badge :class="colorClass">
    {{ label }}
  </Badge>
</template>

<script lang="ts" setup>
import Badge from '~/components/ui/badge/Badge.vue';
import {
  type LodgementOccupancyStatus,
  LodgementOccupancyStatusColor,
  LodgementOccupancyStatusLabel,
} from '~/features/shared/lodgments/lodgment.model';

interface Props {
  value: LodgementOccupancyStatus;
}

const props = defineProps<Props>();

const colorClass = computed(() => {
  return LodgementOccupancyStatusColor[props.value];
});

const label = computed(() => {
  return LodgementOccupancyStatusLabel[props.value];
});
</script>

<style></style>
