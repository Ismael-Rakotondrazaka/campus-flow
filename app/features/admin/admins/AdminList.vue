<script setup lang="ts">
import type { Admin, AdminRole } from '#imports';

import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import {
  AdminConfig,
  AdminOrderBy,
  AdminRoleLabel,
  AdminRoles,
} from '#imports';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Skeleton } from '~/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { adminListQuery } from '~/features/shared/admins/admin.query';
import PaginationComponent from '~/features/shared/paginations/components/PaginationComponent.vue';

import AdminDeleteModal from './AdminDeleteModal.vue';
import { adminColumnsLength, useAdminColumns } from './useAdminColumns';

const page = useRouteQuery<number>('page', AdminConfig.PAGE_DEFAULT, {
  transform: Number,
});
const limit = useRouteQuery<number>('limit', AdminConfig.PAGE_SIZE_DEFAULT, {
  transform: Number,
});
const roleFilter = useRouteQuery<'all' | AdminRole>('role', 'all');

const { state } = useQuery(() =>
  adminListQuery({
    limit: limit.value,
    orderBy: AdminOrderBy.createdAt,
    page: page.value,
    role: roleFilter.value === 'all' ? undefined : roleFilter.value,
    sortOrder: SortOrder.desc,
  })
);

const admins = computed<Serialize<Admin>[]>(
  () => state.value?.data?.data ?? []
);
const totalCount = computed(() => state.value?.data?.count ?? 0);
const totalPages = computed(() =>
  Math.max(1, Math.ceil(totalCount.value / limit.value))
);

watch(totalPages, pages => {
  if (page.value > pages) {
    page.value = pages;
  }
});

watch(page, value => {
  if (!Number.isFinite(value) || value < AdminConfig.PAGE_DEFAULT) {
    page.value = AdminConfig.PAGE_DEFAULT;
  }
});

watch(limit, value => {
  if (!Number.isFinite(value) || value <= 0) {
    limit.value = AdminConfig.PAGE_SIZE_DEFAULT;
    return;
  }
  page.value = AdminConfig.PAGE_DEFAULT;
});

watch(roleFilter, () => {
  page.value = AdminConfig.PAGE_DEFAULT;
});

const adminToDelete = ref<null | Serialize<Admin>>(null);
const openDeleteModal = ref(false);

const handleDelete = (admin: Serialize<Admin>) => {
  adminToDelete.value = admin;
  openDeleteModal.value = true;
};

const handleDeleted = () => {
  adminToDelete.value = null;
};

const columns = useAdminColumns({ onDelete: handleDelete });

const table = useVueTable({
  get columns() {
    return columns.value;
  },
  data: admins,
  getCoreRowModel: getCoreRowModel(),
});
</script>

<template>
  <div class="w-full space-y-4">
    <div class="flex items-center gap-2">
      <Select v-model="roleFilter">
        <SelectTrigger class="w-64">
          <SelectValue :placeholder="$t('common.allRoles')" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">{{ $t('common.allRoles') }}</SelectItem>
            <SelectItem v-for="role in AdminRoles" :key="role" :value="role">
              {{ AdminRoleLabel[role] }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <p class="text-foreground text-base">
      {{ $t('common.results.countLabel') }}
      <span class="font-bold">{{ totalCount }}</span>
      {{ $t('admin.results.admin', totalCount) }}
    </p>

    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <template v-if="state.status === 'pending'">
            <TableRow v-for="i in 5" :key="`skeleton-${i}`">
              <TableCell v-for="j in adminColumnsLength" :key="j">
                <Skeleton class="h-4 w-28" />
              </TableCell>
            </TableRow>
          </template>

          <template v-else-if="table.getRowModel().rows?.length">
            <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell :colspan="adminColumnsLength" class="h-24 text-center">
              {{ $t('common.empty.noResults') }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <PaginationComponent
      v-if="admins.length"
      :limit="limit"
      :page="page"
      :total-count="totalCount"
      :total-pages="totalPages"
      @page-change="page = $event"
      @page-size-change="limit = $event"
    />

    <AdminDeleteModal
      v-if="adminToDelete"
      v-model:open="openDeleteModal"
      :admin="adminToDelete"
      @admin:deleted="handleDeleted"
    />
  </div>
</template>
