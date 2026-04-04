<template>
  <Badge :class="colorClass">
    {{ label }}
  </Badge>
</template>

<script lang="ts" setup>
import Badge from '~/components/ui/badge/Badge.vue';

import {
  type HousingApplicationStatus,
  HousingApplicationStatusColor,
  HousingApplicationStatusLabel,
} from './housing-application.model';

interface Props {
  value: HousingApplicationStatus;
}

const props = defineProps<Props>();

const colorClass = computed(() => {
  return HousingApplicationStatusColor[props.value];
});

const label = computed(() => {
  return HousingApplicationStatusLabel[props.value];
});
</script>

<style></style>
