<script setup lang="ts">
import { Button } from '~/components/ui/button';
import MaintainerList from '~/features/admin/maintainers/MaintainerList.vue';
</script>

<template>
  <div class="container mx-auto p-2">
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold">
        {{ $t('admin.maintainers.manageTitle') }}
      </h1>
      <Button as-child>
        <NuxtLinkLocale :to="{ name: 'admin-maintenance-maintainers-create' }">
          <Icon name="mdi:account-plus" />
          Nouveau mainteneur
        </NuxtLinkLocale>
      </Button>
    </div>
    <MaintainerList />
  </div>
</template>
