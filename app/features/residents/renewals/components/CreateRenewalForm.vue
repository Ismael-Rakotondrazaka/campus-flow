<script setup lang="ts">
import type { AcademicSession } from '#imports';

import { CreateRenewalSchema } from '#shared/features/renewals';
import { toast } from 'vue-sonner';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field';
import { Input } from '~/components/ui/input';
import DocumentUploadField from '~/features/join-community/components/DocumentUploadField.vue';
import { useCreateRenewal } from '~/features/shared/renewals/renewal.query';
import { uploadRenewalDocument } from '~/features/shared/renewals/renewal.service';
import { residentByIdQuery } from '~/features/shared/residents/resident.query';

interface Props {
  session: Serialize<AcademicSession>;
}
const props = defineProps<Props>();

const { user: authUser } = useUserSession();
const localeRoute = useLocaleRoute();

const { data: residentData } = useQuery(() =>
  residentByIdQuery({ id: authUser.value!.id })
);

const resident = computed(() => residentData.value ?? null);

const createMutation = useCreateRenewal();

const photoFile = ref<File | null>(null);
const nicFile = ref<File | null>(null);
const schoolCertFile = ref<File | null>(null);

const { locale, t } = useI18n();

const dateLocale = computed(() => (locale.value === 'fr' ? 'fr-FR' : 'en-US'));

const CreateRenewalFormSchema = CreateRenewalSchema.omit({
  academicSessionId: true,
  facultyId: true,
}).extend({
  imageUrl: z.string().optional(),
  nicUrl: z.string().optional(),
  schoolCertificateUrl: z.string().optional(),
});

const { handleSubmit, isSubmitting, setErrors, setFieldError, setValues } =
  useForm({
    validationSchema: toTypedSchema(CreateRenewalFormSchema),
  });

watchEffect(() => {
  if (resident.value) {
    setValues({
      emergencyNumber: resident.value.emergencyNumber ?? '',
      phoneNumber: resident.value.phoneNumber ?? '',
    });
  }
});

const handlePhotoChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    photoFile.value = file;
    (event.target as HTMLInputElement).value = '';
  }
};

const handleNicChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    nicFile.value = file;
    (event.target as HTMLInputElement).value = '';
  }
};

const handleSchoolCertChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    schoolCertFile.value = file;
    (event.target as HTMLInputElement).value = '';
  }
};

const isSubmittingForm = ref(false);

const renewalCloseAtFormatted = computed(() =>
  new Date(props.session.renewalCloseAt).toLocaleDateString(dateLocale.value, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
);

const onSubmit = handleSubmit(async formValues => {
  const res = resident.value;

  if (!res) return;

  let hasFileError = false;

  if (!photoFile.value) {
    setFieldError('imageUrl', t('forms.validation.photoRequired'));
    hasFileError = true;
  }
  if (!nicFile.value) {
    setFieldError('nicUrl', t('forms.validation.nicRequired'));
    hasFileError = true;
  }
  if (!schoolCertFile.value) {
    setFieldError(
      'schoolCertificateUrl',
      t('forms.validation.schoolCertRequired')
    );
    hasFileError = true;
  }

  if (hasFileError) return;

  isSubmittingForm.value = true;

  try {
    const folderId = crypto.randomUUID();

    const [imagePath, nicPath, schoolCertPath] = await Promise.all([
      uploadRenewalDocument(folderId, photoFile.value!, 'photo'),
      uploadRenewalDocument(folderId, nicFile.value!, 'nic'),
      uploadRenewalDocument(
        folderId,
        schoolCertFile.value!,
        'school-certificate'
      ),
    ]);

    await createMutation.mutation({
      academicSessionId: props.session.id,
      emergencyNumber: formValues.emergencyNumber,
      facultyId: res.facultyId,
      imageUrl: imagePath,
      nicUrl: nicPath,
      phoneNumber: formValues.phoneNumber,
      schoolCertificateUrl: schoolCertPath,
    });

    toast.success(t('common.toasts.renewal.submitted'));
    await navigateTo(localeRoute({ name: 'resident-renewals' }));
  } catch (error) {
    handleFetchError(error, t, setErrors);
  } finally {
    isSubmittingForm.value = false;
  }
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ t('resident.renewals.createCardTitle') }}</CardTitle>
      <CardDescription>
        {{ t('resident.renewals.form.deadlineDescription') }}
        <strong>{{ renewalCloseAtFormatted }}</strong>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="onSubmit">
        <FieldGroup class="space-y-4">
          <VeeField v-slot="{ errors, componentField }" name="phoneNumber">
            <Field :data-invalid="!!errors.length">
              <FieldLabel for="renewal-phoneNumber">
                {{ t('common.cards.phone') }}
                <span class="text-destructive" aria-hidden="true"> *</span>
              </FieldLabel>
              <Input
                id="renewal-phoneNumber"
                v-bind="componentField"
                :aria-invalid="!!errors.length"
              />
              <FieldError v-if="errors.length" :errors="errors" />
            </Field>
          </VeeField>

          <VeeField v-slot="{ errors, componentField }" name="emergencyNumber">
            <Field :data-invalid="!!errors.length">
              <FieldLabel for="renewal-emergencyNumber">
                {{ t('resident.renewals.form.emergencyNumber') }}
                <span class="text-destructive" aria-hidden="true"> *</span>
              </FieldLabel>
              <Input
                id="renewal-emergencyNumber"
                v-bind="componentField"
                :aria-invalid="!!errors.length"
              />
              <FieldError v-if="errors.length" :errors="errors" />
            </Field>
          </VeeField>

          <DocumentUploadField
            field-name="imageUrl"
            :label="t('resident.renewals.form.photo')"
            :file-name="photoFile?.name ?? null"
            accept="image/jpeg,image/png,image/webp"
            @change="handlePhotoChange"
          />

          <DocumentUploadField
            field-name="nicUrl"
            :label="t('resident.renewals.form.nic')"
            :file-name="nicFile?.name ?? null"
            @change="handleNicChange"
          />

          <DocumentUploadField
            field-name="schoolCertificateUrl"
            :label="t('joinCommunity.fields.schoolCertificate')"
            :file-name="schoolCertFile?.name ?? null"
            @change="handleSchoolCertChange"
          />

          <Field>
            <Button
              class="w-min!"
              type="submit"
              :disabled="isSubmitting || isSubmittingForm || !resident"
            >
              <Icon name="mdi:send" />
              {{ t('resident.renewals.form.submitRequest') }}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </CardContent>
  </Card>
</template>
