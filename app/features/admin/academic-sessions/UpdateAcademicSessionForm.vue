<script setup lang="ts">
import type { AcademicSession, UpdateAcademicSession } from '#imports';

import { toast } from 'vue-sonner';
import { z } from 'zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field';
import { Input } from '~/components/ui/input';
import { useUpdateAcademicSession } from '~/features/shared/academic-sessions/academic-session.query';

interface Props {
  session: Serialize<AcademicSession>;
}

const props = defineProps<Props>();

// datetime-local inputs expect "YYYY-MM-DDTHH:MM" format
const toLocalInput = (iso: string) => {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// Convert local datetime-local value back to ISO 8601 with timezone
const toIso = (local: string) => new Date(local).toISOString();

const { t } = useI18n();

const { handleSubmit, isSubmitting, setErrors, setValues } = useForm({
  initialValues: {
    applicationCloseAt: toLocalInput(props.session.applicationCloseAt),
    applicationOpenAt: toLocalInput(props.session.applicationOpenAt),
    endAt: toLocalInput(props.session.endAt),
    renewalCloseAt: toLocalInput(props.session.renewalCloseAt),
    renewalOpenAt: toLocalInput(props.session.renewalOpenAt),
    startAt: toLocalInput(props.session.startAt),
  },
  validationSchema: toTypedSchema(
    UpdateAcademicSessionSchema.extend({
      applicationCloseAt: z.string().min(1),
      applicationOpenAt: z.string().min(1),
      endAt: z.string().min(1),
      renewalCloseAt: z.string().min(1),
      renewalOpenAt: z.string().min(1),
      startAt: z.string().min(1),
    })
  ),
});

watch(
  () => props.session,
  session => {
    setValues({
      applicationCloseAt: toLocalInput(session.applicationCloseAt),
      applicationOpenAt: toLocalInput(session.applicationOpenAt),
      endAt: toLocalInput(session.endAt),
      renewalCloseAt: toLocalInput(session.renewalCloseAt),
      renewalOpenAt: toLocalInput(session.renewalOpenAt),
      startAt: toLocalInput(session.startAt),
    });
  }
);

const updateMutation = useUpdateAcademicSession();

const localeRoute = useLocaleRoute();

const onSubmit = handleSubmit(async (values: UpdateAcademicSession) => {
  try {
    await updateMutation.mutation({
      id: props.session.id,
      updates: {
        applicationCloseAt: toIso(values.applicationCloseAt!),
        applicationOpenAt: toIso(values.applicationOpenAt!),
        endAt: toIso(values.endAt!),
        renewalCloseAt: toIso(values.renewalCloseAt!),
        renewalOpenAt: toIso(values.renewalOpenAt!),
        startAt: toIso(values.startAt!),
      },
    });
    toast.success(t('common.toasts.academicSession.updated'));
    await navigateTo(localeRoute({ name: 'admin-root-academic-sessions' }));
  } catch (error) {
    handleFetchError(error, t, setErrors);
  }
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ $t('admin.academicSessions.editTitle') }}</CardTitle>
      <CardDescription>
        {{ $t('admin.academicSessions.editDescription') }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="onSubmit">
        <FieldGroup class="space-y-6">
          <!-- Session period -->
          <fieldset class="space-y-4">
            <legend class="text-sm font-semibold">
              {{ $t('admin.academicSessions.form.sessionPeriod') }}
            </legend>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <VeeField v-slot="{ errors, componentField }" name="startAt">
                <Field :data-invalid="!!errors.length">
                  <FieldLabel for="edit-session-start">
                    {{ $t('admin.academicSessions.form.start') }}
                    <span class="text-destructive" aria-hidden="true">*</span>
                  </FieldLabel>
                  <Input
                    id="edit-session-start"
                    type="datetime-local"
                    v-bind="componentField"
                    :aria-invalid="!!errors.length"
                    aria-required="true"
                  />
                  <FieldError v-if="errors.length" :errors="errors" />
                </Field>
              </VeeField>

              <VeeField v-slot="{ errors, componentField }" name="endAt">
                <Field :data-invalid="!!errors.length">
                  <FieldLabel for="edit-session-end">
                    {{ $t('admin.academicSessions.form.end') }}
                    <span class="text-destructive" aria-hidden="true">*</span>
                  </FieldLabel>
                  <Input
                    id="edit-session-end"
                    type="datetime-local"
                    v-bind="componentField"
                    :aria-invalid="!!errors.length"
                    aria-required="true"
                  />
                  <FieldError v-if="errors.length" :errors="errors" />
                </Field>
              </VeeField>
            </div>
          </fieldset>

          <!-- Application period -->
          <fieldset class="space-y-4">
            <legend class="text-sm font-semibold">
              {{ $t('admin.academicSessions.form.applicationPeriod') }}
            </legend>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <VeeField
                v-slot="{ errors, componentField }"
                name="applicationOpenAt"
              >
                <Field :data-invalid="!!errors.length">
                  <FieldLabel for="edit-application-open">
                    {{ $t('admin.academicSessions.form.open') }}
                    <span class="text-destructive" aria-hidden="true">*</span>
                  </FieldLabel>
                  <Input
                    id="edit-application-open"
                    type="datetime-local"
                    v-bind="componentField"
                    :aria-invalid="!!errors.length"
                    aria-required="true"
                  />
                  <FieldError v-if="errors.length" :errors="errors" />
                </Field>
              </VeeField>

              <VeeField
                v-slot="{ errors, componentField }"
                name="applicationCloseAt"
              >
                <Field :data-invalid="!!errors.length">
                  <FieldLabel for="edit-application-close">
                    {{ $t('admin.academicSessions.form.close') }}
                    <span class="text-destructive" aria-hidden="true">*</span>
                  </FieldLabel>
                  <Input
                    id="edit-application-close"
                    type="datetime-local"
                    v-bind="componentField"
                    :aria-invalid="!!errors.length"
                    aria-required="true"
                  />
                  <FieldError v-if="errors.length" :errors="errors" />
                </Field>
              </VeeField>
            </div>
          </fieldset>

          <!-- Renewal period -->
          <fieldset class="space-y-4">
            <legend class="text-sm font-semibold">
              {{ $t('admin.academicSessions.form.renewalPeriod') }}
            </legend>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <VeeField
                v-slot="{ errors, componentField }"
                name="renewalOpenAt"
              >
                <Field :data-invalid="!!errors.length">
                  <FieldLabel for="edit-renewal-open">
                    {{ $t('admin.academicSessions.form.open') }}
                    <span class="text-destructive" aria-hidden="true">*</span>
                  </FieldLabel>
                  <Input
                    id="edit-renewal-open"
                    type="datetime-local"
                    v-bind="componentField"
                    :aria-invalid="!!errors.length"
                    aria-required="true"
                  />
                  <FieldError v-if="errors.length" :errors="errors" />
                </Field>
              </VeeField>

              <VeeField
                v-slot="{ errors, componentField }"
                name="renewalCloseAt"
              >
                <Field :data-invalid="!!errors.length">
                  <FieldLabel for="edit-renewal-close">
                    {{ $t('admin.academicSessions.form.close') }}
                    <span class="text-destructive" aria-hidden="true">*</span>
                  </FieldLabel>
                  <Input
                    id="edit-renewal-close"
                    type="datetime-local"
                    v-bind="componentField"
                    :aria-invalid="!!errors.length"
                    aria-required="true"
                  />
                  <FieldError v-if="errors.length" :errors="errors" />
                </Field>
              </VeeField>
            </div>
          </fieldset>

          <Field>
            <Button type="submit" :disabled="isSubmitting" class="w-min!">
              <Icon
                v-if="isSubmitting"
                name="mdi:loading"
                class="animate-spin"
              />
              <Icon v-else name="mdi:content-save" />
              {{ $t('forms.buttons.save') }}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </CardContent>
  </Card>
</template>
