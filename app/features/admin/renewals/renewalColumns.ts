import type { ColumnDef } from '@tanstack/vue-table';

import { formatDate } from '@vueuse/core';
import { Icon, NuxtLink } from '#components';

import type { Renewal } from '~/features/shared/renewals/renewal.model';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import RenewalStatusBadge from '~/features/shared/renewals/components/RenewalStatusBadge.vue';
import { getUserFullname } from '~/features/shared/users/composables/useUserFullname';
import { formatUserImageUrl } from '~/features/shared/users/composables/useUserImageUrl';

export const renewalColumnsLength: number = 6;

export const renewalColumns: ColumnDef<Renewal>[] = [
  {
    accessorKey: 'image_url',
    cell: ({ row }) => {
      const renewal = row.original;
      const imageUrl = formatUserImageUrl(renewal.resident);
      const fullname = getUserFullname(renewal.resident);
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
      const fullname = getUserFullname(row.resident);
      return fullname;
    },
    cell: ({ row }) => {
      const fullname = getUserFullname(row.original.resident);
      return h('div', { class: 'font-medium' }, fullname);
    },
    header: 'Nom et prénom',
    id: 'fullname',
  },
  {
    accessorFn: row => row.resident.phone_number,
    cell: ({ row }) => h('div', {}, row.original.resident.phone_number),
    header: 'Téléphone',
    id: 'phone_number',
  },
  {
    accessorKey: 'status',
    cell: ({ row }) =>
      h(RenewalStatusBadge, {
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
    header: "Date d'envoi",
  },
  {
    cell: ({ row }) => {
      const renewalId = row.original.id;
      return h(
        NuxtLink,
        {
          class:
            'inline-flex w-full items-center justify-center hover:text-blue-600',
          title: 'Voir les détails',
          to: {
            name: 'admin-root-renewals-renewalId',
            params: {
              renewalId: renewalId,
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
