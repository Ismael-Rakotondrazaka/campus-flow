<script setup lang="ts">
import type { Announcement } from '#imports';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

interface Props {
  announcement: Serialize<Announcement>;
}

const props = defineProps<Props>();

type Emits = {
  'announcement:delete': [announcement: Serialize<Announcement>];
  'announcement:edit': [announcement: Serialize<Announcement>];
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
        {{ $t('common.buttons.edit') }}
        <DropdownMenuShortcut>
          <Icon name="mdi:pencil" size="1rem" />
        </DropdownMenuShortcut>
      </DropdownMenuItem>

      <DropdownMenuItem
        @click="emit('announcement:delete', props.announcement)"
      >
        {{ $t('common.buttons.delete') }}
        <DropdownMenuShortcut>
          <Icon name="mdi:delete" size="1rem" />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
