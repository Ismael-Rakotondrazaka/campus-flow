<template>
  <section class="relative flex min-h-[92svh] flex-col overflow-hidden">
    <div class="absolute inset-0 z-0">
      <NuxtImg
        src="/images/illustrations/building-visual.jpg"
        :alt="$t('home.hero.imageAlt')"
        class="h-full w-full object-cover"
        width="1920"
        height="1080"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent"
      />
      <div class="grain-overlay absolute inset-0 opacity-[0.18]" />
    </div>

    <div
      class="relative z-10 flex flex-1 flex-col justify-center px-6 py-20 lg:px-16"
    >
      <div class="max-w-4xl">
        <span
          class="hero-badge mb-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm text-white/85 backdrop-blur-sm"
        >
          <span class="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
          {{ $t('home.hero.badge') }}
        </span>

        <h1
          class="hero-title font-display mb-6 text-5xl leading-[1.08] font-bold tracking-tight text-white lg:text-7xl xl:text-[5.5rem]"
        >
          {{ $t('home.hero.title.line1') }}<br />
          <em class="text-amber-300 not-italic">{{
            $t('home.hero.title.emphasis')
          }}</em
          ><br />
          {{ $t('home.hero.title.line2') }}
        </h1>

        <p
          class="hero-subtitle mb-10 max-w-md text-base leading-relaxed text-white/75 lg:text-lg"
        >
          {{ $t('home.hero.subtitle') }}
        </p>

        <div class="hero-cta flex flex-wrap gap-3">
          <NuxtLinkLocale :to="{ name: 'join-community' }" as-child>
            <Button
              size="lg"
              class="rounded-full bg-white px-8 font-semibold text-gray-900 shadow-lg hover:bg-white/92"
            >
              {{ $t('home.hero.cta.join') }}
              <Icon name="mdi:arrow-right" class="ml-1" />
            </Button>
          </NuxtLinkLocale>
          <NuxtLinkLocale :to="{ name: 'login' }" as-child>
            <Button
              size="lg"
              variant="outline"
              class="rounded-full border-white/40 bg-white/8 px-8 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
            >
              {{ $t('home.hero.cta.signIn') }}
            </Button>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>

    <div class="relative z-10 px-6 pb-10 lg:px-16">
      <div
        class="stats-strip flex w-fit flex-wrap divide-x divide-white/20 overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md"
      >
        <div v-for="stat in stats" :key="stat.labelKey" class="px-8 py-5">
          <p class="font-display text-3xl font-bold text-white">
            {{ stat.value }}
          </p>
          <p class="mt-0.5 text-sm text-white/65">{{ $t(stat.labelKey) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { labelKey: 'home.hero.stats.students', value: '580' },
  { labelKey: 'home.hero.stats.rooms', value: '150' },
  { labelKey: 'home.hero.stats.location', value: 'Paris' },
];
</script>

<style scoped>
.grain-overlay {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  background-repeat: repeat;
  mix-blend-mode: overlay;
}

.hero-badge {
  animation: fade-up 0.6s ease both;
}
.hero-title {
  animation: fade-up 0.7s 0.1s ease both;
}
.hero-subtitle {
  animation: fade-up 0.7s 0.2s ease both;
}
.hero-cta {
  animation: fade-up 0.7s 0.3s ease both;
}
.stats-strip {
  animation: fade-up 0.7s 0.45s ease both;
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
