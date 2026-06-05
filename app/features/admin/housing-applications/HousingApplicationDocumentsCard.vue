<script setup lang="ts">
import { useQuery } from '@pinia/colada';
import {
  HOUSING_APPLICATION_DOCUMENTS_BUCKET,
  type HousingApplication,
} from '#imports';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { storageSignedUrlQuery } from '~/features/shared/users/composables/useStorageSignedUrl';

interface Props {
  housingApplication: Serialize<HousingApplication>;
}

const props = defineProps<Props>();

const { data: nicSignedUrl } = useQuery(() =>
  storageSignedUrlQuery({
    bucket: HOUSING_APPLICATION_DOCUMENTS_BUCKET,
    path: props.housingApplication.nicUrl,
  })
);

const { data: schoolCertSignedUrl } = useQuery(() =>
  storageSignedUrlQuery({
    bucket: HOUSING_APPLICATION_DOCUMENTS_BUCKET,
    path: props.housingApplication.schoolCertificateUrl,
  })
);
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ $t('common.cards.documents') }}</CardTitle>
    </CardHeader>
    <CardContent class="space-y-3 text-sm">
      <div>
        <p class="text-muted-foreground mb-1">
          {{ $t('admin.documents.nic') }}
        </p>
        <NuxtLink
          v-if="nicSignedUrl"
          external
          :to="nicSignedUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-blue-600 underline hover:text-blue-800"
        >
          <Icon name="mdi:file-document-outline" />
          {{ $t('common.buttons.viewDocument') }}
        </NuxtLink>
        <p v-else class="text-muted-foreground italic">
          {{ $t('common.empty.notAvailable') }}
        </p>
      </div>
      <Separator />
      <div>
        <p class="text-muted-foreground mb-1">
          {{ $t('admin.documents.schoolCertificate') }}
        </p>
        <NuxtLink
          v-if="schoolCertSignedUrl"
          external
          :to="schoolCertSignedUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-blue-600 underline hover:text-blue-800"
        >
          <Icon name="mdi:file-document-outline" />
          {{ $t('common.buttons.viewDocument') }}
        </NuxtLink>
        <p v-else class="text-muted-foreground italic">
          {{ $t('common.empty.notAvailable') }}
        </p>
      </div>
    </CardContent>
  </Card>
</template>
