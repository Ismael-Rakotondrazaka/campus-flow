<script setup lang="ts">
import RenewalList from '~/features/residents/renewals/components/RenewalList.vue';
</script>

<template>
  <div class="container mx-auto p-2">
    <h1 class="mb-4 text-2xl font-bold">
      {{ $t('resident.renewals.listTitle') }}
    </h1>
    <RenewalList />
  </div>
</template>
