<script setup lang="ts">
import type { Announcement } from '#imports';

import { AnnouncementConfig } from '#imports';

import { Skeleton } from '~/components/ui/skeleton';
import { announcementListQuery } from '~/features/shared/announcements/announcement.query';
import PaginationComponent from '~/features/shared/paginations/components/PaginationComponent.vue';

const LIMIT = 12;

const localeRoute = useLocaleRoute();
const { locale, t } = useI18n();

const page = ref(AnnouncementConfig.PAGE_DEFAULT);

const dateLocale = computed(() => (locale.value === 'fr' ? 'fr-FR' : 'en-US'));

const { state } = useQuery(() =>
  announcementListQuery({
    limit: LIMIT,
    orderBy: 'createdAt',
    page: page.value,
    sortOrder: 'desc',
    status: 'published',
  })
);

const announcements = computed(
  () => state.value?.data?.data ?? ([] as Serialize<Announcement>[])
);

const totalCount = computed(() => state.value?.data?.count ?? 0);
const totalPages = computed(() =>
  Math.max(1, Math.ceil(totalCount.value / LIMIT))
);

watch(totalPages, pages => {
  if (page.value > pages) page.value = pages;
});

const handlePageChange = (newPage: number) => {
  page.value = newPage;
  window.scrollTo({ behavior: 'smooth', top: 0 });
};

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

useHead({
  title: t('common.announcements.listTitle'),
});
</script>

<template>
  <main class="bg-background min-h-screen px-6 py-16 lg:px-16">
    <div class="mx-auto max-w-6xl space-y-12">
      <div>
        <span
          class="text-primary mb-3 block text-xs font-bold tracking-[0.2em] uppercase"
        >
          {{ $t('home.announcements.eyebrow') }}
        </span>
        <h1
          class="font-display text-foreground text-4xl font-bold lg:text-5xl"
        >
          {{ $t('common.announcements.listTitle') }}
        </h1>
      </div>

      <template v-if="state.status === 'pending'">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in LIMIT" :key="`skel-${i}`" class="space-y-3">
            <Skeleton class="h-48 w-full rounded-2xl" />
            <Skeleton class="h-3 w-1/3" />
            <Skeleton class="h-5 w-5/6" />
            <Skeleton class="h-3 w-full" />
            <Skeleton class="h-3 w-4/5" />
          </div>
        </div>
      </template>

      <template v-else-if="announcements.length">
        <div class="space-y-8">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <button
              v-for="announcement in announcements"
              :key="announcement.id"
              class="group w-full text-left"
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
                  <h2
                    class="font-display text-foreground text-lg leading-snug font-semibold"
                  >
                    {{ announcement.title }}
                  </h2>
                  <p
                    class="text-muted-foreground line-clamp-3 text-sm leading-relaxed"
                  >
                    {{ announcement.content }}
                  </p>
                </CardContent>
              </Card>
            </button>
          </div>

          <PaginationComponent
            v-if="totalCount > LIMIT"
            :limit="LIMIT"
            :page="page"
            :total-count="totalCount"
            :total-pages="totalPages"
            @page-change="handlePageChange"
          />
        </div>
      </template>

      <template v-else>
        <div class="rounded-2xl border border-dashed py-20 text-center">
          <Icon
            name="mdi:bullhorn-outline"
            class="text-muted-foreground/30 mx-auto mb-4 h-12 w-12"
          />
          <p class="text-muted-foreground">
            {{ $t('home.announcements.empty') }}
          </p>
        </div>
      </template>
    </div>
  </main>
</template>
