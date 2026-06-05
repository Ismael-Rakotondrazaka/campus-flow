<template>
  <section class="mx-6 mb-24 lg:mx-16">
    <div
      class="bg-primary relative overflow-hidden rounded-3xl px-10 py-16 text-center lg:py-20"
    >
      <div
        class="absolute -top-16 -right-16 h-72 w-72 rounded-full bg-white/6"
      />
      <div
        class="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-white/6"
      />
      <div
        class="absolute top-1/2 right-1/3 h-40 w-40 -translate-y-1/2 rounded-full bg-white/4"
      />

      <div class="relative">
        <h2
          class="font-display mb-4 text-4xl leading-tight font-bold text-white lg:text-5xl"
        >
          {{ $t('home.cta.title.line1') }}<br />{{ $t('home.cta.title.line2') }}
        </h2>
        <p class="mx-auto mb-8 max-w-md text-white/70">
          {{ $t('home.cta.subtitle') }}
        </p>
        <NuxtLinkLocale :to="{ name: 'join-community' }" as-child>
          <Button
            size="lg"
            class="text-primary rounded-full bg-white px-10 font-semibold hover:bg-white/92"
          >
            {{ $t('home.cta.button') }}
            <Icon name="mdi:arrow-right" class="ml-1" />
          </Button>
        </NuxtLinkLocale>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
