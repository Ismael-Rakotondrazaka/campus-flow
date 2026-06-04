<template>
  <Badge :class="colorClass">
    {{ label }}
  </Badge>
</template>

<script lang="ts" setup>
import type { MaintenanceStatus } from '#imports';

import { MaintenanceStatusColor } from '#imports';

import Badge from '~/components/ui/badge/Badge.vue';

interface Props {
  value: MaintenanceStatus;
}

const props = defineProps<Props>();

const { t } = useI18n();

const colorClass = computed(() => MaintenanceStatusColor[props.value]);

const label = computed(() => t(`common.statuses.maintenance.${props.value}`));
</script>
