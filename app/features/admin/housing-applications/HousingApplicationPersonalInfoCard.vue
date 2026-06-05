<script setup lang="ts">
import {
  GenderLabel,
  HOUSING_APPLICATION_DOCUMENTS_BUCKET,
  type HousingApplication,
  OriginLabel,
} from '#imports';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import SignedUrlAvatar from '~/features/shared/users/components/SignedUrlAvatar.vue';

interface Props {
  housingApplication: Serialize<HousingApplication>;
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
          :bucket="HOUSING_APPLICATION_DOCUMENTS_BUCKET"
          class="size-20 shrink-0 rounded-full"
          :first-name="housingApplication.firstName"
          :image-url="housingApplication.imageUrl"
          :last-name="housingApplication.lastName"
        />
        <div class="grid w-full gap-y-2 text-sm sm:grid-cols-2">
          <div>
            <p class="text-muted-foreground">
              {{ $t('common.cards.fullName') }}
            </p>
            <p class="font-medium">
              {{ housingApplication.firstName }}
              {{ housingApplication.lastName }}
            </p>
          </div>
          <div>
            <p class="text-muted-foreground">{{ $t('common.cards.gender') }}</p>
            <p class="font-medium">
              {{ GenderLabel[housingApplication.gender] }}
            </p>
          </div>
          <div>
            <p class="text-muted-foreground">{{ $t('common.cards.origin') }}</p>
            <p class="font-medium">
              {{ OriginLabel[housingApplication.origin] }}
            </p>
          </div>
          <div>
            <p class="text-muted-foreground">
              {{ $t('common.cards.nicNumber') }}
            </p>
            <p class="font-medium">{{ housingApplication.nic }}</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
