<script setup lang="ts">
import type { Announcement } from '~/features/shared/announcements/announcement.model';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Props {
  announcement: Announcement;
}

const props = defineProps<Props>();

type Emits = {
  'announcement:delete': [announcement: Announcement];
  'announcement:edit': [announcement: Announcement];
};
const emit = defineEmits<Emits>();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button size="icon" variant="ghost">
        <Icon name="mdi:dots-horizontal" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent class="w-56" align="start">
      <DropdownMenuItem @click="emit('announcement:edit', props.announcement)">
        Modifier
        <DropdownMenuShortcut>
          <Icon name="mdi:pencil" size="1rem" />
        </DropdownMenuShortcut>
      </DropdownMenuItem>

      <DropdownMenuItem
        @click="emit('announcement:delete', props.announcement)"
      >
        Supprimer
        <DropdownMenuShortcut>
          <Icon name="mdi:delete" size="1rem" />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
