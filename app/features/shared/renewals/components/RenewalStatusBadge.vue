<template>
  <Badge :class="colorClass">
    {{ label }}
  </Badge>
</template>

<script lang="ts" setup>
import Badge from '~/components/ui/badge/Badge.vue';

import type { RenewalStatus } from '../renewal.model';

import { RenewalStatusColor, RenewalStatusLabel } from '../renewal.model';

interface Props {
  value: RenewalStatus;
}

const props = defineProps<Props>();

const colorClass = computed(() => {
  return RenewalStatusColor[props.value];
});

const label = computed(() => {
  return RenewalStatusLabel[props.value];
});
</script>

<style></style>
