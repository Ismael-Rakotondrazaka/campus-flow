<script setup lang="ts">
import type { HousingApplicationStatus } from '#imports';

import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table';

import { Input } from '~/components/ui/input';
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
  housingApplicationColumnsLength,
  useHousingApplicationColumns,
} from '~/features/admin/housing-applications/useHousingApplicationColumns';
import HousingApplicationStatusSelect from '~/features/shared/housing-applications/components/HousingApplicationStatusSelect.vue';
import { housingApplicationListQuery } from '~/features/shared/housing-applications/housing-application.query';
import PaginationComponent from '~/features/shared/paginations/components/PaginationComponent.vue';

const columns = useHousingApplicationColumns();

const globalAcademicSessionId = useRouteQuery<
  string | undefined,
  string | undefined
>('g_academic_session_id', undefined);
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

const { state } = useQuery(() =>
  housingApplicationListQuery({
    academicSessionId: globalAcademicSessionId.value,
    limit: limit.value,
    orderBy: HousingApplicationOrderBy.createdAt,
    page: page.value,
    search: search.value || undefined,
    sortOrder: SortOrder.desc,
    status: status.value === 'all' ? undefined : status.value,
  })
);

const housingApplications = computed<Serialize<HousingApplication>[]>(
  () => state.value?.data?.data ?? []
);

const table = useVueTable({
  get columns() {
    return columns.value;
  },
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

watch([search, status, globalAcademicSessionId], () => {
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
      <Input
        v-model="search"
        type="text"
        :placeholder="$t('common.search.placeholder')"
      />

      <HousingApplicationStatusSelect v-model="status" />
    </div>

    <p class="text-foreground mb-2 text-base">
      {{ $t('common.results.countLabel') }}
      <span class="font-bold">{{ totalCount }}</span>
      {{ $t('admin.results.housingApplication', totalCount) }}
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
