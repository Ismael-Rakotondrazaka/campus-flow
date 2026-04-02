<script setup lang="ts">
import 'vue-sonner/style.css';
import { PiniaColadaDevtools } from '@pinia/colada-devtools';

import { Toaster } from '@/components/ui/sonner';
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster />
    <PiniaColadaDevtools />
  </NuxtLayout>
</template>
