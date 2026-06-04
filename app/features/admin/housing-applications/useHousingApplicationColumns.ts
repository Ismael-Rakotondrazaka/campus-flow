import type { ColumnDef } from '@tanstack/vue-table';

import { formatDate } from '@vueuse/core';
import { Icon, NuxtLinkLocale } from '#components';
import {
  HOUSING_APPLICATION_DOCUMENTS_BUCKET,
  type HousingApplication,
} from '#shared/features/housing-applications';

import HousingApplicationStatusBadge from '~/features/shared/housing-applications/components/HousingApplicationStatusBadge.vue';
import SignedUrlAvatar from '~/features/shared/users/components/SignedUrlAvatar.vue';
import { getUserFullname } from '~/features/shared/users/composables/useUserFullname';

export const housingApplicationColumnsLength = 7;

export function useHousingApplicationColumns() {
  const { locale, t } = useI18n();

  return computed((): ColumnDef<Serialize<HousingApplication>>[] => [
    {
      accessorKey: 'imageUrl',
      cell: ({ row }) => {
        const { firstName, imageUrl, lastName } = row.original;
        return h(SignedUrlAvatar, {
          bucket: HOUSING_APPLICATION_DOCUMENTS_BUCKET,
          firstName,
          imageUrl,
          lastName,
        });
      },
      enableSorting: false,
      header: () => t('common.tables.photo'),
    },
    {
      accessorFn: row => getUserFullname(row),
      cell: ({ row }) => {
        const fullname = getUserFullname(row.original);
        return h('div', { class: 'font-medium' }, fullname);
      },
      header: () => t('common.tables.fullName'),
      id: 'fullname',
    },
    {
      accessorKey: 'email',
      cell: ({ row }) =>
        h('div', { class: 'lowercase' }, row.getValue('email')),
      header: () => t('common.tables.email'),
    },
    {
      accessorKey: 'phoneNumber',
      cell: ({ row }) => h('div', {}, row.getValue('phoneNumber')),
      header: () => t('common.tables.phone'),
    },
    {
      accessorKey: 'status',
      cell: ({ row }) =>
        h(HousingApplicationStatusBadge, {
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
          formatDate(date, 'DD/MM/YYYY HH:mm', {
            locales: locale.value,
          })
        );
      },
      header: () => t('common.tables.submittedAt'),
    },
    {
      cell: ({ row }) => {
        const housingApplicationId = row.original.id;
        return h(
          NuxtLinkLocale,
          {
            class:
              'inline-flex w-full items-center justify-center hover:text-blue-600',
            title: t('common.buttons.viewDetails'),
            to: {
              name: 'admin-root-housing-applications-housingApplicationId',
              params: {
                housingApplicationId: housingApplicationId,
              },
            },
          },
          () =>
            h(Icon, {
              class: 'inline-block',
              name: 'mdi:eye',
              size: '1.2rem',
            })
        );
      },
      enableHiding: false,
      enableSorting: false,
      header: () => t('common.tables.action'),
      id: 'view',
    },
  ]);
}
