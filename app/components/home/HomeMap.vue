<template>
  <section class="px-6 pb-24 lg:px-16">
    <div class="mx-auto max-w-6xl">
      <div class="mb-8">
        <span
          class="text-primary mb-3 block text-xs font-bold tracking-[0.2em] uppercase"
        >
          {{ $t('home.map.eyebrow') }}
        </span>
        <h2 class="font-display text-foreground text-3xl font-bold">
          {{ $t('home.map.title') }}
        </h2>
      </div>
      <div class="overflow-hidden rounded-2xl border shadow-sm">
        <LMap
          style="height: 420px"
          :zoom="14"
          :center="[48.8566, 2.3522]"
          :use-global-leaflet="false"
        >
          <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            layer-type="base"
            name="OpenStreetMap"
          />
          <LMarker :lat-lng="[48.8566, 2.3522]" />
        </LMap>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
