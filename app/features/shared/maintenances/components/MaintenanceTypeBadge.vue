<template>
  <Badge :class="colorClass">
    {{ label }}
  </Badge>
</template>

<script lang="ts" setup>
import type { MaintenanceType } from '#imports';

import Badge from '~/components/ui/badge/Badge.vue';

interface Props {
  value: MaintenanceType;
}

const props = defineProps<Props>();

const { t } = useI18n();

const colorClass = computed(() => {
  const colors: Record<MaintenanceType, string> = {
    electrical: 'bg-yellow-500 text-white',
    equipment: 'bg-purple-500 text-white',
    hvac: 'bg-cyan-500 text-white',
    other: 'bg-gray-500 text-white',
    plumbing: 'bg-blue-500 text-white',
  };
  return colors[props.value];
});

const label = computed(() =>
  t(`common.statuses.maintenanceType.${props.value}`)
);
</script>
