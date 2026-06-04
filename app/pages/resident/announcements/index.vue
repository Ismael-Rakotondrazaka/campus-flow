<script setup lang="ts">
import AnnouncementList from '~/features/residents/announcements/components/AnnouncementList.vue';
</script>

<template>
  <div class="container mx-auto p-2">
    <h1 class="mb-4 text-2xl font-bold">
      {{ $t('resident.announcements.listTitle') }}
    </h1>
    <AnnouncementList />
  </div>
</template>
