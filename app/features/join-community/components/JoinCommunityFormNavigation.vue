<script setup lang="ts">
import { Button } from '@/components/ui/button';

interface Props {
  currentStep: number;
  isSubmitting: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  back: [];
  next: [];
  submit: [];
}>();
</script>

<template>
  <div class="mt-8 flex justify-between gap-4">
    <Button
      v-if="currentStep > 1"
      type="button"
      variant="outline"
      :disabled="isSubmitting"
      @click="emit('back')"
    >
      Retour
    </Button>
    <div class="flex-1" />
    <Button
      v-if="currentStep < 4"
      type="button"
      :disabled="isSubmitting"
      @click="emit('next')"
    >
      Suivant
    </Button>
    <Button
      v-else
      type="button"
      :disabled="isSubmitting"
      @click="emit('submit')"
    >
      {{ isSubmitting ? 'Envoi en cours...' : 'Soumettre la demande' }}
    </Button>
  </div>
</template>
