<script setup lang="ts">
import { SidebarProvider } from '~/components/ui/sidebar';
import ResidentSidebar from '~/features/residents/sidebars/components/ResidentSidebar.vue';
</script>

<template>
  <SidebarProvider>
    <ResidentSidebar />

    <main class="h-full w-full">
      <HeaderAuthWrapper />
      <slot />
    </main>
  </SidebarProvider>
</template>
