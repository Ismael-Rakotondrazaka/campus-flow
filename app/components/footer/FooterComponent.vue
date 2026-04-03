<script lang="ts" setup></script>

<template>
  <footer class="border-t px-2 py-6">
    <div class="container mx-auto">
      <div class="mb-4 flex items-start justify-between">
        <p class="text-primary text-2xl font-bold">Lumièrebourg</p>
        <!-- TODO: Add footer links -->
        <div class="flex-items-center justify-center gap-4">
          <NuxtLink to="#" as-child>
            <Button variant="link">Contact</Button>
          </NuxtLink>
          <NuxtLink to="#" as-child>
            <Button variant="link">Services disponibles</Button>
          </NuxtLink>
          <NuxtLink to="#" as-child>
            <Button variant="link">Règlements et politiques</Button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
