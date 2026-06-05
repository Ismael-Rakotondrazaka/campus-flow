<script lang="ts" setup>
const { t } = useI18n();
const currentYear = new Date().getFullYear();

const navLinks = computed(() => [
  { labelKey: 'footer.nav.home', to: { name: 'index' } },
  { labelKey: 'footer.nav.announcements', to: { name: 'announcements' } },
  { labelKey: 'footer.nav.joinCommunity', to: { name: 'join-community' } },
  { labelKey: 'footer.nav.signIn', to: { name: 'login' } },
]);

const infoLinks = computed(() => [
  { labelKey: 'footer.nav.rules', to: { name: 'reglement-interieur' } },
  {
    labelKey: 'footer.nav.privacy',
    to: { name: 'politique-de-confidentialite' },
  },
]);

const socials = [
  {
    href: 'https://twitter.com/lumierebourg',
    icon: 'mdi:twitter',
    label: 'Twitter',
  },
  {
    href: 'https://instagram.com/lumierebourg',
    icon: 'mdi:instagram',
    label: 'Instagram',
  },
  {
    href: 'https://linkedin.com/company/lumierebourg',
    icon: 'mdi:linkedin',
    label: 'LinkedIn',
  },
];
</script>

<template>
  <footer class="bg-primary relative overflow-hidden text-white">
    <div class="absolute -top-16 -right-16 h-72 w-72 rounded-full bg-white/6" />
    <div
      class="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-white/6"
    />
    <div
      class="absolute top-1/2 right-1/3 h-40 w-40 -translate-y-1/2 rounded-full bg-white/4"
    />

    <div class="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-10 lg:px-16">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <NuxtLinkLocale
            :to="{ name: 'index' }"
            class="group mb-5 inline-block"
          >
            <span
              class="font-display text-2xl font-bold tracking-tight text-white transition-opacity duration-200 group-hover:opacity-80"
            >
              {{ $t('common.brand.name') }}
            </span>
          </NuxtLinkLocale>

          <p class="mb-6 max-w-xs text-sm leading-relaxed text-white/80">
            {{ $t('footer.description') }}
          </p>

          <div class="mb-8 flex items-center gap-2 text-xs text-white/65">
            <Icon name="mdi:map-marker-outline" class="h-3.5 w-3.5 shrink-0" />
            <span>{{ $t('footer.location') }}</span>
          </div>

          <div class="flex items-center gap-3">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              :aria-label="social.label"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/25 bg-white/15 text-white/85 transition-all duration-200 hover:bg-white/25 hover:text-white"
            >
              <Icon :name="social.icon" class="h-4 w-4" />
            </a>
          </div>
        </div>

        <div class="lg:col-span-3">
          <p
            class="mb-5 text-xs font-bold tracking-[0.18em] text-white/70 uppercase"
          >
            {{ $t('footer.sections.navigation') }}
          </p>
          <ul class="space-y-3">
            <li v-for="link in navLinks" :key="link.labelKey">
              <NuxtLinkLocale
                :to="link.to"
                class="group/link flex items-center gap-2 text-sm text-white/85 transition-colors duration-200 hover:text-white"
              >
                <span
                  class="block h-px w-3 bg-white/40 transition-all duration-200 group-hover/link:w-5 group-hover/link:bg-white"
                />
                {{ t(link.labelKey) }}
              </NuxtLinkLocale>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-4">
          <p
            class="mb-5 text-xs font-bold tracking-[0.18em] text-white/70 uppercase"
          >
            {{ $t('footer.sections.info') }}
          </p>
          <ul class="mb-8 space-y-3">
            <li v-for="link in infoLinks" :key="link.labelKey">
              <NuxtLinkLocale
                :to="link.to"
                class="group/link flex items-center gap-2 text-sm text-white/85 transition-colors duration-200 hover:text-white"
              >
                <span
                  class="block h-px w-3 bg-white/40 transition-all duration-200 group-hover/link:w-5 group-hover/link:bg-white"
                />
                {{ t(link.labelKey) }}
              </NuxtLinkLocale>
            </li>
          </ul>

          <div class="space-y-2.5">
            <a
              href="mailto:contact@lumierebourg.fr"
              class="flex items-center gap-2.5 text-sm text-white/85 transition-colors duration-200 hover:text-white"
            >
              <Icon
                name="mdi:email-outline"
                class="h-4 w-4 shrink-0 text-white/65"
              />
              contact@lumierebourg.fr
            </a>
            <a
              href="tel:+33123456789"
              class="flex items-center gap-2.5 text-sm text-white/85 transition-colors duration-200 hover:text-white"
            >
              <Icon
                name="mdi:phone-outline"
                class="h-4 w-4 shrink-0 text-white/65"
              />
              +33 1 23 45 67 89
            </a>
          </div>
        </div>
      </div>

      <div
        class="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 sm:flex-row"
      >
        <p class="text-xs text-white/65">
          {{ $t('footer.copyright', { year: currentYear }) }}
        </p>
        <p class="text-xs text-white/50">
          {{ $t('footer.tagline') }}
        </p>
      </div>
    </div>
  </footer>
</template>
