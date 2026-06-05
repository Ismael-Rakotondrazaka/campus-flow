<script setup lang="ts">
import type { Maintenance } from '#imports';

import { USER_PROFILES_BUCKET } from '#imports';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import SignedUrlAvatar from '~/features/shared/users/components/SignedUrlAvatar.vue';

interface Props {
  maintenance: Serialize<Maintenance>;
}

defineProps<Props>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ $t('admin.maintenances.residentCardTitle') }}</CardTitle>
    </CardHeader>
    <CardContent class="space-y-3">
      <div class="flex items-center gap-3">
        <SignedUrlAvatar
          :bucket="USER_PROFILES_BUCKET"
          :first-name="maintenance.resident.firstName"
          :image-url="maintenance.resident.imageUrl"
          :last-name="maintenance.resident.lastName"
          class="size-10 shrink-0"
        />
        <div>
          <p class="text-sm font-medium">
            {{ maintenance.resident.firstName }}
            {{ maintenance.resident.lastName }}
          </p>
          <NuxtLink
            :to="`tel:${maintenance.resident.phoneNumber}`"
            class="text-muted-foreground text-xs underline hover:opacity-70"
          >
            {{ maintenance.resident.phoneNumber }}
          </NuxtLink>
        </div>
      </div>
      <div>
        <NuxtLinkLocale
          :to="{
            name: 'admin-root-residents-residentId',
            params: { residentId: maintenance.resident.id },
          }"
          class="text-xs underline hover:opacity-70"
        >
          {{ $t('common.buttons.viewProfile') }}
        </NuxtLinkLocale>
      </div>
    </CardContent>
  </Card>
</template>
