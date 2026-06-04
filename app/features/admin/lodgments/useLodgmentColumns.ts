import type { ColumnDef } from '@tanstack/vue-table';
import type { Lodgment } from '#imports';

import { getLodgementOccupancyStatus } from '#imports';

import { useAdminFloorLabel } from '~/features/admin/composables/useAdminFloorLabel';
import OccupancyStatusBadge from '~/features/shared/lodgments/components/OccupancyStatusBadge.vue';

export const lodgmentColumnsLength = 5;

export function useLodgmentColumns() {
  const { t } = useI18n();
  const { formatFloor } = useAdminFloorLabel();

  return computed((): ColumnDef<Serialize<Lodgment>>[] => [
    {
      accessorKey: 'building.name',
      cell: ({ row }) => {
        return h(
          'div',
          { class: 'font-medium' },
          t('admin.location.building', {
            name: row.original.building.name,
          })
        );
      },
      header: () => t('admin.lodgments.columns.building'),
    },
    {
      accessorKey: 'floor',
      cell: ({ row }) => h('div', {}, formatFloor(row.getValue('floor'))),
      header: () => t('admin.lodgments.columns.floor'),
    },
    {
      accessorKey: 'roomNumber',
      cell: ({ row }) =>
        h(
          'div',
          {},
          t('admin.location.room', { number: row.getValue('roomNumber') })
        ),
      header: () => t('admin.lodgments.columns.roomNumber'),
    },
    {
      accessorKey: 'capacity',
      cell: ({ row }) => {
        const residents = row.original.residentsCount;
        const capacity = row.getValue('capacity');
        return h('div', {}, `${residents}/${capacity}`);
      },
      header: () => t('common.cards.capacity'),
    },
    {
      cell: ({ row }) => {
        const status = getLodgementOccupancyStatus(
          row.original.residentsCount,
          row.original.capacity
        );
        return h(OccupancyStatusBadge, {
          value: status,
        });
      },
      header: () => t('common.tables.status'),
      id: 'occupancyStatus',
    },
  ]);
}
