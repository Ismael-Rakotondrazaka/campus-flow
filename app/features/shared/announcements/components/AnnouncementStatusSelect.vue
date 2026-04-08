<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  type AnnouncementStatus,
  AnnouncementStatuses,
  AnnouncementStatusLabel,
} from '../announcement.model';

const value = defineModel<'all' | AnnouncementStatus>({
  default: 'all',
  required: false,
});
</script>

<template>
  <Select v-model="value">
    <SelectTrigger class="w-[200px]">
      <SelectValue placeholder="Statut" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="all">Tous les statuts</SelectItem>
        <SelectItem
          v-for="status in AnnouncementStatuses"
          :key="status"
          :value="status"
        >
          {{ AnnouncementStatusLabel[status] }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
