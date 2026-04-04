<script setup lang="ts">
import DashboardGreeting from '~/features/admin/dashboard/components/DashboardGreeting.vue';
import MaintenanceKPICard from '~/features/admin/dashboard/components/MaintenanceKPICard.vue';
import RenewalKPICard from '~/features/admin/dashboard/components/RenewalKPICard.vue';
import ReservationKPICard from '~/features/admin/dashboard/components/ReservationKPICard.vue';
import ResidentKPICard from '~/features/admin/dashboard/components/ResidentKPICard.vue';
import RecentReservationsTable from '~/features/admin/reservations/RecentReservationsTable.vue';
import GlobalAcademicSessionSelect from '~/features/shared/academic-sessions/components/GlobalAcademicSessionSelect.vue';
</script>

<template>
  <div class="container mx-auto px-2">
    <div
      class="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <DashboardGreeting />
      <GlobalAcademicSessionSelect />
    </div>

    <div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ReservationKPICard />
      <RenewalKPICard />
      <MaintenanceKPICard />
      <ResidentKPICard />
    </div>

    <RecentReservationsTable class="mb-4" />
  </div>
</template>
