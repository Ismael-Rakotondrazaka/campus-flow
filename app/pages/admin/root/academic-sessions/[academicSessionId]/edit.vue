<script setup lang="ts">
import type { AcademicSession } from '#imports';

import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import UpdateAcademicSessionForm from '~/features/admin/academic-sessions/UpdateAcademicSessionForm.vue';
import { academicSessionByIdQuery } from '~/features/shared/academic-sessions/academic-session.query';

const route = useRoute();
const academicSessionId = computed(
  () => route.params.academicSessionId as string
);

const { state } = useQuery(() =>
  academicSessionByIdQuery({ id: academicSessionId.value })
);

const session = computed<null | Serialize<AcademicSession>>(
  () => state.value?.data ?? null
);
</script>

<template>
  <div class="container mx-auto p-2">
    <h1 class="mb-4 text-2xl font-bold">
      {{ $t('admin.academicSessions.editTitle') }}
    </h1>

    <template v-if="state.status === 'pending'">
      <Card>
        <CardHeader>
          <Skeleton class="h-6 w-1/2" />
          <Skeleton class="mt-1 h-4 w-3/4" />
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <Skeleton class="h-10 w-full" />
            <Skeleton class="h-10 w-full" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <Skeleton class="h-10 w-full" />
            <Skeleton class="h-10 w-full" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <Skeleton class="h-10 w-full" />
            <Skeleton class="h-10 w-full" />
          </div>
          <Skeleton class="h-9 w-32" />
        </CardContent>
      </Card>
    </template>

    <template v-else-if="session">
      <UpdateAcademicSessionForm :session="session" />
    </template>

    <template v-else>
      <p class="text-muted-foreground mb-4">
        Cette session académique est introuvable ou a été supprimée.
      </p>
      <Button variant="outline" as-child>
        <NuxtLinkLocale :to="{ name: 'admin-root-academic-sessions' }">
          {{ $t('admin.academicSessions.backToList') }}
        </NuxtLinkLocale>
      </Button>
    </template>
  </div>
</template>
