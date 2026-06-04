<script setup lang="ts">
import type { Renewal } from '#imports';

import { useQuery } from '@pinia/colada';
import { RenewalConfig, RenewalOrderBy, SortOrder } from '#imports';

import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import RenewalStatusBadge from '~/features/shared/renewals/components/RenewalStatusBadge.vue';
import { renewalListQuery } from '~/features/shared/renewals/renewal.query';

const { user: authUser } = useUserSession();
const { locale, t } = useI18n();

const residentId = computed(() => authUser.value!.id);

const dateLocale = computed(() => (locale.value === 'fr' ? 'fr-FR' : 'en-US'));

const page = useRouteQuery<number>('page', RenewalConfig.PAGE_DEFAULT, {
  transform: Number,
});
const limit = useRouteQuery<number>('limit', RenewalConfig.PAGE_SIZE_DEFAULT, {
  transform: Number,
});

const { state } = useQuery(() =>
  renewalListQuery({
    limit: limit.value,
    orderBy: RenewalOrderBy.createdAt,
    page: page.value,
    residentId: residentId.value,
    sortOrder: SortOrder.desc,
  })
);

const renewals = computed<Serialize<Renewal>[]>(
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

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(dateLocale.value, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
</script>

<template>
  <div class="w-full">
    <div class="mb-4 flex items-center justify-end">
      <Button as-child>
        <NuxtLinkLocale :to="{ name: 'resident-renewals-create' }">
          <Icon name="mdi:plus" class="mr-1" />
          {{ t('resident.renewals.renewCta') }}
        </NuxtLinkLocale>
      </Button>
    </div>

    <p class="text-foreground mb-2 text-base">
      {{ t('common.results.countLabel') }}
      <span class="font-bold">{{ totalCount }}</span>
    </p>

    <div class="mb-4 rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              {{ t('resident.renewals.table.academicSession') }}
            </TableHead>
            <TableHead>{{ t('resident.renewals.table.faculty') }}</TableHead>
            <TableHead>{{ t('common.cards.status') }}</TableHead>
            <TableHead>
              {{ t('resident.renewals.table.submittedAt') }}
            </TableHead>
            <TableHead>{{ t('common.tables.action') }}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <template v-if="state.status === 'pending'">
            <TableRow v-for="i in 5" :key="`skeleton-${i}`">
              <TableCell><Skeleton class="h-4 w-36" /></TableCell>
              <TableCell><Skeleton class="h-4 w-28" /></TableCell>
              <TableCell><Skeleton class="h-5 w-20 rounded-full" /></TableCell>
              <TableCell><Skeleton class="h-4 w-24" /></TableCell>
              <TableCell><Skeleton class="h-4 w-8" /></TableCell>
            </TableRow>
          </template>

          <template v-else-if="renewals.length > 0">
            <TableRow v-for="renewal in renewals" :key="renewal.id">
              <TableCell class="font-medium">
                {{ formatDate(renewal.academicSession.startAt) }}
                –
                {{ formatDate(renewal.academicSession.endAt) }}
              </TableCell>
              <TableCell>{{ renewal.faculty.name }}</TableCell>
              <TableCell>
                <RenewalStatusBadge :value="renewal.status" />
              </TableCell>
              <TableCell>{{ formatDate(renewal.createdAt) }}</TableCell>
              <TableCell>
                <NuxtLinkLocale
                  class="inline-flex items-center justify-center hover:text-blue-600"
                  :title="t('common.buttons.viewDetails')"
                  :to="{
                    name: 'resident-renewals-renewalId',
                    params: { renewalId: renewal.id },
                  }"
                >
                  <Icon name="mdi:eye" size="1.2rem" />
                </NuxtLinkLocale>
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell colspan="5" class="h-24 text-center">
              {{ t('resident.renewals.listEmptyShort') }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
