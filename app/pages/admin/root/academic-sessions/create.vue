<script setup lang="ts">
import CreateAcademicSessionForm from '~/features/admin/academic-sessions/CreateAcademicSessionForm.vue';
</script>

<template>
  <div class="container mx-auto p-2">
    <h1 class="mb-4 text-2xl font-bold">
      {{ $t('admin.academicSessions.createTitle') }}
    </h1>
    <CreateAcademicSessionForm />
  </div>
</template>
