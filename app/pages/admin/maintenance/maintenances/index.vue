<script setup lang="ts">
import MaintenancesTable from '~/features/admin/maintenances/MaintenancesTable.vue';
</script>

<template>
  <div class="container mx-auto p-2">
    <h1 class="mb-4 text-2xl font-bold">
      {{ $t('admin.maintenances.manageTitle') }}
    </h1>
    <MaintenancesTable />
  </div>
</template>
