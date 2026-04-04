<script setup lang="ts">
import HeaderWithGlobalAcademicSessionSelect from '~/features/admin/commons/HeaderWithGlobalAcademicSessionSelect.vue';
import DashboardGreeting from '~/features/admin/dashboard/components/DashboardGreeting.vue';
import HousingApplicationKPICard from '~/features/admin/dashboard/components/HousingApplicationKPICard.vue';
import MaintenanceKPICard from '~/features/admin/dashboard/components/MaintenanceKPICard.vue';
import RenewalKPICard from '~/features/admin/dashboard/components/RenewalKPICard.vue';
import ResidentKPICard from '~/features/admin/dashboard/components/ResidentKPICard.vue';
import RecentHousingApplicationsTable from '~/features/admin/housing-applications/RecentHousingApplicationsTable.vue';
</script>

<template>
  <div class="container mx-auto px-2">
    <HeaderWithGlobalAcademicSessionSelect>
      <DashboardGreeting />
    </HeaderWithGlobalAcademicSessionSelect>

    <div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <HousingApplicationKPICard />
      <RenewalKPICard />
      <MaintenanceKPICard />
      <ResidentKPICard />
    </div>

    <RecentHousingApplicationsTable class="mb-4" />
  </div>
</template>
