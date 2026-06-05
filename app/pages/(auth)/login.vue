<script lang="ts"></script>

<script setup lang="ts">
import LoginPage from '~/features/auth/pages/LoginPage.vue';

useSeoMeta({
  ogImage: '/images/og-openmind.png',
  robots: 'noindex, nofollow',
  title: 'Connexion',
  twitterCard: 'summary_large_image',
  twitterImage: '/images/og-openmind.png',
});
</script>

<template>
  <div class="min-h-svh py-2">
    <LoginPage />
  </div>
</template>
