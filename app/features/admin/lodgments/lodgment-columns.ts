import type { ColumnDef } from '@tanstack/vue-table';

import type { Lodgment } from '~/features/shared/lodgments/lodgment.model';

import OccupancyStatusBadge from '~/features/shared/lodgments/components/OccupancyStatusBadge.vue';
import { getLodgementOccupancyStatus } from '~/features/shared/lodgments/lodgment.model';

export const lodgmentColumnsLength: number = 5;

const getOrdinalFloor = (floorNumber: number) => {
  if (floorNumber === 0) {
    return 'Rez-de-chaussée';
  }

  if (floorNumber < 0) {
    return `Sous-sol ${Math.abs(floorNumber)}`;
  }

  const ordinal = floorNumber === 1 ? '1er' : `${floorNumber}ème`;

  return `${ordinal} étage`;
};

export const lodgmentColumns: ColumnDef<Lodgment>[] = [
  {
    accessorKey: 'building.name',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'font-medium' },
        `Bâtiment ${row.original.building.name}`
      );
    },
    header: 'Bâtiment',
  },
  {
    accessorKey: 'floor',
    cell: ({ row }) => h('div', {}, getOrdinalFloor(row.getValue('floor'))),
    header: 'Étage',
  },
  {
    accessorKey: 'room_number',
    cell: ({ row }) => h('div', {}, `Porte ${row.getValue('room_number')}`),
    header: 'Numéro de chambre',
  },
  {
    accessorKey: 'capacity',
    cell: ({ row }) => {
      const residents = row.original.residents_count;
      const capacity = row.getValue('capacity');
      return h('div', {}, `${residents}/${capacity}`);
    },
    header: 'Capacité',
  },
  {
    cell: ({ row }) => {
      const status = getLodgementOccupancyStatus(
        row.original.residents_count,
        row.original.capacity
      );
      return h(OccupancyStatusBadge, {
        value: status,
      });
    },
    header: 'Status',
    id: 'occupancy_status',
  },
];
