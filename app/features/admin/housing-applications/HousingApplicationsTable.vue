<script setup lang="ts">
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table';

import type {
  HousingApplication,
  HousingApplicationStatus,
} from '~/features/shared/housing-applications/housing-application.model';

import { Input } from '@/components/ui/input';
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
  housingApplicationColumns,
  housingApplicationColumnsLength,
} from '~/features/admin/housing-applications/housing-application-columns';
import { AdminRole } from '~/features/shared/admins/admin.model';
import HousingApplicationStatusSelect from '~/features/shared/housing-applications/components/HousingApplicationStatusSelect.vue';
import { HousingApplicationConfig } from '~/features/shared/housing-applications/housing-application.config';
import { housingApplicationListQuery } from '~/features/shared/housing-applications/housing-application.query';
import PaginationComponent from '~/features/shared/paginations/components/PaginationComponent.vue';

const academicSession = useRouteQuery<string | undefined, string | undefined>(
  'g_academic_session_id',
  undefined
);
const search = useRouteQuery<string | undefined>('search', undefined);
const status = useRouteQuery<'all' | HousingApplicationStatus>('status', 'all');
const page = useRouteQuery<number>(
  'page',
  HousingApplicationConfig.PAGE_DEFAULT,
  {
    transform: Number,
  }
);
const limit = useRouteQuery<number>(
  'limit',
  HousingApplicationConfig.PAGE_SIZE_DEFAULT,
  {
    transform: Number,
  }
);

const authUser = useSupabaseUser();

const { state } = useQuery(() =>
  housingApplicationListQuery({
    academic_session_id: academicSession.value,
    admin_id:
      authUser.value?.sub && authUser.value?.app_metadata?.role
        ? authUser.value?.app_metadata?.role === AdminRole.root
          ? undefined
          : authUser.value?.sub
        : undefined,
    limit: limit.value,
    orderBy: 'created_at',
    page: page.value,
    search: search.value || undefined,
    sortOrder: SortOrder.desc,
    status: status.value === 'all' ? undefined : status.value,
  })
);

const housingApplications = computed(
  () => state.value?.data?.data ?? ([] as HousingApplication[])
);

const globalAcademicSessionId = useRouteQuery<
  string | undefined,
  string | undefined
>('g_academic_session_id', undefined);

const getGlobalAcademicSessionId = () => {
  return globalAcademicSessionId.value;
};

const table = useVueTable({
  columns: housingApplicationColumns({ getGlobalAcademicSessionId }),
  data: housingApplications,
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

watch([search, status, academicSession], () => {
  page.value = HousingApplicationConfig.PAGE_DEFAULT;
});

watch(page, value => {
  if (
    !Number.isFinite(value) ||
    value < HousingApplicationConfig.PAGE_DEFAULT
  ) {
    page.value = HousingApplicationConfig.PAGE_DEFAULT;
  }
});

watch(limit, value => {
  if (!Number.isFinite(value) || value <= 0) {
    limit.value = HousingApplicationConfig.PAGE_SIZE_DEFAULT;
    return;
  }

  page.value = HousingApplicationConfig.PAGE_DEFAULT;
});
</script>

<template>
  <div class="w-full">
    <div class="mb-2 flex items-center justify-between gap-2">
      <Input v-model="search" type="text" placeholder="Rechercher" />

      <HousingApplicationStatusSelect v-model="status" />
    </div>

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
              :colspan="housingApplicationColumnsLength"
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
