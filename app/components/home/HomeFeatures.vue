<template>
  <section class="bg-background px-6 py-24 lg:px-16">
    <div class="mx-auto max-w-6xl">
      <div
        class="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <div>
          <span
            class="text-primary mb-3 block text-xs font-bold tracking-[0.2em] uppercase"
          >
            {{ $t('home.features.eyebrow') }}
          </span>
          <h2
            class="font-display text-foreground text-4xl leading-tight font-bold lg:text-5xl"
          >
            {{ $t('home.features.title.line1') }}<br />{{
              $t('home.features.title.line2')
            }}
          </h2>
        </div>
        <p class="text-muted-foreground max-w-sm">
          {{ $t('home.features.intro') }}
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div
          v-for="feature in features"
          :key="feature.titleKey"
          class="feature-card group bg-card hover:border-primary/30 hover:shadow-primary/8 relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div
            class="via-primary absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          <div
            class="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-200"
          >
            <Icon :name="feature.icon" class="h-5 w-5" />
          </div>
          <h3 class="font-display text-foreground mb-3 text-xl font-semibold">
            {{ $t(feature.titleKey) }}
          </h3>
          <p class="text-muted-foreground leading-relaxed">
            {{ $t(feature.descriptionKey) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    descriptionKey: 'home.features.items.comfort.description',
    icon: 'mdi:home-city-outline',
    titleKey: 'home.features.items.comfort.title',
  },
  {
    descriptionKey: 'home.features.items.community.description',
    icon: 'mdi:account-group-outline',
    titleKey: 'home.features.items.community.title',
  },
  {
    descriptionKey: 'home.features.items.services.description',
    icon: 'mdi:tools',
    titleKey: 'home.features.items.services.title',
  },
];
</script>

<style scoped>
.feature-card {
  animation: fade-up 0.6s ease both;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
