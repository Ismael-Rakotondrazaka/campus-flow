<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { HousingApplicationStatus } from '../housing-application.model';

import {
  HousingApplicationStatuses,
  HousingApplicationStatusLabel,
} from '../housing-application.model';

const value = defineModel<'all' | HousingApplicationStatus>('all', {
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
          v-for="status in HousingApplicationStatuses"
          :key="status"
          :value="status"
          >{{ HousingApplicationStatusLabel[status] }}</SelectItem
        >
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
