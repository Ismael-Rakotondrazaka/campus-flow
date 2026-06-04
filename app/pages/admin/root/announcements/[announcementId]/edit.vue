<script setup lang="ts">
import type { Announcement } from '#imports';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import UpdateAnnouncementForm from '~/features/admin/announcements/UpdateAnnouncementForm.vue';
import { announcementByIdQuery } from '~/features/shared/announcements/announcement.query';

const route = useRoute();
const announcementId = computed(() => route.params.announcementId as string);

const { state } = useQuery(() =>
  announcementByIdQuery({ id: announcementId.value })
);

const announcement = computed<null | Serialize<Announcement>>(
  () => state.value?.data ?? null
);
</script>

<template>
  <div class="container mx-auto p-2">
    <h1 class="mb-4 text-2xl font-bold">
      {{ $t('admin.announcements.editTitle') }}
    </h1>

    <template v-if="state.status === 'pending'">
      <Card>
        <CardHeader>
          <Skeleton class="h-8 w-2/3" />
          <Skeleton class="mt-2 h-4 w-full" />
        </CardHeader>
        <CardContent class="space-y-4">
          <Skeleton class="h-10 w-full" />
          <Skeleton class="h-32 w-full" />
          <Skeleton class="h-24 w-full" />
          <div class="flex gap-2">
            <Skeleton class="h-9 w-28" />
            <Skeleton class="h-9 w-28" />
          </div>
        </CardContent>
      </Card>
    </template>

    <template v-else-if="announcement">
      <UpdateAnnouncementForm :announcement="announcement" />
    </template>

    <template v-else>
      <p class="text-muted-foreground">
        Cette annonce est introuvable ou a été supprimée.
      </p>
      <Button variant="outline" as-child>
        <NuxtLinkLocale :to="{ name: 'admin-root-announcements' }">
          {{ $t('admin.announcements.backToList') }}
        </NuxtLinkLocale>
      </Button>
    </template>
  </div>
</template>
