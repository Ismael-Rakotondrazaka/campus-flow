<script setup lang="ts">
import AcademicSessionTable from '~/features/admin/academic-sessions/AcademicSessionTable.vue';
</script>

<template>
  <div class="container mx-auto p-2">
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold">
        {{ $t('admin.academicSessions.manageTitle') }}
      </h1>
      <NuxtLinkLocale
        :to="{ name: 'admin-root-academic-sessions-create' }"
        as-child
      >
        <Button variant="default">
          <Icon name="mdi:plus" />
          {{ $t('admin.academicSessions.createNew') }}
        </Button>
      </NuxtLinkLocale>
    </div>
    <AcademicSessionTable />
  </div>
</template>
