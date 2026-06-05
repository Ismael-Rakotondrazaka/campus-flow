<script setup lang="ts">
import BuildingCardList from '~/features/admin/buildings/BuildingCardList.vue';
</script>

<template>
  <div class="container mx-auto p-2">
    <h1 class="mb-4 text-2xl font-bold">
      {{ $t('admin.buildings.listTitle') }}
    </h1>
    <BuildingCardList />
  </div>
</template>
