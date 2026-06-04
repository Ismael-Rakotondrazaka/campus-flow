<script setup lang="ts">
import type { Renewal } from '#imports';

import { useQuery } from '@pinia/colada';
import {
  RefusalReasonLabel,
  RENEWAL_DOCUMENTS_BUCKET,
  RenewalStatus,
} from '#imports';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { Skeleton } from '~/components/ui/skeleton';
import RenewalStatusBadge from '~/features/shared/renewals/components/RenewalStatusBadge.vue';
import { renewalByIdQuery } from '~/features/shared/renewals/renewal.query';
import { storageSignedUrlQuery } from '~/features/shared/users/composables/useStorageSignedUrl';

interface Props {
  renewalId: string;
}

const props = defineProps<Props>();

const { locale, t } = useI18n();

const dateLocale = computed(() => (locale.value === 'fr' ? 'fr-FR' : 'en-US'));

const { state } = useQuery(() => renewalByIdQuery({ id: props.renewalId }));

const renewal = computed<null | Serialize<Renewal>>(
  () => state.value?.data ?? null
);

const { data: imageSignedUrl } = useQuery(() =>
  storageSignedUrlQuery({
    bucket: RENEWAL_DOCUMENTS_BUCKET,
    path: renewal.value?.imageUrl ?? '',
  })
);

const { data: nicSignedUrl } = useQuery(() =>
  storageSignedUrlQuery({
    bucket: RENEWAL_DOCUMENTS_BUCKET,
    path: renewal.value?.nicUrl ?? '',
  })
);

const { data: schoolCertSignedUrl } = useQuery(() =>
  storageSignedUrlQuery({
    bucket: RENEWAL_DOCUMENTS_BUCKET,
    path: renewal.value?.schoolCertificateUrl ?? '',
  })
);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(dateLocale.value, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
</script>

<template>
  <div>
    <div class="mb-4">
      <Button variant="outline" size="sm" as-child>
        <NuxtLinkLocale :to="{ name: 'resident-renewals' }">
          <Icon name="mdi:arrow-left" class="mr-1" />
          {{ t('resident.renewals.backToMine') }}
        </NuxtLinkLocale>
      </Button>
    </div>

    <template v-if="state.status === 'pending'">
      <div class="mb-4 flex items-center gap-4">
        <Skeleton class="h-8 w-48" />
        <Skeleton class="h-6 w-20" />
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <Skeleton class="h-36 w-full rounded-xl" />
        <Skeleton class="h-36 w-full rounded-xl" />
        <Skeleton class="h-28 w-full rounded-xl" />
        <Skeleton class="h-28 w-full rounded-xl md:col-span-2" />
      </div>
    </template>

    <template v-else-if="renewal">
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <h2 class="text-2xl font-bold">
          {{
            t('resident.renewals.detailTitlePrefix', {
              date: formatDate(renewal.createdAt),
            })
          }}
        </h2>
        <RenewalStatusBadge :value="renewal.status" />
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{{ t('common.cards.scolarite') }}</CardTitle>
          </CardHeader>
          <CardContent class="grid gap-y-3 text-sm sm:grid-cols-2">
            <div>
              <p class="text-muted-foreground">
                {{ t('common.cards.faculty') }}
              </p>
              <p class="font-medium">{{ renewal.faculty.name }}</p>
            </div>
            <div>
              <p class="text-muted-foreground">
                {{ t('common.cards.academicSession') }}
              </p>
              <p class="font-medium">
                {{ formatDate(renewal.academicSession.startAt) }}
                –
                {{ formatDate(renewal.academicSession.endAt) }}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{{ t('common.cards.contact') }}</CardTitle>
          </CardHeader>
          <CardContent class="grid gap-y-3 text-sm sm:grid-cols-2">
            <div>
              <p class="text-muted-foreground">
                {{ t('common.cards.phone') }}
              </p>
              <NuxtLink
                :to="`tel:${renewal.phoneNumber}`"
                class="font-medium underline hover:opacity-70"
              >
                {{ renewal.phoneNumber }}
              </NuxtLink>
            </div>
            <div>
              <p class="text-muted-foreground">
                {{ t('common.cards.emergencyContact') }}
              </p>
              <NuxtLink
                :to="`tel:${renewal.emergencyNumber}`"
                class="font-medium underline hover:opacity-70"
              >
                {{ renewal.emergencyNumber }}
              </NuxtLink>
            </div>
          </CardContent>
        </Card>

        <Card
          v-if="
            renewal.status === RenewalStatus.refused && renewal.refusalReason
          "
          class="md:col-span-2"
        >
          <CardHeader>
            <CardTitle class="flex items-center gap-2 text-red-600">
              <Icon name="mdi:close-circle-outline" />
              {{ t('resident.renewals.refusalReason') }}
            </CardTitle>
          </CardHeader>
          <CardContent class="text-sm">
            <p class="font-medium">
              {{ RefusalReasonLabel[renewal.refusalReason] }}
            </p>
          </CardContent>
        </Card>

        <Card class="md:col-span-2">
          <CardHeader>
            <CardTitle>{{ t('common.cards.documents') }}</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3 text-sm">
            <div>
              <p class="text-muted-foreground mb-1">
                {{ t('resident.renewals.form.photo') }}
              </p>
              <NuxtLink
                v-if="imageSignedUrl"
                external
                :to="imageSignedUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-blue-600 underline hover:text-blue-800"
              >
                <Icon name="mdi:file-image-outline" />
                {{ t('common.buttons.viewPhoto') }}
              </NuxtLink>
              <p v-else class="text-muted-foreground italic">
                {{ t('common.empty.notAvailable') }}
              </p>
            </div>
            <Separator />
            <div>
              <p class="text-muted-foreground mb-1">
                {{ t('resident.renewals.form.nic') }}
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
                {{ t('common.buttons.viewDocument') }}
              </NuxtLink>
              <p v-else class="text-muted-foreground italic">
                {{ t('common.empty.notAvailable') }}
              </p>
            </div>
            <Separator />
            <div>
              <p class="text-muted-foreground mb-1">
                {{ t('joinCommunity.fields.schoolCertificate') }}
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
                {{ t('common.buttons.viewDocument') }}
              </NuxtLink>
              <p v-else class="text-muted-foreground italic">
                {{ t('common.empty.notAvailable') }}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>

    <template v-else>
      <p class="text-muted-foreground mb-4">
        {{ t('common.notFound.renewal') }}
      </p>
      <Button variant="outline" as-child>
        <NuxtLinkLocale :to="{ name: 'resident-renewals' }">
          {{ t('resident.renewals.backToMine') }}
        </NuxtLinkLocale>
      </Button>
    </template>
  </div>
</template>
