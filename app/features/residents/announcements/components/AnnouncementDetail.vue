<script setup lang="ts">
import type { Announcement } from '#imports';

import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import { announcementByIdQuery } from '~/features/shared/announcements/announcement.query';

interface Props {
  announcementId: string;
}

const props = defineProps<Props>();

const localeRoute = useLocaleRoute();
const { locale, t } = useI18n();

const dateLocale = computed(() => (locale.value === 'fr' ? 'fr-FR' : 'en-US'));

const { state } = useQuery(() =>
  announcementByIdQuery({ id: props.announcementId })
);

const announcement = computed<null | Serialize<Announcement>>(
  () => state.value?.data ?? null
);

const handleBack = async () => {
  await navigateTo(
    localeRoute({
      name: 'resident-announcements',
    })
  );
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(dateLocale.value, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
</script>

<template>
  <div class="space-y-4">
    <Button variant="ghost" class="gap-1 px-0" @click="handleBack">
      <Icon name="mdi:arrow-left" />
      {{ t('resident.announcements.backToList') }}
    </Button>

    <template v-if="state.status === 'pending'">
      <div class="space-y-4">
        <Skeleton class="h-10 w-3/4" />
        <Skeleton class="h-4 w-40" />
        <Skeleton class="h-64 w-full rounded-lg" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-5/6" />
      </div>
    </template>

    <template v-else-if="announcement">
      <article class="space-y-4">
        <div class="space-y-1">
          <h1 class="text-foreground text-2xl font-bold">
            {{ announcement.title }}
          </h1>
          <p class="text-muted-foreground text-sm">
            {{ formatDate(announcement.createdAt) }}
          </p>
        </div>

        <div
          v-if="announcement.illustrationUrl"
          class="overflow-hidden rounded-lg"
        >
          <img
            :src="announcement.illustrationUrl"
            :alt="announcement.title"
            class="h-auto max-h-96 w-full object-cover"
          />
        </div>

        <div class="text-foreground text-base leading-7 whitespace-pre-wrap">
          {{ announcement.content }}
        </div>
      </article>
    </template>

    <template v-else>
      <div
        class="rounded-md border border-dashed border-gray-300 py-12 text-center"
      >
        <p class="text-gray-500">
          {{ t('common.notFound.announcement') }}
        </p>
      </div>
    </template>
  </div>
</template>
