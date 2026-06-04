<script setup lang="ts">
import HeaderWithGlobalAcademicSessionSelect from '~/features/admin/commons/HeaderWithGlobalAcademicSessionSelect.vue';
import DashboardGreeting from '~/features/admin/dashboard/components/DashboardGreeting.vue';
import RenewalKPICard from '~/features/admin/dashboard/components/RenewalKPICard.vue';
</script>

<template>
  <div class="container mx-auto p-2">
    <HeaderWithGlobalAcademicSessionSelect>
      <DashboardGreeting />
    </HeaderWithGlobalAcademicSessionSelect>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <RenewalKPICard />
    </div>
  </div>
</template>
