import type { ColumnDef } from '@tanstack/vue-table';
import type { AcademicSession } from '#shared/features/academic-sessions';

import { Icon, NuxtLinkLocale } from '#components';

export const academicSessionColumnsLength = 5;

export function useAcademicSessionColumns(params: {
  onDelete: (session: Serialize<AcademicSession>) => void;
}) {
  const { locale, t } = useI18n();

  const formatDate = (date: Date | string) =>
    new Date(date).toLocaleDateString(locale.value, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  return computed((): ColumnDef<Serialize<AcademicSession>>[] => [
    {
      accessorFn: row =>
        `${formatDate(row.startAt)} → ${formatDate(row.endAt)}`,
      cell: ({ row }) =>
        h('div', { class: 'font-medium' }, [
          h('span', {}, formatDate(row.original.startAt)),
          h('span', { class: 'text-muted-foreground' }, ' → '),
          h('span', {}, formatDate(row.original.endAt)),
        ]),
      header: () => t('admin.academicSessions.columns.period'),
      id: 'period',
    },
    {
      accessorFn: row =>
        `${formatDate(row.applicationOpenAt)} → ${formatDate(row.applicationCloseAt)}`,
      cell: ({ row }) =>
        h('div', {}, [
          h('span', {}, formatDate(row.original.applicationOpenAt)),
          h('span', { class: 'text-muted-foreground' }, ' → '),
          h('span', {}, formatDate(row.original.applicationCloseAt)),
        ]),
      header: () => t('admin.academicSessions.columns.applications'),
      id: 'application_period',
    },
    {
      accessorFn: row =>
        `${formatDate(row.renewalOpenAt)} → ${formatDate(row.renewalCloseAt)}`,
      cell: ({ row }) =>
        h('div', {}, [
          h('span', {}, formatDate(row.original.renewalOpenAt)),
          h('span', { class: 'text-muted-foreground' }, ' → '),
          h('span', {}, formatDate(row.original.renewalCloseAt)),
        ]),
      header: () => t('admin.academicSessions.columns.renewals'),
      id: 'renewal_period',
    },
    {
      accessorKey: 'createdAt',
      cell: ({ row }) => h('div', {}, formatDate(row.original.createdAt)),
      header: () => t('admin.academicSessions.columns.createdAt'),
    },
    {
      cell: ({ row }) => {
        const session = row.original;
        return h('div', { class: 'flex items-center gap-1' }, [
          h(
            NuxtLinkLocale,
            {
              class:
                'inline-flex items-center justify-center rounded-md p-1 hover:text-blue-600',
              title: t('common.buttons.edit'),
              to: {
                name: 'admin-root-academic-sessions-academicSessionId-edit',
                params: { academicSessionId: session.id },
              },
            },
            () => h(Icon, { name: 'mdi:pencil', size: '1.1rem' })
          ),
          h(
            'button',
            {
              class:
                'inline-flex items-center justify-center rounded-md p-1 hover:text-red-600',
              onClick: () => params.onDelete(session),
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
