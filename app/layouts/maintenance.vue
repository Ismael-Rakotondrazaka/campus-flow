<script setup lang="ts">
import { SidebarProvider } from '~/components/ui/sidebar';
import MaintenanceSidebar from '~/features/maintenance/sidebars/components/MaintenanceSidebar.vue';
</script>

<template>
  <SidebarProvider>
    <MaintenanceSidebar />

    <main class="h-full w-full">
      <HeaderAuthWrapper />
      <slot />
    </main>
  </SidebarProvider>
</template>
