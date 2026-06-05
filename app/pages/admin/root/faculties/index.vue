<script setup lang="ts">
import FacultyList from '~/features/admin/faculties/FacultyList.vue';
</script>

<template>
  <div class="container mx-auto p-2">
    <h1 class="mb-4 text-2xl font-bold">
      {{ $t('admin.faculties.listTitle') }}
    </h1>
    <FacultyList />
  </div>
</template>
