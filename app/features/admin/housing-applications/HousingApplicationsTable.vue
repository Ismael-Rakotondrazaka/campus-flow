<script setup lang="ts">
import type { SortingState } from '@tanstack/vue-table';

import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table';
import { Icon, NuxtLink } from '#components';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Button from '~/components/ui/button/Button.vue';
import TableEmpty from '~/components/ui/table/TableEmpty.vue';
import { valueUpdater } from '~/components/ui/table/utils';

import type { HousingApplication } from './housing-application.model';

import { housing_applicationListQuery } from './housing-application.query';
import { housing_applicationColumns } from './housing-applicationColumns';

const { state } = useQuery(() =>
  housing_applicationListQuery({
    limit: 5,
    orderBy: 'created_at',
    sortOrder: SortOrder.desc,
  })
);

const housing_applications = computed(
  () => state.value?.data?.data ?? ([] as HousingApplication[])
);

const sorting = ref<SortingState>([]);

const table = useVueTable({
  columns: housing_applicationColumns,
  data: housing_applications.value,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  state: {
    get sorting() {
      return sorting.value;
    },
  },
});
</script>

<template>
  <div class="w-full">
    <div class="mb-2 flex items-center justify-between gap-4">
      <p class="text-foreground text-lg font-bold">
        Demande de réservations récentes
      </p>
      <NuxtLink
        :to="{ name: 'admin-root-housing_applications' }"
        class="inline-block"
        title="Gérer les réservations"
        as-child
      >
        <Button variant="default" class="rounded-full">
          Gérer
          <Icon name="mdi:arrow-right" size="1.2rem" />
        </Button>
      </NuxtLink>
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
                <TableCell
                  v-for="j in housing_applicationColumns.length"
                  :key="`skeleton-cell-${i}-${j}`"
                >
                  <Skeleton class="my-2 h-5 w-full" />
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
            <TableEmpty v-else
              ><p class="text-center">Aucun résultat.</p></TableEmpty
            >
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</template>
