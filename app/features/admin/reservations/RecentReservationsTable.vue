<script setup lang="ts">
import type { ColumnDef, SortingState } from '@tanstack/vue-table';

import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table';
import { formatDate } from '@vueuse/core';
import { Icon, NuxtLink } from '#components';

import type { Reservation } from '~/features/shared/reservations/reservation.model';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
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
import ReservationStatusBadge from '~/features/shared/reservations/components/ReservationStatusBadge.vue';
import { reservationListQuery } from '~/features/shared/reservations/reservation.query';
import { getUserFullname } from '~/features/shared/users/composables/useUserFullname';
import { formatUserImageUrl } from '~/features/shared/users/composables/useUserImageUrl';

const { state } = useQuery(() =>
  reservationListQuery({
    limit: 5,
    orderBy: 'created_at',
    sortOrder: SortOrder.desc,
  })
);

const reservations = computed(
  () => state.value?.data?.data ?? ([] as Reservation[])
);

const columns: ColumnDef<Reservation>[] = [
  {
    accessorKey: 'image_url',
    cell: ({ row }) => {
      const reservation = row.original;
      const imageUrl = formatUserImageUrl(reservation);
      const fullname = getUserFullname(reservation);
      return h(Avatar, {}, () => [
        h(AvatarImage, {
          alt: fullname,
          src: imageUrl,
        }),
      ]);
    },
    enableSorting: false,
    header: 'Avatar',
  },
  {
    accessorFn: row => {
      const fullname = getUserFullname(row);
      return fullname;
    },
    cell: ({ row }) => {
      const fullname = getUserFullname(row.original);
      return h('div', { class: 'font-medium' }, fullname);
    },
    header: 'Nom et prénom',
    id: 'fullname',
  },
  {
    accessorKey: 'email',
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email')),
    header: 'Email',
  },
  {
    accessorKey: 'phone_number',
    cell: ({ row }) => h('div', {}, row.getValue('phone_number')),
    header: 'Téléphone',
  },
  {
    accessorKey: 'status',
    cell: ({ row }) =>
      h(ReservationStatusBadge, {
        value: row.original.status,
      }),
    header: 'Statut',
  },
  {
    accessorKey: 'created_at',
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'));
      return h(
        'div',
        {},
        formatDate(date, 'DD/MM/YYYY HH:mm', { locales: 'fr' })
      );
    },
    header: "Date d'envoi",
  },
  {
    cell: ({ row }) => {
      const reservationId = row.original.id;
      return h(
        NuxtLink,
        {
          class:
            'inline-flex w-full items-center justify-center hover:text-blue-600',
          title: 'Voir les détails',
          to: {
            name: 'admin-root-reservations-id',
            params: {
              id: reservationId,
            },
          },
        },
        () =>
          h(Icon, { class: 'inline-block', name: 'mdi:eye', size: '1.2rem' })
      );
    },
    enableHiding: false,
    enableSorting: false,
    header: 'Action',
    id: 'view',
  },
];

const sorting = ref<SortingState>([]);

const table = useVueTable({
  columns,
  data: reservations.value,
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
  <div class="flex items-center justify-between gap-4">
    <p class="text-foreground text-lg font-bold">
      Demande de réservations récentes
    </p>

    <Button variant="default" class="rounded-full">
      Gérer
      <Icon name="mdi:arrow-right" size="1.2rem" />
    </Button>
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
                v-for="j in columns.length"
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

          <TableEmpty v-else>Aucun résultat.</TableEmpty>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
