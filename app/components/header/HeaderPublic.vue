<template>
  <header class="border-b p-2">
    <nav
      class="container mx-auto flex w-full items-center justify-between gap-4"
    >
      <div class="flex items-center">
        <NuxtLinkLocale :to="{ name: 'index' }" as-child>
          <Button variant="ghost">
            <span
              class="text-primary sr-only text-base font-bold md:not-sr-only"
              >{{ $t('header.brand.name') }}</span
            >
          </Button>
        </NuxtLinkLocale>
      </div>

      <div class="flex items-center gap-2">
        <HeaderLocaleSwitcher />

        <NuxtLinkLocale :to="{ name: 'login' }">
          <Button variant="ghost">
            <span>{{ $t('header.end.signIn') }}</span>
          </Button>
        </NuxtLinkLocale>

        <NuxtLinkLocale :to="{ name: 'join-community' }">
          <Button variant="default" class="rounded-full">
            <span>{{ $t('header.end.joinCommunity') }}</span>
            <Icon name="mdi:arrow-right" />
          </Button>
        </NuxtLinkLocale>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts"></script>
