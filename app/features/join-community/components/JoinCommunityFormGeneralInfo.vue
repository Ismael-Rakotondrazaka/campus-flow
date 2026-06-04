<script setup lang="ts">
import { GenderLabel, OriginLabel } from '#imports';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '~/components/ui/field';
import { Input } from '~/components/ui/input';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';

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

const { t } = useI18n();
</script>

<template>
  <FieldGroup class="space-y-2">
    <!-- Profile photo -->
    <PhotoUploadField
      :file-name="photoFileName"
      :preview="photoPreview"
      :aria-invalid="ariaInvalid"
      field-name="imageUrl"
      :label="t('joinCommunity.fields.profilePhoto')"
      :preview-alt="t('joinCommunity.fields.profilePhotoPreview')"
      @change="emit('photoChange', $event)"
    />

    <!-- Names -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <VeeField v-slot="{ errors, componentField }" name="firstName">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="firstName">
            {{ t('joinCommunity.fields.firstName') }}
          </FieldLabel>
          <Input
            id="firstName"
            v-bind="componentField"
            :aria-invalid="!!errors.length"
          />
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>

      <VeeField v-slot="{ errors, componentField }" name="lastName">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="lastName">
            {{ t('joinCommunity.fields.lastName') }}
          </FieldLabel>
          <Input
            id="lastName"
            v-bind="componentField"
            :aria-invalid="!!errors.length"
          />
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>
    </div>

    <!-- Gender -->
    <VeeField v-slot="{ errors, componentField }" name="gender">
      <Field :data-invalid="!!errors.length">
        <FieldLabel>{{ t('joinCommunity.fields.gender') }}</FieldLabel>
        <RadioGroup v-bind="componentField" class="flex gap-6">
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
    <VeeField v-slot="{ errors, componentField }" name="origin">
      <Field :data-invalid="!!errors.length">
        <FieldLabel>{{ t('joinCommunity.fields.origin') }}</FieldLabel>
        <RadioGroup v-bind="componentField" class="flex gap-6">
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
    <VeeField v-slot="{ errors, componentField }" name="nic">
      <Field :data-invalid="!!errors.length">
        <FieldLabel for="nic">
          {{ t('joinCommunity.fields.nicFull') }}
        </FieldLabel>
        <Input
          id="nic"
          v-bind="componentField"
          :placeholder="t('joinCommunity.placeholders.nic')"
          :aria-invalid="!!errors.length"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>

    <!-- NIC document -->
    <DocumentUploadField
      field-name="nicUrl"
      :label="t('joinCommunity.fields.nicPhotoFull')"
      :file-name="nicFileName"
      :preview="nicPreview"
      accept="image/jpeg,image/png"
      @change="emit('nicChange', $event)"
    />
  </FieldGroup>
</template>
