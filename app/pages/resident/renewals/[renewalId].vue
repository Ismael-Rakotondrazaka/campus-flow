<script setup lang="ts">
import RenewalDetail from '~/features/residents/renewals/components/RenewalDetail.vue';

const route = useRoute();
</script>

<template>
  <div class="container mx-auto p-2">
    <RenewalDetail :renewal-id="route.params.renewalId as string" />
  </div>
</template>
