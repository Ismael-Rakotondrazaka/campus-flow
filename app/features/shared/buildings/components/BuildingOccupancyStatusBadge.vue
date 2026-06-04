<template>
  <Badge :class="colorClass">
    {{ label }}
  </Badge>
</template>

<script lang="ts" setup>
import {
  type BuildingOccupancyStatus,
  BuildingOccupancyStatusColor,
} from '#imports';

import Badge from '~/components/ui/badge/Badge.vue';

interface Props {
  value: BuildingOccupancyStatus;
}

const props = defineProps<Props>();

const { t } = useI18n();

const colorClass = computed(() => BuildingOccupancyStatusColor[props.value]);

const label = computed(() => t(`common.statuses.occupancy.${props.value}`));
</script>
