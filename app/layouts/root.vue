<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import RootSidebar from '@/features/root/sidebars/components/RootSidebar.vue';
</script>

<template>
  <SidebarProvider>
    <RootSidebar />
    <main>
      <SidebarTrigger />
      <slot />
    </main>
  </SidebarProvider>
</template>
