<script setup lang="ts">
import type { HousingApplication } from '#imports';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

interface Props {
  housingApplication: Serialize<HousingApplication>;
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
          :to="`tel:${housingApplication.phoneNumber}`"
          external
          class="font-medium underline hover:opacity-70"
        >
          {{ housingApplication.phoneNumber }}
        </NuxtLink>
      </div>
      <div>
        <p class="text-muted-foreground">
          {{ $t('common.cards.emergencyContact') }}
        </p>
        <NuxtLink
          :to="`tel:${housingApplication.emergencyNumber}`"
          external
          class="font-medium underline hover:opacity-70"
        >
          {{ housingApplication.emergencyNumber }}
        </NuxtLink>
      </div>
    </CardContent>
  </Card>
</template>
