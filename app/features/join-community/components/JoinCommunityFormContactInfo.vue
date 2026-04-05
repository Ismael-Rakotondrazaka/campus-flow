<script setup lang="ts">
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import PhoneInput from '~/components/common/PhoneInput.vue';
</script>

<template>
  <FieldGroup class="space-y-2">
    <VeeField v-slot="{ field, errors }" name="email">
      <Field :data-invalid="!!errors.length">
        <FieldLabel for="email">Adresse e-mail</FieldLabel>
        <Input
          id="email"
          v-bind="field"
          type="email"
          :aria-invalid="!!errors.length"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>

    <VeeField v-slot="{ field, errors }" name="phone_number">
      <Field :data-invalid="!!errors.length">
        <FieldLabel for="phone_number">Numéro de téléphone</FieldLabel>
        <PhoneInput
          id="phone_number"
          :aria-invalid="!!errors.length"
          @on-update:model-value="field['onUpdate:modelValue']"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>

    <VeeField v-slot="{ field, errors }" name="emergency_number">
      <Field :data-invalid="!!errors.length">
        <FieldLabel for="emergency_number">
          Numéro de contact d'urgence
        </FieldLabel>
        <PhoneInput
          id="emergency_number"
          :aria-invalid="!!errors.length"
          @on-update:model-value="field['onUpdate:modelValue']"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
  </FieldGroup>
</template>
