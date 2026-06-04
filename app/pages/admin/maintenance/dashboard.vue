<script setup lang="ts">
import DashboardGreeting from '~/features/admin/dashboard/components/DashboardGreeting.vue';
import MaintenanceKPICard from '~/features/admin/dashboard/components/MaintenanceKPICard.vue';
</script>

<template>
  <div class="container mx-auto p-2">
    <div class="mb-4">
      <DashboardGreeting />
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <MaintenanceKPICard />
    </div>
  </div>
</template>
