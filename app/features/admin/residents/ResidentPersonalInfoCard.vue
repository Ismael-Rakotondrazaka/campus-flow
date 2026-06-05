<script setup lang="ts">
import type { Resident } from '#imports';

import { GenderLabel, OriginLabel } from '#imports';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import SignedUrlAvatar from '~/features/shared/users/components/SignedUrlAvatar.vue';

interface Props {
  resident: Serialize<Resident>;
}

defineProps<Props>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ $t('common.cards.personalInfo') }}</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="flex flex-col gap-4 sm:flex-row sm:items-start">
        <SignedUrlAvatar
          class="size-20 shrink-0 rounded-full"
          :first-name="resident.firstName"
          :image-url="resident.imageUrl"
          :last-name="resident.lastName"
        />
        <div class="grid w-full gap-y-2 text-sm sm:grid-cols-2">
          <div>
            <p class="text-muted-foreground">
              {{ $t('common.cards.fullName') }}
            </p>
            <p class="font-medium">
              {{ resident.firstName }} {{ resident.lastName }}
            </p>
          </div>
          <div>
            <p class="text-muted-foreground">{{ $t('common.cards.gender') }}</p>
            <p class="font-medium">{{ GenderLabel[resident.gender] }}</p>
          </div>
          <div>
            <p class="text-muted-foreground">{{ $t('common.cards.origin') }}</p>
            <p class="font-medium">{{ OriginLabel[resident.origin] }}</p>
          </div>
          <div>
            <p class="text-muted-foreground">
              {{ $t('common.cards.nicNumber') }}
            </p>
            <p class="font-medium">{{ resident.nic }}</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
