<script setup lang="ts">
import { type CreateMaintainer, CreateMaintainerSchema } from '#imports';
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
import { useCreateMaintainer } from '~/features/shared/maintainers/maintainer.query';

const createMutation = useCreateMaintainer();
const localeRoute = useLocaleRoute();

const { t } = useI18n();

const { handleSubmit, isSubmitting, setErrors } = useForm({
  initialValues: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
  },
  validationSchema: toTypedSchema(
    CreateMaintainerSchema.omit({ imageUrl: true })
  ),
});

const onSubmit = handleSubmit(
  async (formValues: Omit<CreateMaintainer, 'imageUrl'>) => {
    try {
      await createMutation.mutation(formValues);
      toast.success(t('common.toasts.maintainer.created'));
      await navigateTo(localeRoute({ name: 'admin-maintenance-maintainers' }));
    } catch (error) {
      handleFetchError(error, t, setErrors);
    }
  }
);
</script>

<template>
  <div class="w-full space-y-4">
    <Card>
      <CardHeader>
        <CardTitle>{{ $t('admin.maintainers.formInfoTitle') }}</CardTitle>
        <CardDescription>
          {{ $t('admin.maintainers.createDescription') }}
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
                <Icon name="mdi:account-plus" />
                {{ $t('common.buttons.create') }}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
