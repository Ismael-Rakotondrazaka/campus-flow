<script setup lang="ts">
const { loggedIn } = useUserSession();
</script>
<template>
  <HeaderPublic v-if="!loggedIn" />
  <HeaderAuth v-else />
</template>
