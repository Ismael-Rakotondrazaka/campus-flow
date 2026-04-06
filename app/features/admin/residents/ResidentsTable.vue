<script setup lang="ts">
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table';

import type { Resident } from '~/features/shared/residents/resident.model';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  residentColumns,
  residentColumnsLength,
} from '~/features/admin/residents/resident-columns';
import PaginationComponent from '~/features/shared/paginations/components/PaginationComponent.vue';
import { ResidentConfig } from '~/features/shared/residents/resident.config';
import { residentListQuery } from '~/features/shared/residents/resident.query';

const globalAcademicSessionId = useRouteQuery<
  string | undefined,
  string | undefined
>('g_academic_session_id', undefined);
const page = useRouteQuery<number>('page', ResidentConfig.PAGE_DEFAULT, {
  transform: Number,
});
const limit = useRouteQuery<number>('limit', ResidentConfig.PAGE_SIZE_DEFAULT, {
  transform: Number,
});

const { state } = useQuery(() =>
  residentListQuery({
    academic_session_id: globalAcademicSessionId.value,
    limit: limit.value,
    orderBy: 'created_at',
    page: page.value,
    sortOrder: SortOrder.desc,
  })
);

const residents = computed(() => state.value?.data?.data ?? ([] as Resident[]));

const getGlobalAcademicSessionId = () => {
  return globalAcademicSessionId.value;
};

const table = useVueTable({
  columns: residentColumns({ getGlobalAcademicSessionId }),
  data: residents,
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

watch([globalAcademicSessionId], () => {
  page.value = ResidentConfig.PAGE_DEFAULT;
});

watch(page, value => {
  if (!Number.isFinite(value) || value < ResidentConfig.PAGE_DEFAULT) {
    page.value = ResidentConfig.PAGE_DEFAULT;
  }
});

watch(limit, value => {
  if (!Number.isFinite(value) || value <= 0) {
    limit.value = ResidentConfig.PAGE_SIZE_DEFAULT;
    return;
  }

  page.value = ResidentConfig.PAGE_DEFAULT;
});
</script>

<template>
  <div class="w-full">
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
              :colspan="residentColumnsLength"
              class="h-24 text-center"
            >
              Aucun résultat.
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
