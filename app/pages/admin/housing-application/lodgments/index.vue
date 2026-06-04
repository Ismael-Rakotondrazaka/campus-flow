<script setup lang="ts">
import LodgmentsTable from '~/features/admin/lodgments/LodgmentsTable.vue';
</script>

<template>
  <div class="container mx-auto p-2">
    <h1 class="mb-4 text-2xl font-bold">
      {{ $t('admin.lodgments.listTitle') }}
    </h1>
    <LodgmentsTable />
  </div>
</template>
