<script setup lang="ts">
import type { MaintenanceStatus, MaintenanceType } from '#imports';

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
  maintenanceColumnsLength,
  useMaintenanceColumns,
} from '~/features/admin/maintenances/useMaintenanceColumns';
import MaintenanceStatusSelect from '~/features/shared/maintenances/components/MaintenanceStatusSelect.vue';
import MaintenanceTypeSelect from '~/features/shared/maintenances/components/MaintenanceTypeSelect.vue';
import { maintenanceListQuery } from '~/features/shared/maintenances/maintenance.query';
import PaginationComponent from '~/features/shared/paginations/components/PaginationComponent.vue';

const columns = useMaintenanceColumns();

const status = useRouteQuery<'all' | MaintenanceStatus>('status', 'all');
const type = useRouteQuery<'all' | MaintenanceType>('type', 'all');
const page = useRouteQuery<number>('page', MaintenanceConfig.PAGE_DEFAULT, {
  transform: Number,
});
const limit = useRouteQuery<number>(
  'limit',
  MaintenanceConfig.PAGE_SIZE_DEFAULT,
  {
    transform: Number,
  }
);
const { state } = useQuery(() =>
  maintenanceListQuery({
    limit: limit.value,
    orderBy: MaintenanceOrderBy.createdAt,
    page: page.value,
    sortOrder: SortOrder.desc,
    status: status.value === 'all' ? undefined : status.value,
    type: type.value === 'all' ? undefined : type.value,
  })
);

const maintenances = computed<Serialize<Maintenance>[]>(
  () => state.value?.data?.data ?? []
);

const table = useVueTable({
  get columns() {
    return columns.value;
  },
  data: maintenances,
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

watch([status, type], () => {
  page.value = MaintenanceConfig.PAGE_DEFAULT;
});

watch(page, value => {
  if (!Number.isFinite(value) || value < MaintenanceConfig.PAGE_DEFAULT) {
    page.value = MaintenanceConfig.PAGE_DEFAULT;
  }
});

watch(limit, value => {
  if (!Number.isFinite(value) || value <= 0) {
    limit.value = MaintenanceConfig.PAGE_SIZE_DEFAULT;
    return;
  }

  page.value = MaintenanceConfig.PAGE_DEFAULT;
});
</script>

<template>
  <div class="w-full">
    <div class="mb-2 flex items-center justify-end gap-2">
      <MaintenanceTypeSelect v-model="type" />
      <MaintenanceStatusSelect v-model="status" />
    </div>

    <p class="text-foreground mb-2 text-base">
      {{ $t('common.results.countLabel') }}
      <span class="font-bold">{{ totalCount }}</span>
      {{ $t('admin.results.maintenance', totalCount) }}
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
                <Skeleton class="h-9 w-9 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-30" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-7" />
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
              :colspan="maintenanceColumnsLength"
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
