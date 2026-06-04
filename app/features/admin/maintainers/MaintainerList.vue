<script setup lang="ts">
import type { Maintainer } from '#imports';

import { MaintainerConfig, MaintainerOrderBy } from '#imports';

import { Skeleton } from '~/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { maintainerListQuery } from '~/features/shared/maintainers/maintainer.query';
import PaginationComponent from '~/features/shared/paginations/components/PaginationComponent.vue';

import MaintainerDeleteModal from './MaintainerDeleteModal.vue';

const COLUMNS_LENGTH = 4;

const page = useRouteQuery<number>('page', MaintainerConfig.PAGE_DEFAULT, {
  transform: Number,
});
const limit = useRouteQuery<number>(
  'limit',
  MaintainerConfig.PAGE_SIZE_DEFAULT,
  { transform: Number }
);

const { state } = useQuery(() =>
  maintainerListQuery({
    limit: limit.value,
    orderBy: MaintainerOrderBy.createdAt,
    page: page.value,
    sortOrder: SortOrder.desc,
  })
);

const maintainers = computed<Serialize<Maintainer>[]>(
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

watch(page, value => {
  if (!Number.isFinite(value) || value < MaintainerConfig.PAGE_DEFAULT) {
    page.value = MaintainerConfig.PAGE_DEFAULT;
  }
});

watch(limit, value => {
  if (!Number.isFinite(value) || value <= 0) {
    limit.value = MaintainerConfig.PAGE_SIZE_DEFAULT;
    page.value = MaintainerConfig.PAGE_DEFAULT;
  }
});

const maintainerToDelete = ref<null | Serialize<Maintainer>>(null);
const openDeleteModal = ref(false);

const handleDelete = (maintainer: Serialize<Maintainer>) => {
  maintainerToDelete.value = maintainer;
  openDeleteModal.value = true;
};

const handleDeleted = () => {
  maintainerToDelete.value = null;
};
</script>

<template>
  <div class="w-full space-y-4">
    <p class="text-foreground text-base">
      {{ $t('common.results.countLabel') }}
      <span class="font-bold">{{ totalCount }}</span>
      {{ $t('admin.results.maintainer', totalCount) }}
    </p>

    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{{ $t('admin.tables.name') }}</TableHead>
            <TableHead>{{ $t('common.tables.phone') }}</TableHead>
            <TableHead>{{ $t('common.tables.actions') }}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <template v-if="state.status === 'pending'">
            <TableRow v-for="i in 5" :key="`skeleton-${i}`">
              <TableCell v-for="j in COLUMNS_LENGTH" :key="j">
                <Skeleton class="h-4 w-28" />
              </TableCell>
            </TableRow>
          </template>

          <template v-else-if="maintainers.length">
            <TableRow v-for="maintainer in maintainers" :key="maintainer.id">
              <TableCell class="font-medium">
                {{ maintainer.firstName }} {{ maintainer.lastName }}
              </TableCell>
              <TableCell>{{ maintainer.phoneNumber }}</TableCell>
              <TableCell>
                <div class="flex items-center gap-1">
                  <NuxtLinkLocale
                    class="inline-flex items-center justify-center rounded-md p-1 hover:text-blue-600"
                    :title="$t('common.buttons.edit')"
                    :to="{
                      name: 'admin-maintenance-maintainers-maintainerId-edit',
                      params: { maintainerId: maintainer.id },
                    }"
                  >
                    <Icon name="mdi:pencil" size="1.1rem" />
                  </NuxtLinkLocale>
                  <button
                    class="inline-flex items-center justify-center rounded-md p-1 hover:text-red-600"
                    :title="$t('common.buttons.delete')"
                    @click="handleDelete(maintainer)"
                  >
                    <Icon name="mdi:delete" size="1.1rem" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell :colspan="COLUMNS_LENGTH" class="h-24 text-center">
              {{ $t('common.empty.noResults') }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <PaginationComponent
      v-if="maintainers.length"
      :limit="limit"
      :page="page"
      :total-count="totalCount"
      :total-pages="totalPages"
      @page-change="page = $event"
      @page-size-change="limit = $event"
    />

    <MaintainerDeleteModal
      v-if="maintainerToDelete"
      v-model:open="openDeleteModal"
      :maintainer="maintainerToDelete"
      @maintainer:deleted="handleDeleted"
    />
  </div>
</template>
