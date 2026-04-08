<script setup lang="ts">
import type { Announcement } from '~/features/shared/announcements/announcement.model';

import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import AnnouncementStatusBadge from '~/features/shared/announcements/components/AnnouncementStatusBadge.vue';

import AnnouncementMenu from './AnnouncementMenu.vue';

const props = defineProps<{
  announcement: Announcement;
}>();

type Emits = {
  'announcement:delete': [announcement: Announcement];
};
const emit = defineEmits<Emits>();

const isExpanded = ref(false);
</script>

<template>
  <Card class="flex overflow-hidden">
    <CardContent class="relative flex flex-1 flex-row gap-2">
      <!-- Left side: Image -->
      <div
        v-if="props.announcement.illustration_url"
        class="shrink-0 overflow-hidden"
      >
        <img
          :src="props.announcement.illustration_url"
          :alt="props.announcement.title"
          class="h-full w-36 rounded-md object-cover"
        />
      </div>

      <!-- Right side: Info -->
      <div class="flex w-full flex-col justify-between">
        <div class="space-y-2">
          <div class="flex items-start justify-between gap-2">
            <div>
              <h3 class="text-foreground text-md font-bold">
                {{ props.announcement.title }}
              </h3>
              <div class="flex items-center justify-start gap-2">
                <p class="text-muted-foreground text-xs font-medium">
                  {{
                    new Date(props.announcement.created_at).toLocaleDateString(
                      'fr'
                    )
                  }}
                </p>
                <AnnouncementStatusBadge :value="props.announcement.status" />
              </div>
            </div>

            <AnnouncementMenu
              :announcement="props.announcement"
              @announcement:delete="emit('announcement:delete', $event)"
            />
          </div>

          <div>
            <p
              :class="{
                'text-foreground text-sm': true,
                'line-clamp-3': !isExpanded,
              }"
            >
              {{ props.announcement.content }}
            </p>
            <Button
              variant="link"
              size="sm"
              class="w-fit px-0"
              @click="isExpanded = !isExpanded"
            >
              {{ isExpanded ? 'Afficher moins' : 'Afficher plus' }}
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
