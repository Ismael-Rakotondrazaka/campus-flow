<script setup lang="ts">
import { Icon } from '#components';

import { Button } from '~/components/ui/button';
import { Field, FieldLabel } from '~/components/ui/field';
import { cn } from '~/lib/utils';

interface Props {
  ariaInvalid?: 'false' | 'true' | boolean;
  fieldName: string;
  fileName?: null | string;
  label: string;
  preview: null | string;
  previewAlt: string;
  /** When false, user can remove the current image (emit `clear`). */
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  ariaInvalid: false,
  fileName: null,
  required: true,
});

const emit = defineEmits<{
  change: [event: Event];
  clear: [];
}>();

const { t } = useI18n();

const inputRef = ref<HTMLInputElement | null>(null);

const showClear = computed(
  () => !props.required && !!(props.preview || props.fileName)
);

const onClear = () => {
  if (inputRef.value) inputRef.value.value = '';
  emit('clear');
};
</script>

<template>
  <VeeField v-slot="{ errors }" :name="fieldName">
    <Field :data-invalid="ariaInvalid" class="space-y-1">
      <FieldLabel
        :for="fieldName"
        :class="{ 'text-destructive': !!errors.length }"
      >
        {{ label }}
        <span v-if="required" class="text-destructive" aria-hidden="true">
          *
        </span>
      </FieldLabel>
      <div class="flex flex-wrap items-center gap-2">
        <button
          :aria-invalid="!!errors.length"
          :aria-required="required"
          type="button"
          :class="
            cn(
              'hover:bg-accent flex items-center gap-2 rounded-md border px-4 py-2',
              errors.length
                ? 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
                : 'aria-invalid:ring-input/20 dark:aria-invalid:ring-input/40 aria-invalid:border-input'
            )
          "
          @click="inputRef?.click()"
        >
          <Icon name="mdi:file-upload" class="size-4" />
          {{ fileName || t('joinCommunity.upload.profilePhoto') }}
        </button>
        <Button
          v-if="showClear"
          type="button"
          variant="outline"
          size="sm"
          @click="onClear"
        >
          {{ t('joinCommunity.upload.remove') }}
        </Button>
      </div>
      <input
        :id="fieldName"
        ref="inputRef"
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        class="hidden"
        :aria-required="required"
        @change="emit('change', $event)"
      />
      <img
        v-if="preview"
        :src="preview"
        :alt="previewAlt"
        class="bg-muted h-48 w-40! rounded border object-cover"
      />
    </Field>
  </VeeField>
</template>
