<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui';

import {
  CreateMaintenanceSchema,
  MaintenanceTypeLabel,
  MaintenanceTypes,
} from '#shared/features/maintenances';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Textarea } from '~/components/ui/textarea';
import { useCreateMaintenance } from '~/features/shared/maintenances/maintenance.query';
import { residentByIdQuery } from '~/features/shared/residents/resident.query';

const { user: authUser } = useUserSession();
const localeRoute = useLocaleRoute();

const { data: residentData } = useQuery(() =>
  residentByIdQuery({ id: authUser.value!.id })
);

const resident = computed(() => residentData.value ?? null);

const createMutation = useCreateMaintenance();

const { t } = useI18n();

const { handleSubmit, isSubmitting, setErrors, setFieldValue, values } =
  useForm({
    initialValues: {
      description: '',
      type: '' as (typeof MaintenanceTypes)[number],
    },
    validationSchema: toTypedSchema(
      CreateMaintenanceSchema.omit({ lodgmentId: true })
    ),
  });

const onTypeChange = (value: AcceptableValue) => {
  setFieldValue('type', value as (typeof MaintenanceTypes)[number]);
};

const onSubmit = handleSubmit(async formValues => {
  const lodgmentId = resident.value?.lodgmentId;

  if (!lodgmentId) {
    toast.error(t('common.toasts.notAssignedToLodgment'));
    return;
  }

  try {
    await createMutation.mutation({
      description: formValues.description || null,
      lodgmentId,
      type: formValues.type,
    });
    toast.success(t('common.toasts.maintenance.submitted'));
    await navigateTo(localeRoute({ name: 'resident-maintenances' }));
  } catch (error) {
    handleFetchError(error, t, setErrors);
  }
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ t('resident.maintenances.createCardTitle') }}</CardTitle>
      <CardDescription>
        {{ t('resident.maintenances.form.cardDescription') }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div
        v-if="resident && !resident.lodgmentId"
        class="text-destructive mb-4 text-sm"
      >
        {{ t('resident.maintenances.form.notAssignedHint') }}
      </div>

      <form @submit.prevent="onSubmit">
        <FieldGroup class="space-y-4">
          <VeeField v-slot="{ errors }" name="type">
            <Field :data-invalid="!!errors.length">
              <FieldLabel for="maintenance-type">
                {{ t('resident.maintenances.form.typeLabel') }}
                <span class="text-destructive" aria-hidden="true"> *</span>
              </FieldLabel>
              <Select
                :model-value="values.type"
                @update:model-value="onTypeChange"
              >
                <SelectTrigger id="maintenance-type">
                  <SelectValue
                    :placeholder="
                      t('resident.maintenances.form.typePlaceholder')
                    "
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="type in MaintenanceTypes"
                      :key="type"
                      :value="type"
                    >
                      {{ MaintenanceTypeLabel[type] }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldError v-if="errors.length" :errors="errors" />
            </Field>
          </VeeField>

          <VeeField v-slot="{ errors, componentField }" name="description">
            <Field :data-invalid="!!errors.length">
              <FieldLabel for="maintenance-description">
                {{ t('common.cards.description') }}
              </FieldLabel>
              <Textarea
                id="maintenance-description"
                v-bind="componentField"
                :placeholder="
                  t('resident.maintenances.form.descriptionPlaceholderLong')
                "
                :aria-invalid="!!errors.length"
                rows="4"
              />
              <FieldError v-if="errors.length" :errors="errors" />
            </Field>
          </VeeField>

          <Field>
            <Button
              class="w-min!"
              type="submit"
              :disabled="isSubmitting || !resident?.lodgmentId"
            >
              <Icon name="mdi:send" />
              {{ t('resident.maintenances.form.submitRequest') }}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </CardContent>
  </Card>
</template>
