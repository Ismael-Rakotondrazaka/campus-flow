<script setup lang="ts">
import type { Resident } from '#imports';

import { useQuery } from '@pinia/colada';

import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import ResidentContactCard from '~/features/admin/residents/ResidentContactCard.vue';
import ResidentLodgmentCard from '~/features/admin/residents/ResidentLodgmentCard.vue';
import ResidentPersonalInfoCard from '~/features/admin/residents/ResidentPersonalInfoCard.vue';
import ResidentScolariteCard from '~/features/admin/residents/ResidentScolariteCard.vue';
import { residentByIdQuery } from '~/features/shared/residents/resident.query';

const route = useRoute();
const residentId = computed(() => route.params.residentId as string);

const { state } = useQuery(() => residentByIdQuery({ id: residentId.value }));

const resident = computed<null | Serialize<Resident>>(
  () => state.value?.data ?? null
);
</script>

<template>
  <div class="container mx-auto p-2">
    <div class="mb-4">
      <Button variant="outline" size="sm" as-child>
        <NuxtLinkLocale :to="{ name: 'admin-root-residents' }">
          <Icon name="mdi:arrow-left" />
          {{ $t('admin.residents.backToList') }}
        </NuxtLinkLocale>
      </Button>
    </div>

    <template v-if="state.status === 'pending'">
      <Skeleton class="mb-4 h-8 w-64" />
      <div class="grid gap-4 lg:grid-cols-3">
        <div class="space-y-4 lg:col-span-2">
          <Skeleton class="h-40 w-full rounded-xl" />
          <Skeleton class="h-28 w-full rounded-xl" />
          <Skeleton class="h-28 w-full rounded-xl" />
        </div>
        <div>
          <Skeleton class="h-40 w-full rounded-xl" />
        </div>
      </div>
    </template>

    <template v-else-if="resident">
      <h1 class="mb-4 text-2xl font-bold">
        {{ resident.firstName }} {{ resident.lastName }}
      </h1>

      <div class="grid gap-4 lg:grid-cols-3">
        <div class="space-y-4 lg:col-span-2">
          <ResidentPersonalInfoCard :resident="resident" />
          <ResidentContactCard :resident="resident" />
          <ResidentScolariteCard :resident="resident" />
        </div>

        <div>
          <ResidentLodgmentCard :resident="resident" />
        </div>
      </div>
    </template>

    <template v-else>
      <p class="text-muted-foreground mb-4">
        Ce résident est introuvable ou a été supprimé.
      </p>
      <Button variant="outline" as-child>
        <NuxtLinkLocale :to="{ name: 'admin-root-residents' }">
          {{ $t('admin.residents.backToList') }}
        </NuxtLinkLocale>
      </Button>
    </template>
  </div>
</template>
