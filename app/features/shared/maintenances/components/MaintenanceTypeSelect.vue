<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { MaintenanceType } from '../maintenance.model';

import {
  MaintenanceTypes,
  MaintenanceTypeLabel,
} from '../maintenance.model';

const value = defineModel<'all' | MaintenanceType>('all', {
  default: 'all',
  required: false,
});
</script>

<template>
  <Select v-model="value">
    <SelectTrigger class="">
      <SelectValue placeholder="Type" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="all">Tous les types</SelectItem>
        <SelectItem
          v-for="type in MaintenanceTypes"
          :key="type"
          :value="type"
          >{{ MaintenanceTypeLabel[type] }}</SelectItem
        >
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
