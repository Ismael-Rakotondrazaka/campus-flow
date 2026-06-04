<script setup lang="ts">
import type { HousingApplicationStatus } from '#imports';

import { HousingApplicationStatuses } from '#imports';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

const value = defineModel<'all' | HousingApplicationStatus>('all', {
  default: 'all',
  required: false,
});
</script>

<template>
  <Select v-model="value">
    <SelectTrigger class="">
      <SelectValue :placeholder="$t('common.selects.status')" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="all">
          {{ $t('common.selects.allStatuses') }}
        </SelectItem>
        <SelectItem
          v-for="status in HousingApplicationStatuses"
          :key="status"
          :value="status"
        >
          {{ $t(`common.statuses.housingApplication.${status}`) }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
