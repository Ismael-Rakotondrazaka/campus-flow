<script setup lang="ts">
import type { Announcement } from '~/features/shared/announcements/announcement.model';

import { Skeleton } from '@/components/ui/skeleton';
import AnnouncementCard from '~/features/admin/announcements/AnnouncementCard.vue';
import { AnnouncementConfig } from '~/features/shared/announcements/announcement.config';
import { announcementListQuery } from '~/features/shared/announcements/announcement.query';
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

const { state } = useQuery(() =>
  announcementListQuery({
    limit: limit.value,
    orderBy: 'created_at',
    page: page.value,
    search: search.value || undefined,
  })
);

const announcements = computed(
  () => state.value?.data?.data ?? ([] as Announcement[])
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

watch([search], () => {
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

const announcementToDelete = ref<Announcement | null>(null);

const openAnnouncementDeleteModal = ref(false);

const handleAnnouncementDelete = (announcement: Announcement) => {
  announcementToDelete.value = announcement;
  openAnnouncementDeleteModal.value = true;
};

const handleAnnouncementDeleted = () => {
  announcementToDelete.value = null;
};
</script>

<template>
  <div class="w-full space-y-4">
    <div class="flex items-center justify-between gap-2">
      <Input
        v-model="search"
        type="text"
        placeholder="Rechercher une annonce..."
        class="max-w-xs"
      />
    </div>

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
        />
      </div>
    </template>

    <template v-else>
      <div
        class="rounded-md border border-dashed border-gray-300 py-12 text-center"
      >
        <p class="text-gray-500">Aucune annonce trouvée.</p>
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
