<script setup lang="ts">
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table';
import { Icon, NuxtLink } from '#components';

import type { HousingApplication } from '~/features/shared/housing-applications/housing-application.model';

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
import {
  housingApplicationColumns,
  housingApplicationColumnsLength,
} from '~/features/admin/housing-applications/housing-application-columns';
import { housingApplicationListQuery } from '~/features/shared/housing-applications/housing-application.query';

const { state } = useQuery(() =>
  housingApplicationListQuery({
    limit: 5,
    orderBy: 'created_at',
    sortOrder: SortOrder.desc,
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
  getFilteredRowModel: getFilteredRowModel(),
  getSortedRowModel: getSortedRowModel(),
});
</script>

<template>
  <div class="w-full">
    <div class="mb-2 flex items-center justify-between gap-4">
      <h1 class="text-2xl font-bold">Gestion des demandes de logement</h1>
      <NuxtLink
        :to="{ name: 'admin-root-housing-applications' }"
        class="inline-block"
        title="Gérer les demandes de logement"
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
    </div>
  </div>
</template>
