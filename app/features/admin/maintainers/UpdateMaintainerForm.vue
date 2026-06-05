<script setup lang="ts">
import { type Maintainer, UpdateMaintainerSchema } from '#imports';
import { toast } from 'vue-sonner';

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
import { useUpdateMaintainer } from '~/features/shared/maintainers/maintainer.query';

interface Props {
  maintainer: Serialize<Maintainer>;
}

const props = defineProps<Props>();

const updateMutation = useUpdateMaintainer();
const localeRoute = useLocaleRoute();

const { t } = useI18n();

const { handleSubmit, isSubmitting, setErrors, setFieldValue } = useForm({
  initialValues: {
    firstName: props.maintainer.firstName,
    lastName: props.maintainer.lastName,
    phoneNumber: props.maintainer.phoneNumber,
  },
  validationSchema: toTypedSchema(
    UpdateMaintainerSchema.omit({ imageUrl: true })
  ),
});

watch(
  () => props.maintainer,
  m => {
    setFieldValue('firstName', m.firstName);
    setFieldValue('lastName', m.lastName);
    setFieldValue('phoneNumber', m.phoneNumber);
  }
);

const onSubmit = handleSubmit(async formValues => {
  try {
    await updateMutation.mutation({
      id: props.maintainer.id,
      updates: formValues,
    });
    toast.success(t('common.toasts.maintainer.updated'));
    await navigateTo(localeRoute({ name: 'admin-maintenance-maintainers' }));
  } catch (error) {
    handleFetchError(error, t, setErrors);
  }
});
</script>

<template>
  <div class="w-full space-y-4">
    <Card>
      <CardHeader>
        <CardTitle>{{ $t('admin.maintainers.editTitle') }}</CardTitle>
        <CardDescription>
          Modifiez les informations du mainteneur.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="onSubmit">
          <FieldGroup class="space-y-4">
            <VeeField v-slot="{ errors, componentField }" name="firstName">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="maintainer-firstName">
                  {{ $t('joinCommunity.form.firstName') }}
                  <span class="text-destructive" aria-hidden="true"> *</span>
                </FieldLabel>
                <Input
                  id="maintainer-firstName"
                  v-bind="componentField"
                  aria-required="true"
                  :aria-invalid="!!errors.length"
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>

            <VeeField v-slot="{ errors, componentField }" name="lastName">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="maintainer-lastName">
                  {{ $t('joinCommunity.form.lastName') }}
                  <span class="text-destructive" aria-hidden="true"> *</span>
                </FieldLabel>
                <Input
                  id="maintainer-lastName"
                  v-bind="componentField"
                  aria-required="true"
                  :aria-invalid="!!errors.length"
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>

            <VeeField v-slot="{ errors, componentField }" name="phoneNumber">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="maintainer-phoneNumber">
                  {{ $t('common.cards.phone') }}
                  <span class="text-destructive" aria-hidden="true"> *</span>
                </FieldLabel>
                <Input
                  id="maintainer-phoneNumber"
                  v-bind="componentField"
                  aria-required="true"
                  :aria-invalid="!!errors.length"
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>

            <Field>
              <Button class="w-min!" type="submit" :disabled="isSubmitting">
                <Icon name="mdi:content-save" />
                {{ $t('forms.buttons.save') }}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
