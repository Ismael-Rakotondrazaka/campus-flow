<script setup lang="ts">
import {
  type Gender,
  GenderLabel,
  type Origin,
  OriginLabel,
  type Renewal,
  RENEWAL_DOCUMENTS_BUCKET,
} from '#imports';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import SignedUrlAvatar from '~/features/shared/users/components/SignedUrlAvatar.vue';

interface Props {
  renewal: Serialize<Renewal>;
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
          :bucket="RENEWAL_DOCUMENTS_BUCKET"
          class="size-20 shrink-0 rounded-full"
          :first-name="renewal.resident.firstName"
          :image-url="renewal.imageUrl"
          :last-name="renewal.resident.lastName"
        />
        <div class="grid w-full gap-y-2 text-sm sm:grid-cols-2">
          <div>
            <p class="text-muted-foreground">
              {{ $t('common.cards.fullName') }}
            </p>
            <p class="font-medium">
              {{ renewal.resident.firstName }}
              {{ renewal.resident.lastName }}
            </p>
          </div>
          <div>
            <p class="text-muted-foreground">{{ $t('common.cards.gender') }}</p>
            <p class="font-medium">
              {{ GenderLabel[renewal.resident.gender as Gender] }}
            </p>
          </div>
          <div>
            <p class="text-muted-foreground">{{ $t('common.cards.origin') }}</p>
            <p class="font-medium">
              {{ OriginLabel[renewal.resident.origin as Origin] }}
            </p>
          </div>
          <div>
            <p class="text-muted-foreground">
              {{ $t('common.cards.nicNumber') }}
            </p>
            <p class="font-medium">{{ renewal.resident.nic }}</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
