<script setup lang="ts">
import type { Announcement } from '#imports';

import { Skeleton } from '~/components/ui/skeleton';
import { announcementByIdQuery } from '~/features/shared/announcements/announcement.query';

const route = useRoute();
const localeRoute = useLocaleRoute();
const { locale, t } = useI18n();

const announcementId = computed(() => route.params.announcementId as string);
const dateLocale = computed(() => (locale.value === 'fr' ? 'fr-FR' : 'en-US'));

const { state } = useQuery(() =>
  announcementByIdQuery({ id: announcementId.value })
);

const announcement = computed<null | Serialize<Announcement>>(
  () => state.value?.data ?? null
);

const handleBack = async () => {
  await navigateTo(localeRoute({ name: 'announcements' }));
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(dateLocale.value, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

useHead(() => ({
  title: announcement.value?.title ?? t('common.announcements.detailTitle'),
}));
</script>

<template>
  <main class="bg-background min-h-screen px-6 py-16 lg:px-16">
    <div class="mx-auto max-w-3xl space-y-6">
      <Button variant="ghost" class="gap-1 px-0" @click="handleBack">
        <Icon name="mdi:arrow-left" />
        {{ $t('common.buttons.back') }}
      </Button>

      <template v-if="state.status === 'pending'">
        <div class="space-y-4">
          <Skeleton class="h-10 w-3/4" />
          <Skeleton class="h-4 w-40" />
          <Skeleton class="h-72 w-full rounded-2xl" />
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-5/6" />
          <Skeleton class="h-4 w-4/5" />
        </div>
      </template>

      <template v-else-if="announcement">
        <article class="space-y-6">
          <div class="space-y-2">
            <p class="text-muted-foreground text-sm">
              {{ formatDate(announcement.createdAt) }}
            </p>
            <h1 class="font-display text-foreground text-3xl font-bold lg:text-4xl">
              {{ announcement.title }}
            </h1>
          </div>

          <div
            v-if="announcement.illustrationUrl"
            class="overflow-hidden rounded-2xl"
          >
            <img
              :src="announcement.illustrationUrl"
              :alt="announcement.title"
              class="h-auto max-h-[480px] w-full object-cover"
            />
          </div>

          <div
            class="text-foreground text-base leading-8 whitespace-pre-wrap"
          >
            {{ announcement.content }}
          </div>
        </article>
      </template>

      <template v-else>
        <div class="rounded-2xl border border-dashed py-20 text-center">
          <Icon
            name="mdi:alert-circle-outline"
            class="text-muted-foreground/30 mx-auto mb-4 h-12 w-12"
          />
          <p class="text-muted-foreground">
            {{ $t('common.notFound.announcement') }}
          </p>
        </div>
      </template>
    </div>
  </main>
</template>
