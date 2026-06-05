<template>
  <Badge :class="colorClass">
    {{ label }}
  </Badge>
</template>

<script lang="ts" setup>
import type { RenewalStatus } from '#imports';

import { RenewalStatusColor } from '#imports';

import Badge from '~/components/ui/badge/Badge.vue';

interface Props {
  value: RenewalStatus;
}

const props = defineProps<Props>();

const { t } = useI18n();

const colorClass = computed(() => RenewalStatusColor[props.value]);

const label = computed(() => t(`common.statuses.renewal.${props.value}`));
</script>
