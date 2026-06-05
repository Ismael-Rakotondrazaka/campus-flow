<template>
  <Badge :class="colorClass">
    {{ label }}
  </Badge>
</template>

<script lang="ts" setup>
import {
  type LodgementOccupancyStatus,
  LodgementOccupancyStatusColor,
} from '#imports';

import Badge from '~/components/ui/badge/Badge.vue';

interface Props {
  value: LodgementOccupancyStatus;
}

const props = defineProps<Props>();

const { t } = useI18n();

const colorClass = computed(() => LodgementOccupancyStatusColor[props.value]);

const label = computed(() => t(`common.statuses.occupancy.${props.value}`));
</script>
