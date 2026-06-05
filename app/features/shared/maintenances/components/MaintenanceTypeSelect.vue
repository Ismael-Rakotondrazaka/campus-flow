<script setup lang="ts">
import type { MaintenanceType } from '#imports';

import { MaintenanceTypes } from '#imports';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

const value = defineModel<'all' | MaintenanceType>('all', {
  default: 'all',
  required: false,
});
</script>

<template>
  <Select v-model="value">
    <SelectTrigger class="">
      <SelectValue :placeholder="$t('common.selects.type')" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="all">
          {{ $t('common.selects.allTypes') }}
        </SelectItem>
        <SelectItem v-for="type in MaintenanceTypes" :key="type" :value="type">
          {{ $t(`common.statuses.maintenanceType.${type}`) }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
