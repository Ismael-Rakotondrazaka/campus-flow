<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

import { toast } from 'vue-sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { LoginBodySchema } from '@/features/auth/auth.schema';
import { cn } from '@/lib/utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();

const { handleSubmit, isSubmitting, resetForm } = useForm({
  initialValues: {
    email: '',
    password: '',
  },
  validationSchema: toTypedSchema(LoginBodySchema),
});

const userSBClient = useSupabaseClient();
const redirectInfo = useSupabaseCookieRedirect();

const handleLogin = handleSubmit(async values => {
  const { error } = await userSBClient.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });

  if (error) {
    toast.error(getAuthErrorMessage(error));
    return;
  }

  toast.success('Login successful');

  setTimeout(() => {
    resetForm();
  }, 3000);

  const path = redirectInfo.pluck();
  navigateTo(path || '/');
});
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <h1 class="text-center text-2xl font-bold">Bienvenue !</h1>
    <p class="text-muted-foreground text-base">
      Nous sommes ravis que vous vous connectez à nouveau
    </p>

    <Card>
      <CardContent>
        <form id="login" method="POST" @submit="handleLogin">
          <FieldGroup>
            <VeeField v-slot="{ field, errors }" name="email">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="email">Email</FieldLabel>
                <Input
                  id="email"
                  v-bind="field"
                  type="email"
                  placeholder="email@example.com"
                  :aria-invalid="!!errors.length"
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>

            <VeeField v-slot="{ field, errors }" name="password">
              <Field :data-invalid="!!errors.length">
                <div class="flex items-center">
                  <FieldLabel for="password">Mot de passe</FieldLabel>
                  <NuxtLink
                    :to="{ name: 'password-reset' }"
                    class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Mot de passe oublié ?
                  </NuxtLink>
                </div>
                <Input
                  id="password"
                  v-bind="field"
                  type="password"
                  :aria-invalid="!!errors.length"
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>

            <Field>
              <Button type="submit" :disabled="isSubmitting">
                {{ isSubmitting ? 'Connexion...' : 'Se connecter' }}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
