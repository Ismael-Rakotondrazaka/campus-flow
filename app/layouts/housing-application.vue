<script setup lang="ts">
import { SidebarProvider } from '~/components/ui/sidebar';
import HousingApplicationSidebar from '~/features/housing-application/sidebars/components/HousingApplicationSidebar.vue';
</script>

<template>
  <SidebarProvider>
    <HousingApplicationSidebar />

    <main class="h-full w-full">
      <HeaderAuthWrapper />
      <slot />
    </main>
  </SidebarProvider>
</template>
