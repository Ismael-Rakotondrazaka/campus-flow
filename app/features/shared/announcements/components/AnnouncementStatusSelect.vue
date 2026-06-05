<script setup lang="ts">
import { type AnnouncementStatus, AnnouncementStatuses } from '#imports';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

const value = defineModel<'all' | AnnouncementStatus>({
  default: 'all',
  required: false,
});
</script>

<template>
  <Select v-model="value">
    <SelectTrigger class="w-[200px]">
      <SelectValue :placeholder="$t('common.selects.status')" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="all">
          {{ $t('common.selects.allStatuses') }}
        </SelectItem>
        <SelectItem
          v-for="status in AnnouncementStatuses"
          :key="status"
          :value="status"
        >
          {{ $t(`common.statuses.announcement.${status}`) }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
