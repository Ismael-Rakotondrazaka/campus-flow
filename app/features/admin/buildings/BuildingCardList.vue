<script setup lang="ts">
import type { Building } from '#imports';

import { BuildingConfig } from '#imports';

import { Skeleton } from '~/components/ui/skeleton';
import BuildingCard from '~/features/admin/buildings/BuildingCard.vue';
import { buildingListQuery } from '~/features/shared/buildings/building.query';
import PaginationComponent from '~/features/shared/paginations/components/PaginationComponent.vue';

const page = useRouteQuery<number>('page', BuildingConfig.PAGE_DEFAULT, {
  transform: Number,
});
const limit = useRouteQuery<number>('limit', BuildingConfig.PAGE_SIZE_DEFAULT, {
  transform: Number,
});
const search = useRouteQuery<string>('search', '');

const { state } = useQuery(() =>
  buildingListQuery({
    limit: limit.value,
    orderBy: 'name',
    page: page.value,
    search: search.value || undefined,
  })
);

const buildings = computed<Serialize<Building>[]>(
  () => state.value?.data?.data ?? []
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
  page.value = BuildingConfig.PAGE_DEFAULT;
});

watch(page, value => {
  if (!Number.isFinite(value) || value < BuildingConfig.PAGE_DEFAULT) {
    page.value = BuildingConfig.PAGE_DEFAULT;
  }
});

watch(limit, value => {
  if (!Number.isFinite(value) || value <= 0) {
    limit.value = BuildingConfig.PAGE_SIZE_DEFAULT;
    return;
  }

  page.value = BuildingConfig.PAGE_DEFAULT;
});
</script>

<template>
  <div class="w-full space-y-4">
    <div class="flex items-center justify-between gap-2">
      <Input
        v-model="search"
        type="text"
        :placeholder="$t('common.search.placeholderBuilding')"
        class="max-w-xs"
      />
    </div>

    <p class="text-foreground text-base">
      {{ $t('common.results.countLabel') }}
      <span class="font-bold">{{ totalCount }}</span>
      {{ $t('admin.results.building', totalCount) }}
    </p>

    <template v-if="state.status === 'pending'">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 6" :key="`skeleton-${i}`" class="space-y-2">
          <Skeleton class="h-32 w-full rounded-lg" />
        </div>
      </div>
    </template>

    <template v-else-if="buildings.length">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <BuildingCard
          v-for="building in buildings"
          :key="building.id"
          :building="building"
        />
      </div>
    </template>

    <template v-else>
      <div
        class="rounded-md border border-dashed border-gray-300 py-12 text-center"
      >
        <p class="text-gray-500">{{ $t('common.empty.noBuilding') }}</p>
      </div>
    </template>

    <PaginationComponent
      v-if="buildings.length"
      :limit="limit"
      :page="page"
      :total-count="totalCount"
      :total-pages="totalPages"
      @page-change="page = $event"
      @page-size-change="limit = $event"
    />
  </div>
</template>
