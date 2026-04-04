<script setup lang="ts">
import { SidebarProvider } from '@/components/ui/sidebar';
import RootSidebar from '@/features/root/sidebars/components/RootSidebar.vue';
</script>

<template>
  <SidebarProvider>
    <RootSidebar />

    <main class="h-full w-full">
      <HeaderAuthWrapper />
      <slot />
    </main>
  </SidebarProvider>
</template>
