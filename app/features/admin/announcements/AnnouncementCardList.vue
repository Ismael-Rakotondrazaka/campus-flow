<script setup lang="ts">
import type { Announcement, AnnouncementStatus } from '#imports';

import { AnnouncementConfig } from '#imports';

import { Skeleton } from '~/components/ui/skeleton';
import AnnouncementCard from '~/features/admin/announcements/AnnouncementCard.vue';
import { announcementListQuery } from '~/features/shared/announcements/announcement.query';
import AnnouncementStatusSelect from '~/features/shared/announcements/components/AnnouncementStatusSelect.vue';
import PaginationComponent from '~/features/shared/paginations/components/PaginationComponent.vue';

import AnnouncementDeleteModal from './AnnouncementDeleteModal.vue';

const page = useRouteQuery<number>('page', AnnouncementConfig.PAGE_DEFAULT, {
  transform: Number,
});
const limit = useRouteQuery<number>(
  'limit',
  AnnouncementConfig.PAGE_SIZE_DEFAULT,
  {
    transform: Number,
  }
);
const search = useRouteQuery<string>('search', '');
const status = useRouteQuery<'all' | AnnouncementStatus>('status', 'all');

const { state } = useQuery(() =>
  announcementListQuery({
    limit: limit.value,
    orderBy: 'createdAt',
    page: page.value,
    search: search.value || undefined,
    status: status.value === 'all' ? undefined : status.value,
  })
);

const announcements = computed(
  () => state.value?.data?.data ?? ([] as Serialize<Announcement>[])
);

const totalCount = computed(() => state.value?.data?.count ?? 0);
const totalPages = computed(() =>
  Math.max(1, Math.ceil(totalCount.value / limit.value))
);

watch(totalPages, pages => {
  if (page.value > pages) {
    page.value = pages;
  }
});

watch([search, status], () => {
  page.value = AnnouncementConfig.PAGE_DEFAULT;
});

watch(page, value => {
  if (!Number.isFinite(value) || value < AnnouncementConfig.PAGE_DEFAULT) {
    page.value = AnnouncementConfig.PAGE_DEFAULT;
  }
});

watch(limit, value => {
  if (!Number.isFinite(value) || value <= 0) {
    limit.value = AnnouncementConfig.PAGE_SIZE_DEFAULT;
    return;
  }

  page.value = AnnouncementConfig.PAGE_DEFAULT;
});

const announcementToDelete = ref<null | Serialize<Announcement>>(null);

const openAnnouncementDeleteModal = ref(false);

const handleAnnouncementDelete = (announcement: Serialize<Announcement>) => {
  announcementToDelete.value = announcement;
  openAnnouncementDeleteModal.value = true;
};

const handleAnnouncementDeleted = () => {
  announcementToDelete.value = null;
};

const localeRoute = useLocaleRoute();

const handleAnnouncementEdit = async (
  announcement: Serialize<Announcement>
) => {
  await navigateTo(
    localeRoute({
      name: 'admin-root-announcements-announcementId-edit',
      params: { announcementId: announcement.id },
    })
  );
};
</script>

<template>
  <div class="w-full space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <Input
        v-model="search"
        type="text"
        :placeholder="$t('common.search.placeholderAnnouncement')"
        class="max-w-xs"
      />
      <AnnouncementStatusSelect v-model="status" />
    </div>

    <p class="text-foreground text-base">
      {{ $t('common.results.countLabel') }}
      <span class="font-bold">{{ totalCount }}</span>
      {{ $t('admin.results.announcement', totalCount) }}
    </p>

    <template v-if="state.status === 'pending'">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div v-for="i in 6" :key="`skeleton-${i}`" class="space-y-2">
          <Skeleton class="h-48 w-full rounded-lg" />
        </div>
      </div>
    </template>

    <template v-else-if="announcements.length">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AnnouncementCard
          v-for="announcement in announcements"
          :key="announcement.id"
          :announcement="announcement"
          @announcement:delete="handleAnnouncementDelete"
          @announcement:edit="handleAnnouncementEdit"
        />
      </div>
    </template>

    <template v-else>
      <div
        class="rounded-md border border-dashed border-gray-300 py-12 text-center"
      >
        <p class="text-gray-500">{{ $t('admin.announcements.empty') }}</p>
      </div>
    </template>

    <PaginationComponent
      v-if="announcements.length"
      :limit="limit"
      :page="page"
      :total-count="totalCount"
      :total-pages="totalPages"
      @page-change="page = $event"
      @page-size-change="limit = $event"
    />

    <AnnouncementDeleteModal
      v-if="announcementToDelete"
      v-model:open="openAnnouncementDeleteModal"
      :announcement="announcementToDelete"
      @announcement:deleted="handleAnnouncementDeleted"
    />
  </div>
</template>
