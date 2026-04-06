<script setup lang="ts">
import HeaderWithGlobalAcademicSessionSelect from '~/features/admin/commons/HeaderWithGlobalAcademicSessionSelect.vue';
import ResidentsTable from '~/features/admin/residents/ResidentsTable.vue';
</script>

<template>
  <div class="container mx-auto p-2">
    <HeaderWithGlobalAcademicSessionSelect>
      <h1 class="text-2xl font-bold">Gestion des résidents</h1>
    </HeaderWithGlobalAcademicSessionSelect>
    <ResidentsTable />
  </div>
</template>
