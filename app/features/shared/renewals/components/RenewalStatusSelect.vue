<script setup lang="ts">
import type { RenewalStatus } from '#imports';

import { RenewalStatuses } from '#imports';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

const value = defineModel<'all' | RenewalStatus>('all', {
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
          v-for="status in RenewalStatuses"
          :key="status"
          :value="status"
        >
          {{ $t(`common.statuses.renewal.${status}`) }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
