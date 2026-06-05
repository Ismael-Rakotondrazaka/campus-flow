<template>
  <div>
    <HomeHero />
    <HomeFeatures />
    <HomeTestimonials />
    <HomeAnnouncements />
    <HomeMap />
    <HomeCta />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  description: () => t('home.seo.description'),
  ogDescription: () => t('home.seo.description'),
  ogImage: '/images/og-campus-flow.png',
  ogTitle: () => t('home.seo.title'),
  title: () => t('home.seo.title'),
});
</script>
