<script setup lang="ts">
import HeaderWithGlobalAcademicSessionSelect from '~/features/admin/commons/HeaderWithGlobalAcademicSessionSelect.vue';
import RenewalsTable from '~/features/admin/renewals/RenewalsTable.vue';
</script>

<template>
  <div class="container mx-auto p-2">
    <HeaderWithGlobalAcademicSessionSelect>
      <h1 class="text-2xl font-bold">{{ $t('admin.renewals.listTitle') }}</h1>
    </HeaderWithGlobalAcademicSessionSelect>
    <RenewalsTable />
  </div>
</template>
