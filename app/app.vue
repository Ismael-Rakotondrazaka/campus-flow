<script setup lang="ts">
import 'vue-sonner/style.css';
import { PiniaColadaDevtools } from '@pinia/colada-devtools';

import { Toaster } from '~/components/ui/sonner';

useHead({
  titleTemplate: titleChunk =>
    titleChunk ? `${titleChunk} - Lumièrebourg` : 'Lumièrebourg',
});

useSeoMeta({
  ogImage: '/images/og-campus-flow.png',
  twitterCard: 'summary_large_image',
  twitterImage: '/images/og-campus-flow.png',
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster />
    <PiniaColadaDevtools />
  </NuxtLayout>
</template>
