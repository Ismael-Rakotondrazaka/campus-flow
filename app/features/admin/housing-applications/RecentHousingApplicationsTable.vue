<script setup lang="ts">
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { Icon } from '#components';

import Button from '~/components/ui/button/Button.vue';
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
import { housingApplicationListQuery } from '~/features/shared/housing-applications/housing-application.query';

const columns = useHousingApplicationColumns();

const globalAcademicSessionId = useRouteQuery<
  string | undefined,
  string | undefined
>('g_academic_session_id', undefined);

const { state } = useQuery(() =>
  housingApplicationListQuery({
    academicSessionId: globalAcademicSessionId.value,
    limit: 5,
    orderBy: HousingApplicationOrderBy.createdAt,
    sortOrder: SortOrder.desc,
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
</script>

<template>
  <div class="w-full">
    <div class="mb-2 flex items-center justify-between gap-4">
      <h1 class="text-2xl font-bold">
        {{ $t('admin.housingApplications.listTitle') }}
      </h1>
      <NuxtLinkLocale
        :to="{ name: 'admin-root-housing-applications' }"
        class="inline-block"
        :title="$t('admin.housingApplications.manageCtaTitle')"
        as-child
      >
        <Button variant="default" class="rounded-full">
          {{ $t('admin.housingApplications.manageCta') }}
          <Icon name="mdi:arrow-right" size="1.2rem" />
        </Button>
      </NuxtLinkLocale>
    </div>

    <div class="w-full">
      <div class="rounded-md border">
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
    </div>
  </div>
</template>
