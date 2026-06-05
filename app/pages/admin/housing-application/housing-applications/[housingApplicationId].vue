<script setup lang="ts">
import type { HousingApplication } from '#imports';

import { useQuery } from '@pinia/colada';

import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import HousingApplicationContactCard from '~/features/admin/housing-applications/HousingApplicationContactCard.vue';
import HousingApplicationDocumentsCard from '~/features/admin/housing-applications/HousingApplicationDocumentsCard.vue';
import HousingApplicationLodgmentCard from '~/features/admin/housing-applications/HousingApplicationLodgmentCard.vue';
import HousingApplicationPersonalInfoCard from '~/features/admin/housing-applications/HousingApplicationPersonalInfoCard.vue';
import HousingApplicationScolariteCard from '~/features/admin/housing-applications/HousingApplicationScolariteCard.vue';
import UpdateHousingApplicationForm from '~/features/admin/housing-applications/UpdateHousingApplicationForm.vue';
import HousingApplicationStatusBadge from '~/features/shared/housing-applications/components/HousingApplicationStatusBadge.vue';
import { housingApplicationByIdQuery } from '~/features/shared/housing-applications/housing-application.query';

const route = useRoute();
const housingApplicationId = computed(
  () => route.params.housingApplicationId as string
);

const { state } = useQuery(() =>
  housingApplicationByIdQuery({ id: housingApplicationId.value })
);

const housingApplication = computed<null | Serialize<HousingApplication>>(
  () => state.value?.data ?? null
);
</script>

<template>
  <div class="container mx-auto p-2">
    <div class="mb-4">
      <Button variant="outline" size="sm" as-child>
        <NuxtLinkLocale
          :to="{ name: 'admin-housing-application-housing-applications' }"
        >
          <Icon name="mdi:arrow-left" />
          {{ $t('admin.housingApplications.backToList') }}
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
          <Skeleton class="h-64 w-full rounded-xl" />
        </div>
      </div>
    </template>

    <template v-else-if="housingApplication">
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <h1 class="text-2xl font-bold">
          {{ housingApplication.firstName }}
          {{ housingApplication.lastName }}
        </h1>
        <HousingApplicationStatusBadge :value="housingApplication.status" />
      </div>

      <div class="grid gap-4 lg:grid-cols-3">
        <div class="space-y-4 lg:col-span-2">
          <HousingApplicationPersonalInfoCard
            :housing-application="housingApplication"
          />
          <HousingApplicationContactCard
            :housing-application="housingApplication"
          />
          <HousingApplicationScolariteCard
            :housing-application="housingApplication"
          />
          <HousingApplicationDocumentsCard
            :housing-application="housingApplication"
          />
          <HousingApplicationLodgmentCard
            :housing-application="housingApplication"
          />
        </div>

        <div>
          <UpdateHousingApplicationForm
            :housing-application="housingApplication"
          />
        </div>
      </div>
    </template>

    <template v-else>
      <p class="text-muted-foreground mb-4">
        Cette demande est introuvable ou a été supprimée.
      </p>
      <Button variant="outline" as-child>
        <NuxtLinkLocale
          :to="{ name: 'admin-housing-application-housing-applications' }"
        >
          {{ $t('admin.housingApplications.backToList') }}
        </NuxtLinkLocale>
      </Button>
    </template>
  </div>
</template>
