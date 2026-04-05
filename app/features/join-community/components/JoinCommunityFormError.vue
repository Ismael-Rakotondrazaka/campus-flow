<script setup lang="ts">
import { Icon } from '#components';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Props {
  error: null | string;
}

defineProps<Props>();

type Emits = {
  retry: [];
};

const emit = defineEmits<Emits>();
</script>

<template>
  <Card class="border-red-200 bg-red-50">
    <CardHeader>
      <div class="flex items-center gap-3">
        <Icon name="mdi:alert-circle" class="size-8 text-red-600" />
        <div>
          <CardTitle>La soumission a échoué</CardTitle>
          <CardDescription>{{ error }}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Button @click="emit('retry')">Réessayer</Button>
    </CardContent>
  </Card>
</template>
