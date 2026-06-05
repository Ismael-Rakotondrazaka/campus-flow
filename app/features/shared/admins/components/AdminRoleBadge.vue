<script lang="ts" setup>
import type { AdminRole } from '#imports';

import { AdminRoleColor } from '#imports';

import Badge from '~/components/ui/badge/Badge.vue';

interface Props {
  value: AdminRole;
}

const props = defineProps<Props>();

const { t } = useI18n();

const colorClass = computed(() => AdminRoleColor[props.value]);
const label = computed(() => t(`admin.roles.${props.value}`));
</script>

<template>
  <Badge :class="colorClass">
    {{ label }}
  </Badge>
</template>
