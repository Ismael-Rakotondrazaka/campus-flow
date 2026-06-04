<script setup lang="ts">
import type { Admin } from '#imports';

import { useQuery } from '@pinia/colada';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import UpdateAdminForm from '~/features/admin/admins/UpdateAdminForm.vue';
import { adminByIdQuery } from '~/features/shared/admins/admin.query';

const route = useRoute();
const adminId = computed(() => route.params.adminId as string);

const { state } = useQuery(() => adminByIdQuery({ id: adminId.value }));

const admin = computed<null | Serialize<Admin>>(
  () => state.value?.data ?? null
);
</script>

<template>
  <div class="container mx-auto p-2">
    <h1 class="mb-4 text-2xl font-bold">{{ $t('admin.admins.editTitle') }}</h1>

    <template v-if="state.status === 'pending'">
      <Card>
        <CardHeader>
          <Skeleton class="h-8 w-2/3" />
          <Skeleton class="mt-2 h-4 w-full" />
        </CardHeader>
        <CardContent class="space-y-4">
          <Skeleton class="h-10 w-full" />
          <Skeleton class="h-9 w-28" />
        </CardContent>
      </Card>
    </template>

    <template v-else-if="admin">
      <UpdateAdminForm :admin="admin" />
    </template>

    <template v-else>
      <p class="text-muted-foreground">
        Cet administrateur est introuvable ou a été supprimé.
      </p>
      <Button variant="outline" as-child>
        <NuxtLinkLocale :to="{ name: 'admin-root-admins' }">
          {{ $t('admin.admins.backToList') }}
        </NuxtLinkLocale>
      </Button>
    </template>
  </div>
</template>
