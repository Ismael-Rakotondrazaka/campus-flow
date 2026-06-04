<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() =>
  locales.value.filter(l => l.code !== locale.value)
);

const currentLocale = computed(() =>
  locales.value.find(l => l.code === locale.value)
);
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="sm" class="gap-1.5">
        <Icon name="mdi:translate" class="size-4" />
        <span class="text-xs font-medium uppercase">{{
          currentLocale?.code
        }}</span>
        <Icon name="mdi:chevron-down" class="size-3 opacity-60" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="min-w-32">
      <DropdownMenuItem v-for="l in availableLocales" :key="l.code" as-child>
        <NuxtLink :to="switchLocalePath(l.code)" class="cursor-pointer">
          <Icon name="mdi:translate" class="size-4 opacity-60" />
          {{ l.name }}
        </NuxtLink>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
