<script setup lang="ts">
import CreateMaintenanceForm from '~/features/residents/maintenances/components/CreateMaintenanceForm.vue';
</script>

<template>
  <div class="container mx-auto p-2">
    <h1 class="mb-4 text-2xl font-bold">
      {{ $t('resident.maintenances.createPageTitle') }}
    </h1>
    <CreateMaintenanceForm />
  </div>
</template>
