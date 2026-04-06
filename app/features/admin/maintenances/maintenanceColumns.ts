import type { ColumnDef } from '@tanstack/vue-table';

import { formatDate } from '@vueuse/core';
import { Icon, NuxtLink } from '#components';

import type { Maintenance } from '~/features/shared/maintenances/maintenance.model';

import { MAINTAINER_PROFILES_BUCKET } from '~/features/shared/maintainers/maintainer.config';
import MaintenanceStatusBadge from '~/features/shared/maintenances/components/MaintenanceStatusBadge.vue';
import MaintenanceTypeBadge from '~/features/shared/maintenances/components/MaintenanceTypeBadge.vue';
import SignedUrlAvatar from '~/features/shared/users/components/SignedUrlAvatar.vue';

export const maintenanceColumnsLength: number = 6;

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

export const maintenanceColumns = (params: {
  getGlobalAcademicSessionId: () => string | undefined;
}): ColumnDef<Maintenance>[] => [
  {
    accessorKey: 'type',
    cell: ({ row }) =>
      h(MaintenanceTypeBadge, {
        value: row.original.type,
      }),
    header: 'Type',
  },
  {
    accessorKey: 'lodgment',
    cell: ({ row }) => {
      return h(
        'div',
        {},
        `Bâtiment ${row.original.lodgment.building.name} - ${getOrdinalFloor(row.original.lodgment.floor)} - Porte ${row.original.lodgment.room_number}`
      );
    },
    header: 'Localisation',
    id: 'location',
  },
  {
    accessorKey: 'maintainers',
    cell: ({ row }) => {
      const maintenance = row.original;
      const maintainers = maintenance.maintainers ?? [];

      if (maintainers.length === 0) {
        return h('div', { class: 'text-gray-400 text-sm' }, 'Aucun mainteneur');
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
            displayedMaintainers.map(m =>
              h(SignedUrlAvatar, {
                bucket: MAINTAINER_PROFILES_BUCKET,
                dataSlot: 'avatar',
                firstName: m.maintainer.first_name,
                imageUrl: m.maintainer.image_url,
                lastName: m.maintainer.last_name,
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
    header: 'Mainteneurs',
  },
  {
    accessorKey: 'status',
    cell: ({ row }) =>
      h(MaintenanceStatusBadge, {
        value: row.original.status,
      }),
    header: 'Statut',
  },
  {
    accessorKey: 'created_at',
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'));
      return h('div', {}, formatDate(date, 'DD/MM/YYYY', { locales: 'fr' }));
    },
    header: 'Date de signalement',
  },
  {
    cell: ({ row }) => {
      const maintenanceId = row.original.id;
      return h(
        NuxtLink,
        {
          class:
            'inline-flex w-full items-center justify-center hover:text-blue-600',
          title: 'Voir les détails',
          to: {
            name: 'admin-root-maintenances-maintenanceId',
            params: {
              maintenanceId: maintenanceId,
            },
            query: {
              g_academic_session_id: params.getGlobalAcademicSessionId(),
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
