<script setup lang="ts">
import type { HousingApplication } from '#imports';

import { formatDate } from '@vueuse/core';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

interface Props {
  housingApplication: Serialize<HousingApplication>;
}

const props = defineProps<Props>();

const { locale } = useI18n();

const formatDateLocalized = (iso: string) =>
  formatDate(new Date(iso), 'DD/MM/YYYY', { locales: locale.value });
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ $t('common.cards.scolarite') }}</CardTitle>
    </CardHeader>
    <CardContent class="grid gap-y-3 text-sm sm:grid-cols-2">
      <div>
        <p class="text-muted-foreground">{{ $t('common.cards.faculty') }}</p>
        <p class="font-medium">{{ props.housingApplication.faculty.name }}</p>
      </div>
      <div>
        <p class="text-muted-foreground">
          {{ $t('common.cards.academicSession') }}
        </p>
        <p class="font-medium">
          {{
            formatDateLocalized(
              props.housingApplication.academicSession.startAt
            )
          }}
          –
          {{
            formatDateLocalized(props.housingApplication.academicSession.endAt)
          }}
        </p>
      </div>
    </CardContent>
  </Card>
</template>
