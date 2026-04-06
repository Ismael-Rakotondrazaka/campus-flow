<template>
  <Badge :class="colorClass">
    {{ label }}
  </Badge>
</template>

<script lang="ts" setup>
import Badge from '~/components/ui/badge/Badge.vue';

import type { MaintenanceStatus } from '../maintenance.model';

import {
  MaintenanceStatusColor,
  MaintenanceStatusLabel,
} from '../maintenance.model';

interface Props {
  value: MaintenanceStatus;
}

const props = defineProps<Props>();

const colorClass = computed(() => {
  return MaintenanceStatusColor[props.value];
});

const label = computed(() => {
  return MaintenanceStatusLabel[props.value];
});
</script>

<style></style>
