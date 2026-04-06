<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { MaintenanceStatus } from '../maintenance.model';

import {
  MaintenanceStatuses,
  MaintenanceStatusLabel,
} from '../maintenance.model';

const value = defineModel<'all' | MaintenanceStatus>('all', {
  default: 'all',
  required: false,
});
</script>

<template>
  <Select v-model="value">
    <SelectTrigger class="">
      <SelectValue placeholder="Status" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="all">Tous les status</SelectItem>
        <SelectItem
          v-for="status in MaintenanceStatuses"
          :key="status"
          :value="status"
          >{{ MaintenanceStatusLabel[status] }}</SelectItem
        >
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
