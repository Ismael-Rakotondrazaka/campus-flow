<script setup lang="ts">
import { Icon } from '#components';

import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

interface Props {
  error?: null | string;
}

defineProps<Props>();

type Emits = {
  retry: [];
};

const emit = defineEmits<Emits>();

const { t } = useI18n();
</script>

<template>
  <Card class="border-red-200 bg-red-50">
    <CardHeader>
      <div class="flex items-center gap-3">
        <Icon name="mdi:alert-circle" class="size-8 text-red-600" />
        <div>
          <CardTitle>{{ t('joinCommunity.error.title') }}</CardTitle>
          <CardDescription v-if="error">{{ error }}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Button @click="emit('retry')">
        {{ t('joinCommunity.error.retry') }}
      </Button>
    </CardContent>
  </Card>
</template>
