<script setup lang="ts">
const user = useSupabaseUser();
</script>
<template>
  <HeaderPublic v-if="!user" />
  <HeaderAuth v-else />
</template>
