<template>
  <Badge :class="colorClass">
    {{ label }}
  </Badge>
</template>

<script lang="ts" setup>
import Badge from '~/components/ui/badge/Badge.vue';
import {
  type AnnouncementStatus,
  AnnouncementStatusColor,
  AnnouncementStatusLabel,
} from '~/features/shared/announcements/announcement.model';

interface Props {
  value: AnnouncementStatus;
}

const props = defineProps<Props>();

const colorClass = computed(() => {
  return AnnouncementStatusColor[props.value];
});

const label = computed(() => {
  return AnnouncementStatusLabel[props.value];
});
</script>

<style></style>
