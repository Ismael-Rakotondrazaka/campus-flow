<script setup lang="ts">
import { useUserFullname } from '~/features/shared/users/composables/useUserFullname';

const user = useSupabaseUser();

const fullname = useUserFullname(() => ({
  first_name: user?.value?.app_metadata?.first_name,
  last_name: user?.value?.app_metadata?.last_name,
}));
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Tableau de bord</h1>
    <p class="text-muted-foreground text-sm">Bienvenue, {{ fullname }}</p>
  </div>
</template>
