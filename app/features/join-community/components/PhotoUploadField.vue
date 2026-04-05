<script setup lang="ts">
import { Icon } from '#components';

import { Field, FieldLabel } from '@/components/ui/field';
import { cn } from '~/lib/utils';

interface Props {
  ariaInvalid?: 'false' | 'true' | boolean;
  fieldName: string;
  fileName?: null | string;
  label?: string;
  preview: null | string;
}

withDefaults(defineProps<Props>(), {
  ariaInvalid: false,
  fileName: null,
  label: "Photo d'identité",
});

const emit = defineEmits<{
  change: [event: Event];
}>();

const inputRef = ref<HTMLInputElement | null>(null);
</script>

<template>
  <VeeField v-slot="{ errors }" :name="fieldName">
    <Field :data-invalid="ariaInvalid" class="space-y-1">
      <FieldLabel
        :for="fieldName"
        :class="{ 'text-destructive': !!errors.length }"
        >{{ label }}</FieldLabel
      >
      <pre>{{ errors }}</pre>
      <button
        :aria-invalid="!!errors.length"
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
        {{ fileName || label }}
      </button>
      <input
        ref="inputRef"
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        class="hidden"
        @change="emit('change', $event)"
      />
      <img
        v-if="preview"
        :src="preview"
        alt="Photo d'identité preview"
        class="bg-muted h-48 w-40! rounded border object-cover"
      />
    </Field>
  </VeeField>
</template>
