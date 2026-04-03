<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
</script>

<template>
  <header class="w-full border-b p-2">
    <nav class="flex items-center justify-between gap-4">
      <SidebarTrigger />
      <div class="flex items-center gap-2">
        <DropdownMenu>
          <HeaderDropdownMenuAvatar />

          <DropdownMenuContent class="w-56" align="start">
            <slot v-if="$slots.default" />

            <DropdownMenuSeparator v-if="$slots.default" />

            <HeaderDropdownMenuLogout />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  </header>
</template>
