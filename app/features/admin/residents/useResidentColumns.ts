import type { ColumnDef } from '@tanstack/vue-table';
import type { Resident } from '#imports';

import { Icon, NuxtLinkLocale } from '#components';

import { useAdminFloorLabel } from '~/features/admin/composables/useAdminFloorLabel';
import SignedUrlAvatar from '~/features/shared/users/components/SignedUrlAvatar.vue';
import { getUserFullname } from '~/features/shared/users/composables/useUserFullname';

export const residentColumnsLength = 6;

export function useResidentColumns() {
  const { t } = useI18n();
  const { formatLocationLine } = useAdminFloorLabel();

  return computed((): ColumnDef<Serialize<Resident>>[] => [
    {
      accessorKey: 'imageUrl',
      cell: ({ row }) => {
        const { firstName, imageUrl, lastName } = row.original;
        return h(SignedUrlAvatar, {
          firstName: firstName,
          imageUrl: imageUrl,
          lastName: lastName,
        });
      },
      enableSorting: false,
      header: () => t('common.tables.photo'),
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
      accessorFn: row => {
        if (!row.lodgment) {
          return t('common.empty.notAvailable');
        }

        return formatLocationLine(
          row.lodgment.building.name,
          row.lodgment.floor,
          row.lodgment.roomNumber
        );
      },
      cell: ({ row }) => {
        if (!row.original.lodgment) {
          return h('div', {}, t('common.empty.notAvailable'));
        }

        return h(
          'div',
          {},
          formatLocationLine(
            row.original.lodgment.building.name,
            row.original.lodgment.floor,
            row.original.lodgment.roomNumber
          )
        );
      },
      header: () => t('common.cards.location'),
      id: 'lodgment',
    },
    {
      cell: ({ row }) => {
        const residentId = row.original.id;
        return h(
          NuxtLinkLocale,
          {
            class:
              'inline-flex w-full items-center justify-center hover:text-blue-600',
            title: t('common.buttons.viewDetails'),
            to: {
              name: 'admin-root-residents-residentId',
              params: {
                residentId: residentId,
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
