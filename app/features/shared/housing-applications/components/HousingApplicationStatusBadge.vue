<template>
  <Badge :class="colorClass">
    {{ label }}
  </Badge>
</template>

<script lang="ts" setup>
import {
  type HousingApplicationStatus,
  HousingApplicationStatusColor,
} from '#imports';

import Badge from '~/components/ui/badge/Badge.vue';

interface Props {
  value: HousingApplicationStatus;
}

const props = defineProps<Props>();

const { t } = useI18n();

const colorClass = computed(() => HousingApplicationStatusColor[props.value]);

const label = computed(() =>
  t(`common.statuses.housingApplication.${props.value}`)
);
</script>
