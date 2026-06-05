<script setup lang="ts">
import CreateAnnouncementForm from '~/features/admin/announcements/CreateAnnouncementForm.vue';
</script>

<template>
  <div class="container mx-auto p-2">
    <h1 class="mb-4 text-2xl font-bold">
      {{ $t('admin.announcements.createNew') }}
    </h1>
    <CreateAnnouncementForm />
  </div>
</template>
