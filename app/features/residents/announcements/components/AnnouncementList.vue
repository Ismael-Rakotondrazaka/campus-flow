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
  if (page.value > pages) {
    page.value = pages;
  }
});

const handlePageChange = (newPage: number) => {
  page.value = newPage;
  window.scrollTo({ behavior: 'smooth', top: 0 });
};

const handleAnnouncementClick = async (
  announcement: Serialize<Announcement>
) => {
  await navigateTo(
    localeRoute({
      name: 'resident-announcements-announcementId',
      params: { announcementId: announcement.id },
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
  <div class="w-full space-y-4">
    <template v-if="state.status === 'pending'">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in LIMIT" :key="`skeleton-${i}`" class="space-y-2">
          <Skeleton class="h-40 w-full rounded-lg" />
        </div>
      </div>
    </template>

    <template v-else-if="announcements.length">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <button
          v-for="announcement in announcements"
          :key="announcement.id"
          class="w-full cursor-pointer text-left"
          @click="handleAnnouncementClick(announcement)"
        >
          <Card
            class="hover:bg-muted/50 flex h-full overflow-hidden transition-colors"
          >
            <CardContent class="flex flex-1 flex-col gap-3 p-4">
              <div
                v-if="announcement.illustrationUrl"
                class="h-40 w-full overflow-hidden rounded-md"
              >
                <img
                  :src="announcement.illustrationUrl"
                  :alt="announcement.title"
                  class="h-full w-full object-cover"
                />
              </div>

              <div class="flex flex-1 flex-col gap-1">
                <h3 class="text-foreground text-base font-bold">
                  {{ announcement.title }}
                </h3>
                <p class="text-muted-foreground text-xs">
                  {{ formatDate(announcement.createdAt) }}
                </p>
                <p class="text-foreground mt-1 line-clamp-3 text-sm">
                  {{ announcement.content }}
                </p>
              </div>
            </CardContent>
          </Card>
        </button>
      </div>
    </template>

    <template v-else>
      <div
        class="rounded-md border border-dashed border-gray-300 py-12 text-center"
      >
        <p class="text-gray-500">
          {{ t('resident.announcements.empty') }}
        </p>
      </div>
    </template>

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
