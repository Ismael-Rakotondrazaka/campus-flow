<script setup lang="ts">
import PhoneInput from '~/components/common/PhoneInput.vue';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '~/components/ui/field';

const { t } = useI18n();
</script>

<template>
  <FieldGroup class="space-y-2">
    <VeeField v-slot="{ errors, componentField }" name="email">
      <Field :data-invalid="!!errors.length">
        <FieldLabel for="email">
          {{ t('joinCommunity.fields.emailAddress') }}
        </FieldLabel>
        <Input
          id="email"
          v-bind="componentField"
          type="email"
          :aria-invalid="!!errors.length"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>

    <VeeField v-slot="{ field, errors }" name="phoneNumber">
      <Field :data-invalid="!!errors.length">
        <FieldLabel for="phoneNumber">
          {{ t('joinCommunity.fields.phoneNumber') }}
        </FieldLabel>
        <PhoneInput
          id="phoneNumber"
          :aria-invalid="!!errors.length"
          @on-update:model-value="field['onUpdate:modelValue']"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>

    <VeeField v-slot="{ field, errors }" name="emergencyNumber">
      <Field :data-invalid="!!errors.length">
        <FieldLabel for="emergencyNumber">
          {{ t('joinCommunity.fields.emergencyNumber') }}
        </FieldLabel>
        <PhoneInput
          id="emergencyNumber"
          :aria-invalid="!!errors.length"
          @on-update:model-value="field['onUpdate:modelValue']"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
  </FieldGroup>
</template>
