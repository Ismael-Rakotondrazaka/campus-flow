<script setup lang="ts">
import MaintenanceDetail from '~/features/residents/maintenances/components/MaintenanceDetail.vue';

const route = useRoute();
</script>

<template>
  <div class="container mx-auto p-2">
    <MaintenanceDetail :maintenance-id="route.params.maintenanceId as string" />
  </div>
</template>
