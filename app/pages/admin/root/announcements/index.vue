<script setup lang="ts">
import AnnouncementCardList from '~/features/admin/announcements/AnnouncementCardList.vue';
</script>

<template>
  <div class="container mx-auto p-2">
    <h1 class="mb-4 text-2xl font-bold">Gestion des annonces</h1>
    <div class="mb-4">
      <NuxtLink :to="{ name: 'admin-root-announcements-create' }" as-child>
        <Button variant="default">
          <Icon name="mdi:plus" />
          Nouvelle annonce
        </Button>
      </NuxtLink>
    </div>
    <AnnouncementCardList />
  </div>
</template>
