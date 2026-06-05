<script setup lang="ts">
import { useUserFullname } from '~/features/shared/users/composables/useUserFullname';

const { user: authUser } = useUserSession();

const fullname = useUserFullname(() => authUser.value ?? {});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">{{ $t('dashboard.admin.title') }}</h1>
    <p class="text-muted-foreground text-sm">
      {{ $t('dashboard.admin.greeting', { name: fullname }) }}
    </p>
  </div>
</template>
