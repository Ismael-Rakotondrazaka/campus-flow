<script setup lang="ts">
import { SidebarProvider } from '~/components/ui/sidebar';
import RenewalSidebar from '~/features/renewal/sidebars/components/RenewalSidebar.vue';
</script>

<template>
  <SidebarProvider>
    <RenewalSidebar />

    <main class="h-full w-full">
      <HeaderAuthWrapper />
      <slot />
    </main>
  </SidebarProvider>
</template>
