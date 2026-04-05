import type { ColumnDef } from '@tanstack/vue-table';

import { formatDate } from '@vueuse/core';
import { Icon, NuxtLink } from '#components';

import type { HousingApplication } from '~/features/shared/housing-applications/housing-application.model';

import HousingApplicationAvatar from '@/features/shared/housing-applications/components/HousingApplicationAvatar.vue';
import HousingApplicationStatusBadge from '@/features/shared/housing-applications/components/HousingApplicationStatusBadge.vue';
import { getUserFullname } from '~/features/shared/users/composables/useUserFullname';

export const housingApplicationColumns = (params: {
  getGlobalAcademicSessionId: () => string | undefined;
}): ColumnDef<HousingApplication>[] => [
  {
    accessorKey: 'image_url',
    cell: ({ row }) => {
      const { first_name, image_url, last_name } = row.original;
      return h(HousingApplicationAvatar, {
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
    accessorKey: 'status',
    cell: ({ row }) =>
      h(HousingApplicationStatusBadge, {
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
      const housingApplicationId = row.original.id;
      return h(
        NuxtLink,
        {
          class:
            'inline-flex w-full items-center justify-center hover:text-blue-600',
          title: 'Voir les détails',
          to: {
            name: 'admin-root-housing-applications-housingApplicationId',
            params: {
              housingApplicationId: housingApplicationId,
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
