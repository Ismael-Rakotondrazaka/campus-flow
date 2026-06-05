<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui';

import {
  type Admin,
  AdminRoleLabel,
  AdminRoles,
  UpdateAdminSchema,
} from '#imports';
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
import { useUpdateAdmin } from '~/features/shared/admins';

interface Props {
  admin: Serialize<Admin>;
}

const props = defineProps<Props>();

const updateMutation = useUpdateAdmin();
const localeRoute = useLocaleRoute();

const { t } = useI18n();

const { handleSubmit, isSubmitting, setErrors, setFieldValue, values } =
  useForm({
    initialValues: { role: props.admin.role },
    validationSchema: toTypedSchema(UpdateAdminSchema),
  });

watch(
  () => props.admin,
  a => setFieldValue('role', a.role)
);

const onRoleChange = (value: AcceptableValue) => {
  setFieldValue('role', value as Admin['role']);
};

const onSubmit = handleSubmit(async formValues => {
  try {
    await updateMutation.mutation({
      id: props.admin.id,
      updates: { role: formValues.role },
    });
    toast.success(t('common.toasts.admin.roleUpdated'));
    await navigateTo(localeRoute({ name: 'admin-root-admins' }));
  } catch (error) {
    handleFetchError(error, t, setErrors);
  }
});
</script>

<template>
  <div class="w-full space-y-4">
    <Card>
      <CardHeader>
        <CardTitle>{{ $t('admin.admins.editRoleTitle') }}</CardTitle>
        <CardDescription>
          {{ $t('admin.admins.editRoleDescription') }}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="onSubmit">
          <FieldGroup class="space-y-4">
            <VeeField v-slot="{ errors }" name="role">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="admin-role-select">
                  {{ $t('admin.tables.role') }}
                  <span class="text-destructive" aria-hidden="true">*</span>
                </FieldLabel>
                <Select
                  :model-value="values.role"
                  @update:model-value="onRoleChange"
                >
                  <SelectTrigger id="admin-role-select">
                    <SelectValue
                      :placeholder="$t('common.workflow.chooseRole')"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        v-for="role in AdminRoles"
                        :key="role"
                        :value="role"
                      >
                        {{ AdminRoleLabel[role] }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
