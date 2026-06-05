<script setup lang="ts">
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field';
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

const { t } = useI18n();
</script>

<template>
  <FieldGroup class="space-y-2">
    <VeeField v-slot="{ errors, componentField }" name="facultyId">
      <Field :data-invalid="!!errors.length">
        <FieldLabel>{{ t('joinCommunity.fields.faculty') }}</FieldLabel>
        <FacultySelect v-bind="componentField" />
      </Field>
    </VeeField>

    <DocumentUploadField
      field-name="schoolCertificateUrl"
      :label="t('joinCommunity.fields.schoolCertificate')"
      :file-name="schoolCertFileName"
      accept="image/jpeg,image/png,application/pdf"
      @change="emit('schoolCertChange', $event)"
    />
  </FieldGroup>
</template>
