<script setup lang="ts">
import type { Faculty } from '#imports';

import { FacultyConfig } from '#imports';

import { Skeleton } from '~/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { facultyListQuery } from '~/features/shared/faculties/faculty.query';
import PaginationComponent from '~/features/shared/paginations/components/PaginationComponent.vue';

const page = useRouteQuery<number>('page', FacultyConfig.PAGE_DEFAULT, {
  transform: Number,
});
const limit = useRouteQuery<number>('limit', FacultyConfig.PAGE_SIZE_DEFAULT, {
  transform: Number,
});
const search = useRouteQuery<string>('search', '');

const { state } = useQuery(() =>
  facultyListQuery({
    limit: limit.value,
    orderBy: 'name',
    page: page.value,
    search: search.value || undefined,
  })
);

const faculties = computed(() => state.value?.data?.data ?? ([] as Faculty[]));
const totalCount = computed(() => state.value?.data?.count ?? 0);
const totalPages = computed(() =>
  Math.max(1, Math.ceil(totalCount.value / limit.value))
);

watch(totalPages, pages => {
  if (page.value > pages) {
    page.value = pages;
  }
});

watch(search, () => {
  page.value = FacultyConfig.PAGE_DEFAULT;
});

watch(page, value => {
  if (!Number.isFinite(value) || value < FacultyConfig.PAGE_DEFAULT) {
    page.value = FacultyConfig.PAGE_DEFAULT;
  }
});

watch(limit, value => {
  if (!Number.isFinite(value) || value <= 0) {
    limit.value = FacultyConfig.PAGE_SIZE_DEFAULT;
    return;
  }
  page.value = FacultyConfig.PAGE_DEFAULT;
});
</script>

<template>
  <div class="w-full space-y-4">
    <div class="flex items-center justify-between gap-2">
      <Input
        v-model="search"
        type="text"
        :placeholder="$t('common.search.placeholderFaculty')"
        class="max-w-xs"
      />
    </div>

    <p class="text-foreground text-base">
      {{ $t('common.results.countLabel') }}
      <span class="font-bold">{{ totalCount }}</span>
      {{ $t('admin.results.faculty', totalCount) }}
    </p>

    <template v-if="state.status === 'pending'">
      <div class="space-y-2">
        <Skeleton v-for="i in 6" :key="`skeleton-${i}`" class="h-10 w-full" />
      </div>
    </template>

    <template v-else-if="faculties.length">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{{ $t('admin.tables.name') }}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="faculty in faculties" :key="faculty.id">
            <TableCell class="font-medium">{{ faculty.name }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </template>

    <template v-else>
      <div
        class="rounded-md border border-dashed border-gray-300 py-12 text-center"
      >
        <p class="text-gray-500">{{ $t('common.empty.noFaculty') }}</p>
      </div>
    </template>

    <PaginationComponent
      v-if="faculties.length"
      :limit="limit"
      :page="page"
      :total-count="totalCount"
      :total-pages="totalPages"
      @page-change="page = $event"
      @page-size-change="limit = $event"
    />
  </div>
</template>
