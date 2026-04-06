import type { ColumnDef } from '@tanstack/vue-table';

import { Icon, NuxtLink } from '#components';

import type { Resident } from '~/features/shared/residents/resident.model';

import SignedUrlAvatar from '~/features/shared/users/components/SignedUrlAvatar.vue';
import { getUserFullname } from '~/features/shared/users/composables/useUserFullname';

export const residentColumnsLength: number = 6;

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

export const residentColumns = (params: {
  getGlobalAcademicSessionId: () => string | undefined;
}): ColumnDef<Resident>[] => [
  {
    accessorKey: 'image_url',
    cell: ({ row }) => {
      const { first_name, image_url, last_name } = row.original;
      return h(SignedUrlAvatar, {
        firstName: first_name,
        imageUrl: image_url,
        lastName: last_name,
      });
    },
    enableSorting: false,
    header: 'Photo',
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
    accessorFn: row => {
      if (!row.lodgment) return 'N/A';

      return `Bâtiment ${row.lodgment.building.name} - ${getOrdinalFloor(row.lodgment.floor)} - Porte ${row.lodgment.room_number}`;
    },
    cell: ({ row }) => {
      if (!row.original.lodgment) return h('div', {}, 'N/A');

      return h(
        'div',
        {},
        `Bâtiment ${row.original.lodgment.building.name} - ${getOrdinalFloor(row.original.lodgment.floor)} - Porte ${row.original.lodgment.room_number}`
      );
    },
    header: 'Localisation',
    id: 'lodgment',
  },
  {
    cell: ({ row }) => {
      const residentId = row.original.id;
      return h(
        NuxtLink,
        {
          class:
            'inline-flex w-full items-center justify-center hover:text-blue-600',
          title: 'Voir les détails',
          to: {
            name: 'admin-root-residents-residentId',
            params: {
              residentId: residentId,
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
