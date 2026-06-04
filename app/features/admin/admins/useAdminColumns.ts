import type { ColumnDef } from '@tanstack/vue-table';
import type { Admin } from '#shared/features/admins';

import { Icon, NuxtLinkLocale } from '#components';

import AdminRoleBadge from '~/features/shared/admins/components/AdminRoleBadge.vue';

export const adminColumnsLength = 4;

export function useAdminColumns(params: {
  onDelete: (admin: Serialize<Admin>) => void;
}) {
  const { t } = useI18n();

  return computed((): ColumnDef<Serialize<Admin>>[] => [
    {
      accessorFn: row => `${row.firstName} ${row.lastName}`,
      cell: ({ row }) =>
        h('div', { class: 'font-medium' }, [
          h('span', {}, `${row.original.firstName} ${row.original.lastName}`),
        ]),
      header: () => t('admin.tables.name'),
      id: 'name',
    },
    {
      accessorKey: 'role',
      cell: ({ row }) => h(AdminRoleBadge, { value: row.original.role }),
      header: () => t('admin.tables.role'),
    },
    {
      accessorKey: 'phoneNumber',
      cell: ({ row }) => h('div', {}, row.original.phoneNumber),
      header: () => t('common.tables.phone'),
    },
    {
      cell: ({ row }) => {
        const admin = row.original;
        return h('div', { class: 'flex items-center gap-1' }, [
          h(
            NuxtLinkLocale,
            {
              class:
                'inline-flex items-center justify-center rounded-md p-1 hover:text-blue-600',
              title: t('common.buttons.edit'),
              to: {
                name: 'admin-root-admins-adminId-edit',
                params: { adminId: admin.id },
              },
            },
            () => h(Icon, { name: 'mdi:pencil', size: '1.1rem' })
          ),
          h(
            'button',
            {
              class:
                'inline-flex items-center justify-center rounded-md p-1 hover:text-red-600',
              onClick: () => params.onDelete(admin),
              title: t('common.buttons.delete'),
            },
            () => h(Icon, { name: 'mdi:delete', size: '1.1rem' })
          ),
        ]);
      },
      enableHiding: false,
      enableSorting: false,
      header: () => t('common.tables.actions'),
      id: 'actions',
    },
  ]);
}
