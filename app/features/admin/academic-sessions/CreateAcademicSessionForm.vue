<script setup lang="ts">
import type { CreateAcademicSession } from '#imports';

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
import { useCreateAcademicSession } from '~/features/shared/academic-sessions/academic-session.query';

const toIso = (local: string) => new Date(local).toISOString();

const { t } = useI18n();

const { handleSubmit, isSubmitting, setErrors } = useForm({
  validationSchema: toTypedSchema(
    CreateAcademicSessionSchema.extend({
      applicationCloseAt: z.string().min(1),
      applicationOpenAt: z.string().min(1),
      endAt: z.string().min(1),
      renewalCloseAt: z.string().min(1),
      renewalOpenAt: z.string().min(1),
      startAt: z.string().min(1),
    })
  ),
});

const createMutation = useCreateAcademicSession();

const localeRoute = useLocaleRoute();

const onSubmit = handleSubmit(async (values: CreateAcademicSession) => {
  try {
    await createMutation.mutation({
      applicationCloseAt: toIso(values.applicationCloseAt),
      applicationOpenAt: toIso(values.applicationOpenAt),
      endAt: toIso(values.endAt),
      renewalCloseAt: toIso(values.renewalCloseAt),
      renewalOpenAt: toIso(values.renewalOpenAt),
      startAt: toIso(values.startAt),
    });
    toast.success(t('common.toasts.academicSession.created'));
    await navigateTo(localeRoute({ name: 'admin-root-academic-sessions' }));
  } catch (error) {
    handleFetchError(error, t, setErrors);
  }
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ $t('admin.academicSessions.formNewTitle') }}</CardTitle>
      <CardDescription>
        {{ $t('admin.academicSessions.createDescription') }}
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
                  <FieldLabel for="create-session-start">
                    {{ $t('admin.academicSessions.form.start') }}
                    <span class="text-destructive" aria-hidden="true">*</span>
                  </FieldLabel>
                  <Input
                    id="create-session-start"
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
                  <FieldLabel for="create-session-end">
                    {{ $t('admin.academicSessions.form.end') }}
                    <span class="text-destructive" aria-hidden="true">*</span>
                  </FieldLabel>
                  <Input
                    id="create-session-end"
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
                  <FieldLabel for="create-application-open">
                    {{ $t('admin.academicSessions.form.open') }}
                    <span class="text-destructive" aria-hidden="true">*</span>
                  </FieldLabel>
                  <Input
                    id="create-application-open"
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
                  <FieldLabel for="create-application-close">
                    {{ $t('admin.academicSessions.form.close') }}
                    <span class="text-destructive" aria-hidden="true">*</span>
                  </FieldLabel>
                  <Input
                    id="create-application-close"
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
                  <FieldLabel for="create-renewal-open">
                    {{ $t('admin.academicSessions.form.open') }}
                    <span class="text-destructive" aria-hidden="true">*</span>
                  </FieldLabel>
                  <Input
                    id="create-renewal-open"
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
                  <FieldLabel for="create-renewal-close">
                    {{ $t('admin.academicSessions.form.close') }}
                    <span class="text-destructive" aria-hidden="true">*</span>
                  </FieldLabel>
                  <Input
                    id="create-renewal-close"
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
