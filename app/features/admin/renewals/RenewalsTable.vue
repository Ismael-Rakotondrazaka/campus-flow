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
import { SortOrder } from '#imports';

import type { Renewal } from '~/features/shared/renewals/renewal.model';

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
import { renewalListQuery } from '~/features/shared/renewals/renewal.query';

import { renewalColumns } from './renewalColumns';

const { state } = useQuery(() =>
  renewalListQuery({
    limit: 5,
    orderBy: 'created_at',
    sortOrder: SortOrder.desc,
  })
);

const renewals = computed(() => state.value?.data?.data ?? ([] as Renewal[]));

const sorting = ref<SortingState>([]);

const table = useVueTable({
  columns: renewalColumns,
  data: renewals.value,
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
        Demande de renouvellements récentes
      </p>
      <NuxtLink
        :to="{ name: 'admin-root-renewals' }"
        class="inline-block"
        title="Gérer les renouvellements"
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
                  v-for="j in renewalColumns.length"
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
