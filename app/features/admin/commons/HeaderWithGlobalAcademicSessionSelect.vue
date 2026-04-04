<script lang="ts" setup>
import GlobalAcademicSessionSelect from '~/features/shared/academic-sessions/components/GlobalAcademicSessionSelect.vue';
</script>

<template>
  <div
    class="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
  >
    <slot />

    <GlobalAcademicSessionSelect />
  </div>
</template>
