<script setup lang="ts">
import { Button } from '~/components/ui/button';

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

const { t } = useI18n();
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
      <Icon name="mdi:arrow-left" />
      {{ t('joinCommunity.nav.back') }}
    </Button>
    <div class="flex-1" />
    <Button
      v-if="currentStep < 4"
      type="button"
      :disabled="isSubmitting"
      @click="emit('next')"
    >
      {{ t('joinCommunity.nav.next') }}
      <Icon name="mdi:arrow-right" />
    </Button>
    <Button
      v-else
      type="button"
      :disabled="isSubmitting"
      @click="emit('submit')"
    >
      <Icon v-if="isSubmitting" name="mdi:loading" class="animate-spin" />
      <Icon v-else name="mdi:send" />
      {{
        isSubmitting
          ? t('joinCommunity.nav.submitting')
          : t('joinCommunity.nav.submit')
      }}
    </Button>
  </div>
</template>
