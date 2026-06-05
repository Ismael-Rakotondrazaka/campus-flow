<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

import { computed } from 'vue';

import {
  Pagination as Pagination_,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination';
import { cn } from '~/lib/utils';

interface Props {
  class?: HTMLAttributes['class'];
  compact?: boolean;
  limit: number;
  limitOptions?: number[];
  page: number;
  siblingCount?: number;
  totalCount: number;
  totalPages: number;
}

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  compact: false,
  limitOptions: () => [10, 20, 25, 50, 100],
  siblingCount: 1,
});

const emit = defineEmits<{
  pageChange: [page: number];
  pageSizeChange: [size: number];
}>();

const { t } = useI18n();

const pageInfo = computed(() =>
  t('common.pagination.pageOf', {
    page: props.page,
    total: props.totalPages,
  })
);

const options = computed(() =>
  Array.from(new Set([props.limit, ...props.limitOptions])).sort(
    (a, b) => a - b
  )
);

function onPageChange(page: number) {
  emit('pageChange', page);
}

function onPageSizeChange(value: unknown) {
  if (value != null && value !== '') emit('pageSizeChange', Number(value));
}
</script>

<template>
  <div
    :class="
      cn('flex flex-wrap items-center justify-between gap-4', props.class)
    "
  >
    <div class="flex flex-wrap items-center gap-4">
      <div class="flex items-center gap-2">
        <Select
          :model-value="String(limit)"
          @update:model-value="onPageSizeChange"
        >
          <SelectTrigger id="rows-per-page" class="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              <SelectItem v-for="n in options" :key="n" :value="String(n)">
                {{ n }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <p v-if="!compact" class="text-muted-foreground text-sm">
        {{ pageInfo }}
      </p>
    </div>

    <Pagination_
      class="mx-0 w-auto"
      :items-per-page="limit"
      :page="page"
      :sibling-count="siblingCount"
      :total="totalCount"
      @update:page="onPageChange"
    >
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious />
        <template v-for="(item, i) in items" :key="i">
          <PaginationItem
            v-if="item.type === 'page'"
            :is-active="item.value === page"
            :value="item.value"
          >
            {{ item.value }}
          </PaginationItem>
          <PaginationEllipsis v-else :index="i" />
        </template>
        <PaginationNext />
      </PaginationContent>
    </Pagination_>
  </div>
</template>
