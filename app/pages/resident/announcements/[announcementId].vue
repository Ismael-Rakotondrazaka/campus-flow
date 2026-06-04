<script setup lang="ts">
import AnnouncementDetail from '~/features/residents/announcements/components/AnnouncementDetail.vue';

const route = useRoute();
</script>

<template>
  <div class="container mx-auto p-2">
    <AnnouncementDetail
      :announcement-id="route.params.announcementId as string"
    />
  </div>
</template>
