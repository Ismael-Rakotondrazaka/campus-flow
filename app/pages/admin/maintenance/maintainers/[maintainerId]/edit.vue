<script setup lang="ts">
import type { Maintainer } from '#imports';

import { useQuery } from '@pinia/colada';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import UpdateMaintainerForm from '~/features/admin/maintainers/UpdateMaintainerForm.vue';
import { maintainerByIdQuery } from '~/features/shared/maintainers/maintainer.query';

const route = useRoute();
const maintainerId = computed(() => route.params.maintainerId as string);

const { state } = useQuery(() =>
  maintainerByIdQuery({ id: maintainerId.value })
);

const maintainer = computed<null | Serialize<Maintainer>>(
  () => state.value?.data ?? null
);
</script>

<template>
  <div class="container mx-auto p-2">
    <div class="mb-4">
      <Button variant="outline" size="sm" as-child>
        <NuxtLinkLocale :to="{ name: 'admin-maintenance-maintainers' }">
          <Icon name="mdi:arrow-left" />
          {{ $t('admin.maintainers.backToList') }}
        </NuxtLinkLocale>
      </Button>
    </div>

    <h1 class="mb-4 text-2xl font-bold">
      {{ $t('admin.maintainers.editTitle') }}
    </h1>

    <template v-if="state.status === 'pending'">
      <Card>
        <CardHeader>
          <Skeleton class="h-8 w-2/3" />
          <Skeleton class="mt-2 h-4 w-full" />
        </CardHeader>
        <CardContent class="space-y-4">
          <Skeleton class="h-10 w-full" />
          <Skeleton class="h-10 w-full" />
          <Skeleton class="h-10 w-full" />
          <Skeleton class="h-9 w-28" />
        </CardContent>
      </Card>
    </template>

    <template v-else-if="maintainer">
      <UpdateMaintainerForm :maintainer="maintainer" />
    </template>

    <template v-else>
      <p class="text-muted-foreground">
        Ce mainteneur est introuvable ou a été supprimé.
      </p>
      <Button variant="outline" as-child class="mt-4">
        <NuxtLinkLocale :to="{ name: 'admin-maintenance-maintainers' }">
          {{ $t('admin.maintainers.backToList') }}
        </NuxtLinkLocale>
      </Button>
    </template>
  </div>
</template>
