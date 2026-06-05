<script setup lang="ts">
import AdminList from '~/features/admin/admins/AdminList.vue';
</script>

<template>
  <div class="container mx-auto p-2">
    <div class="mb-4">
      <h1 class="text-2xl font-bold">{{ $t('admin.admins.manageTitle') }}</h1>
    </div>
    <AdminList />
  </div>
</template>
