<script setup lang="ts">
import type { Renewal } from '#imports';

import { useQuery } from '@pinia/colada';

import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import RenewalContactCard from '~/features/admin/renewals/RenewalContactCard.vue';
import RenewalDocumentsCard from '~/features/admin/renewals/RenewalDocumentsCard.vue';
import RenewalPersonalInfoCard from '~/features/admin/renewals/RenewalPersonalInfoCard.vue';
import RenewalScolariteCard from '~/features/admin/renewals/RenewalScolariteCard.vue';
import UpdateRenewalForm from '~/features/admin/renewals/UpdateRenewalForm.vue';
import RenewalStatusBadge from '~/features/shared/renewals/components/RenewalStatusBadge.vue';
import { renewalByIdQuery } from '~/features/shared/renewals/renewal.query';

const route = useRoute();
const renewalId = computed(() => route.params.renewalId as string);

const { state } = useQuery(() => renewalByIdQuery({ id: renewalId.value }));

const renewal = computed<null | Serialize<Renewal>>(
  () => state.value?.data ?? null
);
</script>

<template>
  <div class="container mx-auto p-2">
    <div class="mb-4">
      <Button variant="outline" size="sm" as-child>
        <NuxtLinkLocale :to="{ name: 'admin-renewal-renewals' }">
          <Icon name="mdi:arrow-left" />
          {{ $t('admin.renewals.backToList') }}
        </NuxtLinkLocale>
      </Button>
    </div>

    <template v-if="state.status === 'pending'">
      <div class="mb-4 flex items-center gap-4">
        <Skeleton class="h-8 w-64" />
        <Skeleton class="h-6 w-20" />
      </div>
      <div class="grid gap-4 lg:grid-cols-3">
        <div class="space-y-4 lg:col-span-2">
          <Skeleton class="h-40 w-full rounded-xl" />
          <Skeleton class="h-32 w-full rounded-xl" />
          <Skeleton class="h-28 w-full rounded-xl" />
          <Skeleton class="h-28 w-full rounded-xl" />
        </div>
        <div>
          <Skeleton class="h-48 w-full rounded-xl" />
        </div>
      </div>
    </template>

    <template v-else-if="renewal">
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <h1 class="text-2xl font-bold">
          {{ renewal.resident.firstName }}
          {{ renewal.resident.lastName }}
        </h1>
        <RenewalStatusBadge :value="renewal.status" />
      </div>

      <div class="grid gap-4 lg:grid-cols-3">
        <div class="space-y-4 lg:col-span-2">
          <RenewalPersonalInfoCard :renewal="renewal" />
          <RenewalContactCard :renewal="renewal" />
          <RenewalScolariteCard :renewal="renewal" />
          <RenewalDocumentsCard :renewal="renewal" />
        </div>

        <div>
          <UpdateRenewalForm :renewal="renewal" />
        </div>
      </div>
    </template>

    <template v-else>
      <p class="text-muted-foreground mb-4">
        Ce renouvellement est introuvable ou a été supprimé.
      </p>
      <Button variant="outline" as-child>
        <NuxtLinkLocale :to="{ name: 'admin-renewal-renewals' }">
          {{ $t('admin.renewals.backToList') }}
        </NuxtLinkLocale>
      </Button>
    </template>
  </div>
</template>
