<script setup lang="ts">
import { Button } from '~/components/ui/button';
import CreateMaintainerForm from '~/features/admin/maintainers/CreateMaintainerForm.vue';
</script>

<template>
  <div class="container mx-auto p-2">
    <div class="mb-4">
      <Button variant="outline" size="sm" as-child>
        <NuxtLinkLocale :to="{ name: 'admin-maintenance-maintainers' }">
          <Icon name="mdi:arrow-left" />
          {{ $t('admin.maintainers.backToList') }}
        </NuxtLinkLocale>
      </Button>
    </div>
    <h1 class="mb-4 text-2xl font-bold">
      {{ $t('admin.maintainers.createNew') }}
    </h1>
    <CreateMaintainerForm />
  </div>
</template>
