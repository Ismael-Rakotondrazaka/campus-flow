<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

import { toast } from 'vue-sonner';

import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field';
import { Input } from '~/components/ui/input';
import { LoginBodySchema } from '~/features/auth/auth.schema';
import { cn } from '~/lib/utils';

import { loginWithCredentials } from '../auth.service';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();

const localeRoute = useLocaleRoute();
const { t } = useI18n();

const { fetch: refreshSession } = useUserSession();

const { handleSubmit, isSubmitting, resetForm, setErrors } = useForm({
  initialValues: {
    email: '',
    password: '',
  },
  validationSchema: toTypedSchema(LoginBodySchema),
});

const handleLogin = handleSubmit(async values => {
  try {
    await loginWithCredentials(values);

    await refreshSession();

    toast.success(t('auth.signIn.form.success'));

    setTimeout(() => {
      resetForm();
    }, 3000);

    await navigateTo(localeRoute({ name: 'index' }));
  } catch (error) {
    handleFetchError<LoginAuthRequest>(error, t, setErrors);
  }
});
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <h1 class="text-center text-2xl font-bold">
      {{ $t('auth.signIn.form.title') }}
    </h1>
    <p class="text-muted-foreground text-base">
      {{ $t('auth.signIn.form.subtitle') }}
    </p>

    <Card>
      <CardContent>
        <form id="login" method="POST" @submit="handleLogin">
          <FieldGroup>
            <VeeField v-slot="{ errors, componentField }" name="email">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="email">{{
                  $t('forms.fields.email.label')
                }}</FieldLabel>
                <Input
                  id="email"
                  v-bind="componentField"
                  type="email"
                  :placeholder="$t('forms.fields.email.placeholder')"
                  :aria-invalid="!!errors.length"
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>

            <VeeField v-slot="{ errors, componentField }" name="password">
              <Field :data-invalid="!!errors.length">
                <div class="flex items-center">
                  <FieldLabel for="password">{{
                    $t('forms.fields.password.label')
                  }}</FieldLabel>
                  <NuxtLinkLocale
                    :to="{ name: 'password-reset' }"
                    class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {{ $t('auth.signIn.form.forgotPassword') }}
                  </NuxtLinkLocale>
                </div>
                <Input
                  id="password"
                  v-bind="componentField"
                  type="password"
                  :aria-invalid="!!errors.length"
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>

            <Field>
              <Button type="submit" :disabled="isSubmitting">
                <Icon
                  v-if="isSubmitting"
                  name="mdi:loading"
                  class="animate-spin"
                />
                <Icon v-else name="mdi:login" />
                {{
                  isSubmitting
                    ? $t('auth.signIn.form.submitting')
                    : $t('auth.signIn.form.submit')
                }}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
