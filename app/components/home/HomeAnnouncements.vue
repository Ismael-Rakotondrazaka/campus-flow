<script setup lang="ts">
import type { Announcement } from '#imports';

import { Skeleton } from '~/components/ui/skeleton';
import { announcementListQuery } from '~/features/shared/announcements/announcement.query';

const localeRoute = useLocaleRoute();
const { locale } = useI18n();

const dateLocale = computed(() => (locale.value === 'fr' ? 'fr-FR' : 'en-US'));

const { state } = useQuery(() =>
  announcementListQuery({
    limit: 3,
    orderBy: 'createdAt',
    page: 1,
    sortOrder: 'desc',
    status: 'published',
  })
);

const announcements = computed(
  () => state.value?.data?.data ?? ([] as Serialize<Announcement>[])
);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(dateLocale.value, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const handleAnnouncementClick = async (
  announcement: Serialize<Announcement>
) => {
  await navigateTo(
    localeRoute({
      name: 'announcements-announcementId',
      params: { announcementId: announcement.id },
    })
  );
};
</script>

<template>
  <section class="bg-muted/40 px-6 py-24 lg:px-16">
    <div class="mx-auto max-w-6xl">
      <div
        class="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <div>
          <span
            class="text-primary mb-3 block text-xs font-bold tracking-[0.2em] uppercase"
          >
            {{ $t('home.announcements.eyebrow') }}
          </span>
          <h2
            class="font-display text-foreground text-4xl leading-tight font-bold lg:text-5xl"
          >
            {{ $t('home.announcements.title.line1') }}<br />{{
              $t('home.announcements.title.line2')
            }}
          </h2>
        </div>
        <p class="text-muted-foreground max-w-sm">
          {{ $t('home.announcements.intro') }}
        </p>
      </div>

      <template v-if="state.status === 'pending'">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div v-for="i in 3" :key="`skel-${i}`" class="space-y-3">
            <Skeleton class="h-48 w-full rounded-2xl" />
            <Skeleton class="h-3 w-1/3" />
            <Skeleton class="h-5 w-5/6" />
            <Skeleton class="h-3 w-full" />
            <Skeleton class="h-3 w-4/5" />
          </div>
        </div>
      </template>

      <template v-else-if="announcements.length">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <button
            v-for="(announcement, i) in announcements"
            :key="announcement.id"
            class="announcement-card group w-full text-left"
            :style="`animation-delay: ${i * 0.1}s`"
            @click="handleAnnouncementClick(announcement)"
          >
            <Card
              class="hover:border-primary/30 h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                v-if="announcement.illustrationUrl"
                class="h-48 w-full overflow-hidden"
              >
                <img
                  :src="announcement.illustrationUrl"
                  :alt="announcement.title"
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div
                v-else
                class="bg-primary/5 flex h-24 w-full items-center justify-center"
              >
                <Icon
                  name="mdi:bullhorn-outline"
                  class="text-primary/30 h-10 w-10"
                />
              </div>

              <CardContent class="flex flex-col gap-2 p-5">
                <p class="text-muted-foreground text-xs">
                  {{ formatDate(announcement.createdAt) }}
                </p>
                <h3
                  class="font-display text-foreground text-lg leading-snug font-semibold"
                >
                  {{ announcement.title }}
                </h3>
                <p
                  class="text-muted-foreground line-clamp-3 text-sm leading-relaxed"
                >
                  {{ announcement.content }}
                </p>
              </CardContent>
            </Card>
          </button>
        </div>
      </template>

      <template v-else>
        <div class="rounded-2xl border border-dashed py-16 text-center">
          <p class="text-muted-foreground">
            {{ $t('home.announcements.empty') }}
          </p>
        </div>
      </template>

      <div class="mt-12 flex justify-center">
        <NuxtLinkLocale :to="{ name: 'announcements' }" as-child>
          <Button variant="outline" size="lg" class="rounded-full px-8">
            {{ $t('home.announcements.cta') }}
            <Icon name="mdi:arrow-right" class="ml-1" />
          </Button>
        </NuxtLinkLocale>
      </div>
    </div>
  </section>
</template>

<style scoped>
.announcement-card {
  animation: fade-up 0.6s ease both;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
