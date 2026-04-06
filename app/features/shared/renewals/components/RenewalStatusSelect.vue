<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { RenewalStatus } from '../renewal.model';

import {
  RenewalStatuses,
  RenewalStatusLabel,
} from '../renewal.model';

const value = defineModel<'all' | RenewalStatus>('all', {
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
          v-for="status in RenewalStatuses"
          :key="status"
          :value="status"
          >{{ RenewalStatusLabel[status] }}</SelectItem
        >
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
