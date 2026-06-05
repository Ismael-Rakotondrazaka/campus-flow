<script setup lang="ts">
import type { AcademicSession } from '#imports';

import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { AcademicSessionOrderBy } from '#imports';

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
  academicSessionColumnsLength,
  useAcademicSessionColumns,
} from '~/features/admin/academic-sessions/useAcademicSessionColumns';
import { academicSessionListQuery } from '~/features/shared/academic-sessions/academic-session.query';
import PaginationComponent from '~/features/shared/paginations/components/PaginationComponent.vue';

import AcademicSessionDeleteModal from './AcademicSessionDeleteModal.vue';

const page = useRouteQuery<number>('page', AcademicSessionConfig.PAGE_DEFAULT, {
  transform: Number,
});
const limit = useRouteQuery<number>(
  'limit',
  AcademicSessionConfig.PAGE_SIZE_DEFAULT,
  { transform: Number }
);

const { state } = useQuery(() =>
  academicSessionListQuery({
    limit: limit.value,
    orderBy: AcademicSessionOrderBy.startAt,
    page: page.value,
    sortOrder: SortOrder.desc,
  })
);

const sessions = computed<Serialize<AcademicSession>[]>(
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
  if (!Number.isFinite(value) || value < AcademicSessionConfig.PAGE_DEFAULT) {
    page.value = AcademicSessionConfig.PAGE_DEFAULT;
  }
});

watch(limit, value => {
  if (!Number.isFinite(value) || value <= 0) {
    limit.value = AcademicSessionConfig.PAGE_SIZE_DEFAULT;
    return;
  }

  page.value = AcademicSessionConfig.PAGE_DEFAULT;
});

const sessionToDelete = ref<null | Serialize<AcademicSession>>(null);
const openDeleteModal = ref(false);

const handleDelete = (session: Serialize<AcademicSession>) => {
  sessionToDelete.value = session;
  openDeleteModal.value = true;
};

const handleDeleted = () => {
  sessionToDelete.value = null;
};

const columns = useAcademicSessionColumns({ onDelete: handleDelete });

const table = useVueTable({
  get columns() {
    return columns.value;
  },
  data: sessions,
  getCoreRowModel: getCoreRowModel(),
});
</script>

<template>
  <div class="w-full">
    <p class="text-foreground mb-2 text-base">
      {{ $t('common.results.countLabel') }}
      <span class="font-bold">{{ totalCount }}</span>
      {{ $t('admin.results.academicSession', totalCount) }}
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
              <TableCell v-for="j in academicSessionColumnsLength" :key="j">
                <Skeleton class="h-4 w-28" />
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
              :colspan="academicSessionColumnsLength"
              class="h-24 text-center"
            >
              {{ $t('common.empty.noResults') }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <PaginationComponent
      :limit="limit"
      :page="page"
      :total-count="totalCount"
      :total-pages="totalPages"
      @page-change="page = $event"
      @page-size-change="limit = $event"
    />

    <AcademicSessionDeleteModal
      v-if="sessionToDelete"
      v-model:open="openDeleteModal"
      :session="sessionToDelete"
      @session:deleted="handleDeleted"
    />
  </div>
</template>
