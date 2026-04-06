<script setup lang="ts">
import HeaderWithGlobalAcademicSessionSelect from '~/features/admin/commons/HeaderWithGlobalAcademicSessionSelect.vue';
import HousingApplicationsTable from '~/features/admin/housing-applications/HousingApplicationsTable.vue';
</script>

<template>
  <div class="container mx-auto p-2">
    <HeaderWithGlobalAcademicSessionSelect>
      <h1 class="text-2xl font-bold">Gestion des demandes de logement</h1>
    </HeaderWithGlobalAcademicSessionSelect>
    <HousingApplicationsTable />
  </div>
</template>
