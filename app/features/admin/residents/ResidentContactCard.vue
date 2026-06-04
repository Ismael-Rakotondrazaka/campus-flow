<script setup lang="ts">
import type { Resident } from '#imports';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

interface Props {
  resident: Serialize<Resident>;
}

defineProps<Props>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ $t('common.cards.contact') }}</CardTitle>
    </CardHeader>
    <CardContent class="grid gap-y-3 text-sm sm:grid-cols-2">
      <div>
        <p class="text-muted-foreground">{{ $t('common.cards.phone') }}</p>
        <NuxtLink
          :to="`tel:${resident.phoneNumber}`"
          class="font-medium underline hover:opacity-70"
          >{{ resident.phoneNumber }}</NuxtLink
        >
      </div>
      <div>
        <p class="text-muted-foreground">
          {{ $t('common.cards.emergencyContact') }}
        </p>
        <NuxtLink
          :to="`tel:${resident.emergencyNumber}`"
          class="font-medium underline hover:opacity-70"
          >{{ resident.emergencyNumber }}</NuxtLink
        >
      </div>
    </CardContent>
  </Card>
</template>
