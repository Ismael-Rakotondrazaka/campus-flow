<script setup lang="ts">
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import FacultySelect from '~/features/shared/faculties/components/FacultySelect.vue';

import DocumentUploadField from './DocumentUploadField.vue';

interface Faculty {
  id: string;
  name: string;
}

interface Props {
  faculties: Faculty[];
  schoolCertFileName: null | string;
}

defineProps<Props>();

const emit = defineEmits<{
  schoolCertChange: [event: Event];
}>();
</script>

<template>
  <FieldGroup class="space-y-2">
    <VeeField v-slot="{ errors, componentField }" name="faculty_id">
      <Field :data-invalid="!!errors.length">
        <FieldLabel>Faculté</FieldLabel>
        <FacultySelect v-bind="componentField" />
      </Field>
    </VeeField>

    <DocumentUploadField
      field-name="school_certificate_url"
      label="Certificat de scolarité"
      :file-name="schoolCertFileName"
      accept="image/jpeg,image/png,application/pdf"
      @change="emit('schoolCertChange', $event)"
    />
  </FieldGroup>
</template>
