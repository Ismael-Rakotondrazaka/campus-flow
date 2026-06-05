import type { ColumnDef } from '@tanstack/vue-table';
import type { Renewal } from '#imports';

import { formatDate } from '@vueuse/core';
import { Icon, NuxtLinkLocale } from '#components';

import { Avatar, AvatarImage } from '~/components/ui/avatar';
import RenewalStatusBadge from '~/features/shared/renewals/components/RenewalStatusBadge.vue';
import { getUserFullname } from '~/features/shared/users/composables/useUserFullname';
import { formatUserImageUrl } from '~/features/shared/users/composables/useUserImageUrl';

export const renewalColumnsLength = 6;

export function useRenewalColumns() {
  const { locale, t } = useI18n();

  return computed((): ColumnDef<Serialize<Renewal>>[] => [
    {
      accessorKey: 'imageUrl',
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
      header: () => t('admin.tables.avatar'),
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
      header: () => t('common.tables.fullName'),
      id: 'fullname',
    },
    {
      accessorFn: row => row.resident.phoneNumber,
      cell: ({ row }) => h('div', {}, row.original.resident.phoneNumber),
      header: () => t('common.tables.phone'),
      id: 'phoneNumber',
    },
    {
      accessorKey: 'status',
      cell: ({ row }) =>
        h(RenewalStatusBadge, {
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
      header: () => t('common.tables.submittedAt'),
    },
    {
      cell: ({ row }) => {
        const renewalId = row.original.id;
        return h(
          NuxtLinkLocale,
          {
            class:
              'inline-flex w-full items-center justify-center hover:text-blue-600',
            title: t('common.buttons.viewDetails'),
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
      header: () => t('common.tables.action'),
      id: 'view',
    },
  ]);
}
