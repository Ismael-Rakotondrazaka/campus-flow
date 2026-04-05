<script setup lang="ts">
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  GenderLabel,
  OriginLabel,
} from '~/features/shared/housing-applications/housing-application.model';

import DocumentUploadField from './DocumentUploadField.vue';
import PhotoUploadField from './PhotoUploadField.vue';

interface Props {
  ariaInvalid?: 'false' | 'true' | boolean;
  firstNameInitial: string;
  nicFileName: null | string;
  nicPreview: null | string;
  photoFileName: null | string;
  photoPreview: null | string;
}

defineProps<Props>();

const emit = defineEmits<{
  nicChange: [event: Event];
  photoChange: [event: Event];
}>();
</script>

<template>
  <FieldGroup class="space-y-2">
    <!-- Profile photo -->
    <PhotoUploadField
      :file-name="photoFileName"
      :preview="photoPreview"
      :aria-invalid="ariaInvalid"
      field-name="image_url"
      @change="emit('photoChange', $event)"
    />

    <!-- Names -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <VeeField v-slot="{ field, errors }" name="first_name">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="first_name">Prénom</FieldLabel>
          <Input
            id="first_name"
            v-bind="field"
            :aria-invalid="!!errors.length"
          />
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>

      <VeeField v-slot="{ field, errors }" name="last_name">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="last_name">Nom</FieldLabel>
          <Input
            id="last_name"
            v-bind="field"
            :aria-invalid="!!errors.length"
          />
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>
    </div>

    <!-- Gender -->
    <VeeField v-slot="{ field, errors }" name="gender">
      <Field :data-invalid="!!errors.length">
        <FieldLabel>Genre</FieldLabel>
        <RadioGroup
          :model-value="field.value"
          class="flex gap-6"
          @update:model-value="field.onChange"
        >
          <div class="flex items-center gap-2">
            <RadioGroupItem id="gender-male" value="male" />
            <FieldLabel for="gender-male" class="mb-0">
              {{ GenderLabel.male }}
            </FieldLabel>
          </div>
          <div class="flex items-center gap-2">
            <RadioGroupItem id="gender-female" value="female" />
            <FieldLabel for="gender-female" class="mb-0">
              {{ GenderLabel.female }}
            </FieldLabel>
          </div>
        </RadioGroup>
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>

    <!-- Origin -->
    <VeeField v-slot="{ field, errors }" name="origin">
      <Field :data-invalid="!!errors.length">
        <FieldLabel>Origine</FieldLabel>
        <RadioGroup
          :model-value="field.value"
          class="flex gap-6"
          @update:model-value="field.onChange"
        >
          <div class="flex items-center gap-2">
            <RadioGroupItem id="origin-national" value="national" />
            <FieldLabel for="origin-national" class="mb-0">
              {{ OriginLabel.national }}
            </FieldLabel>
          </div>
          <div class="flex items-center gap-2">
            <RadioGroupItem id="origin-foreigner" value="foreigner" />
            <FieldLabel for="origin-foreigner" class="mb-0">
              {{ OriginLabel.foreigner }}
            </FieldLabel>
          </div>
        </RadioGroup>
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>

    <!-- NIC number -->
    <VeeField v-slot="{ field, errors }" name="nic">
      <Field :data-invalid="!!errors.length">
        <FieldLabel for="nic">Numéro de carte d'identité nationale</FieldLabel>
        <Input
          id="nic"
          v-bind="field"
          placeholder="ex: 1234567890123"
          :aria-invalid="!!errors.length"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>

    <!-- NIC document -->
    <DocumentUploadField
      field-name="nic_url"
      label="Photo de carte d'identité nationale"
      :file-name="nicFileName"
      :preview="nicPreview"
      accept="image/jpeg,image/png"
      @change="emit('nicChange', $event)"
    />
  </FieldGroup>
</template>
