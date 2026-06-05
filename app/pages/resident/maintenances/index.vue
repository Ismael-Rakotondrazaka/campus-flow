<script setup lang="ts">
import MaintenanceList from '~/features/residents/maintenances/components/MaintenanceList.vue';
</script>

<template>
  <div class="container mx-auto p-2">
    <h1 class="mb-4 text-2xl font-bold">
      {{ $t('resident.maintenances.listTitle') }}
    </h1>
    <MaintenanceList />
  </div>
</template>
