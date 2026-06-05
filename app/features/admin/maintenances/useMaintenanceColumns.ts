import type { ColumnDef } from '@tanstack/vue-table';
import type { Maintenance } from '#imports';

import { formatDate } from '@vueuse/core';
import { Icon, NuxtLinkLocale } from '#components';

import { useAdminFloorLabel } from '~/features/admin/composables/useAdminFloorLabel';
import MaintenanceStatusBadge from '~/features/shared/maintenances/components/MaintenanceStatusBadge.vue';
import MaintenanceTypeBadge from '~/features/shared/maintenances/components/MaintenanceTypeBadge.vue';
import SignedUrlAvatar from '~/features/shared/users/components/SignedUrlAvatar.vue';

export const maintenanceColumnsLength = 6;

export function useMaintenanceColumns() {
  const { locale, t } = useI18n();
  const { formatLocationLine } = useAdminFloorLabel();

  return computed((): ColumnDef<Serialize<Maintenance>>[] => [
    {
      accessorKey: 'type',
      cell: ({ row }) =>
        h(MaintenanceTypeBadge, {
          value: row.original.type,
        }),
      header: () => t('common.cards.type'),
    },
    {
      accessorKey: 'lodgment',
      cell: ({ row }) => {
        const { building, floor, roomNumber } = row.original.lodgment;
        return h(
          'div',
          {},
          formatLocationLine(building.name, floor, roomNumber)
        );
      },
      header: () => t('common.cards.location'),
      id: 'location',
    },
    {
      accessorKey: 'maintainers',
      cell: ({ row }) => {
        const maintenance = row.original;
        const maintainers = maintenance.maintenanceMaintainers.map(
          maintenanceMaintainer => maintenanceMaintainer.maintainer
        );

        if (maintainers.length === 0) {
          return h(
            'div',
            { class: 'text-gray-400 text-sm' },
            t('admin.tables.noMaintainer')
          );
        }

        const displayedMaintainers = maintainers.slice(0, 3);
        const remainingCount = maintainers.length - 3;

        return h(
          'div',
          {
            class: 'flex items-center gap-2',
          },
          [
            h(
              'div',
              {
                class:
                  'flex -space-x-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale',
              },
              displayedMaintainers.map(maintainer =>
                h(SignedUrlAvatar, {
                  bucket: MAINTAINER_PROFILES_BUCKET,
                  dataSlot: 'avatar',
                  firstName: maintainer.firstName,
                  imageUrl: maintainer.imageUrl,
                  lastName: maintainer.lastName,
                })
              )
            ),
            remainingCount > 0
              ? h(
                  'span',
                  { class: 'text-sm text-gray-500' },
                  `+${remainingCount}`
                )
              : null,
          ]
        );
      },
      enableSorting: false,
      header: () => t('admin.tables.maintainers'),
    },
    {
      accessorKey: 'status',
      cell: ({ row }) =>
        h(MaintenanceStatusBadge, {
          value: row.original.status,
        }),
      header: () => t('common.tables.status'),
    },
    {
      accessorKey: 'createdAt',
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'));
        return h(
          'div',
          {},
          formatDate(date, 'DD/MM/YYYY', { locales: locale.value })
        );
      },
      header: () => t('common.cards.reportedAt'),
    },
    {
      cell: ({ row }) => {
        const maintenanceId = row.original.id;
        return h(
          NuxtLinkLocale,
          {
            class:
              'inline-flex w-full items-center justify-center hover:text-blue-600',
            title: t('common.buttons.viewDetails'),
            to: {
              name: 'admin-root-maintenances-maintenanceId',
              params: {
                maintenanceId: maintenanceId,
              },
            },
          },
          () =>
            h(Icon, { class: 'inline-block', name: 'mdi:eye', size: '1.2rem' })
        );
      },
      enableHiding: false,
      enableSorting: false,
      header: () => t('common.tables.action'),
      id: 'view',
    },
  ]);
}
