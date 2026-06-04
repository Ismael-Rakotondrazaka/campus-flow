<script setup lang="ts">
import type { Lodgment } from '#imports';

import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table';

import { Skeleton } from '~/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import {
  lodgmentColumnsLength,
  useLodgmentColumns,
} from '~/features/admin/lodgments/useLodgmentColumns';
import BuildingSelect from '~/features/shared/buildings/components/BuildingSelect.vue';
import { lodgmentListQuery } from '~/features/shared/lodgments/lodgment.query';
import PaginationComponent from '~/features/shared/paginations/components/PaginationComponent.vue';

const columns = useLodgmentColumns();

const buildingId = useRouteQuery<string | undefined>('buildingId', undefined);
const page = useRouteQuery<number>('page', LodgmentConfig.PAGE_DEFAULT, {
  transform: Number,
});
const limit = useRouteQuery<number>('limit', LodgmentConfig.PAGE_SIZE_DEFAULT, {
  transform: Number,
});

const { state } = useQuery(() =>
  lodgmentListQuery({
    buildingId: buildingId.value || undefined,
    limit: limit.value,
    orderBy: 'buildingId',
    page: page.value,
    sortOrder: SortOrder.asc,
  })
);

const lodgments = computed<Serialize<Lodgment>[]>(
  () => state.value?.data?.data ?? []
);

const table = useVueTable({
  get columns() {
    return columns.value;
  },
  data: lodgments,
  getCoreRowModel: getCoreRowModel(),
});

const totalCount = computed(() => state.value?.data?.count ?? 0);
const totalPages = computed(() =>
  Math.max(1, Math.ceil(totalCount.value / limit.value))
);

watch(totalPages, pages => {
  if (page.value > pages) {
    page.value = pages;
  }
});

watch([buildingId], () => {
  page.value = LodgmentConfig.PAGE_DEFAULT;
});

watch(page, value => {
  if (!Number.isFinite(value) || value < LodgmentConfig.PAGE_DEFAULT) {
    page.value = LodgmentConfig.PAGE_DEFAULT;
  }
});

watch(limit, value => {
  if (!Number.isFinite(value) || value <= 0) {
    limit.value = LodgmentConfig.PAGE_SIZE_DEFAULT;
    return;
  }

  page.value = LodgmentConfig.PAGE_DEFAULT;
});
</script>

<template>
  <div class="w-full">
    <div class="mb-2 flex items-center justify-end gap-2">
      <BuildingSelect v-model="buildingId" class="w-56" />
    </div>

    <p class="text-foreground mb-2 text-base">
      {{ $t('common.results.countLabel') }}
      <span class="font-bold">{{ totalCount }}</span>
      {{ $t('admin.results.lodgment', totalCount) }}
    </p>

    <div class="mb-2 rounded-md border">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <template v-if="state.status === 'pending'">
            <TableRow v-for="i in 5" :key="`skeleton-${i}`">
              <TableCell>
                <Skeleton class="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-12" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-12" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-16" />
              </TableCell>
            </TableRow>
          </template>

          <template v-else-if="table.getRowModel().rows?.length">
            <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell
              :colspan="lodgmentColumnsLength"
              class="h-24 text-center"
            >
              {{ $t('common.empty.noResults') }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <PaginationComponent
      class=""
      :limit="limit"
      :page="page"
      :total-count="totalCount"
      :total-pages="totalPages"
      @page-change="page = $event"
      @page-size-change="limit = $event"
    />
  </div>
</template>
