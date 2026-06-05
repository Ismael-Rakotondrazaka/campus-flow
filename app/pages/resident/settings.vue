<script setup lang="ts">
import type { Resident } from '#imports';

import { Skeleton } from '~/components/ui/skeleton';
import ResidentContactCard from '~/features/admin/residents/ResidentContactCard.vue';
import ResidentLodgmentCard from '~/features/admin/residents/ResidentLodgmentCard.vue';
import ResidentPersonalInfoCard from '~/features/admin/residents/ResidentPersonalInfoCard.vue';
import ResidentScolariteCard from '~/features/admin/residents/ResidentScolariteCard.vue';
import { residentByIdQuery } from '~/features/shared/residents/resident.query';

const { user: authUser } = useUserSession();

const { state } = useQuery(() => residentByIdQuery({ id: authUser.value!.id }));

const resident = computed<null | Serialize<Resident>>(
  () => state.value?.data ?? null
);
</script>

<template>
  <div class="container mx-auto p-2">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">{{ $t('resident.settings.title') }}</h1>
      <p class="text-muted-foreground text-sm">
        {{ $t('resident.settings.profileSubtitle') }}
      </p>
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

    <template v-else-if="state.status === 'error'">
      <p class="text-destructive mb-4 text-sm">
        {{ $t('resident.settings.profileLoadError') }}
      </p>
    </template>

    <template v-else-if="resident">
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
  </div>
</template>
