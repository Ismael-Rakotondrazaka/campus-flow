<template>
  <div>
    <section
      class="bg-primary relative overflow-hidden px-6 py-20 text-white lg:px-16"
    >
      <div
        class="absolute -top-16 -right-16 h-72 w-72 rounded-full bg-white/6"
      />
      <div
        class="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-white/6"
      />
      <div
        class="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"
      />

      <div class="relative z-10 mx-auto max-w-4xl">
        <NuxtLinkLocale
          :to="{ name: 'index' }"
          class="mb-8 inline-flex items-center gap-2 text-xs font-medium tracking-widest text-white/50 uppercase transition-colors duration-200 hover:text-white"
        >
          <Icon name="mdi:arrow-left" class="h-3.5 w-3.5" />
          {{ $t('legal.backHome') }}
        </NuxtLinkLocale>

        <div
          class="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs text-white/80"
        >
          <span class="inline-block h-1.5 w-1.5 rounded-full bg-white" />
          {{ $t('legal.officialDocument') }}
        </div>

        <h1
          class="font-display mt-4 text-4xl leading-tight font-bold tracking-tight text-white lg:text-5xl"
        >
          {{ $t('legal.privacy.title') }}
        </h1>
        <p class="mt-4 text-base text-white/50">
          {{ $t('legal.privacy.subtitle') }}
        </p>
      </div>
    </section>

    <section class="mx-auto max-w-4xl px-6 py-16 lg:px-16">
      <div class="space-y-12">
        <div class="bg-card rounded-2xl border p-8">
          <p class="text-muted-foreground text-sm leading-relaxed">
            {{ $t('legal.privacy.intro') }}
          </p>
        </div>

        <article>
          <div class="mb-6 flex items-center gap-4">
            <span
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-sm font-bold text-amber-500"
            >
              1
            </span>
            <h2 class="font-display text-foreground text-xl font-semibold">
              {{ $t('legal.privacy.sections.controller.title') }}
            </h2>
          </div>
          <div class="text-muted-foreground space-y-3 text-sm leading-relaxed">
            <p>{{ $t('legal.privacy.sections.controller.p1') }}</p>
            <p>
              {{ $t('legal.privacy.sections.controller.p2') }}
              <a
                href="mailto:dpo@lumierebourg.fr"
                class="text-amber-600 underline-offset-2 hover:underline dark:text-amber-400"
              >
                dpo@lumierebourg.fr </a
              >.
            </p>
          </div>
        </article>

        <div class="border-t" />

        <article>
          <div class="mb-6 flex items-center gap-4">
            <span
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-sm font-bold text-amber-500"
            >
              2
            </span>
            <h2 class="font-display text-foreground text-xl font-semibold">
              {{ $t('legal.privacy.sections.collected.title') }}
            </h2>
          </div>
          <div class="text-muted-foreground space-y-4 text-sm leading-relaxed">
            <p>{{ $t('legal.privacy.sections.collected.intro') }}</p>
            <ul class="ml-4 space-y-2">
              <li
                v-for="(_, index) in 5"
                :key="index"
                class="flex items-start gap-2"
              >
                <span
                  class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400"
                />
                {{ $t(`legal.privacy.sections.collected.items.${index}`) }}
              </li>
            </ul>
          </div>
        </article>

        <div class="border-t" />

        <article>
          <div class="mb-6 flex items-center gap-4">
            <span
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-sm font-bold text-amber-500"
            >
              3
            </span>
            <h2 class="font-display text-foreground text-xl font-semibold">
              {{ $t('legal.privacy.sections.purposes.title') }}
            </h2>
          </div>
          <div class="text-muted-foreground space-y-4 text-sm leading-relaxed">
            <p>{{ $t('legal.privacy.sections.purposes.intro') }}</p>
            <ul class="ml-4 space-y-2">
              <li
                v-for="(_, index) in 4"
                :key="index"
                class="flex items-start gap-2"
              >
                <span
                  class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400"
                />
                {{ $t(`legal.privacy.sections.purposes.items.${index}`) }}
              </li>
            </ul>
            <p>{{ $t('legal.privacy.sections.purposes.outro') }}</p>
          </div>
        </article>

        <div class="border-t" />

        <article>
          <div class="mb-6 flex items-center gap-4">
            <span
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-sm font-bold text-amber-500"
            >
              4
            </span>
            <h2 class="font-display text-foreground text-xl font-semibold">
              {{ $t('legal.privacy.sections.retention.title') }}
            </h2>
          </div>
          <div class="text-muted-foreground space-y-3 text-sm leading-relaxed">
            <p>{{ $t('legal.privacy.sections.retention.p1') }}</p>
            <p>{{ $t('legal.privacy.sections.retention.p2') }}</p>
          </div>
        </article>

        <div class="border-t" />

        <article>
          <div class="mb-6 flex items-center gap-4">
            <span
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-sm font-bold text-amber-500"
            >
              5
            </span>
            <h2 class="font-display text-foreground text-xl font-semibold">
              {{ $t('legal.privacy.sections.rights.title') }}
            </h2>
          </div>
          <div class="text-muted-foreground space-y-4 text-sm leading-relaxed">
            <p>{{ $t('legal.privacy.sections.rights.intro') }}</p>
            <ul class="ml-4 space-y-2">
              <li
                v-for="rightKey in [
                  'access',
                  'rectification',
                  'erasure',
                  'portability',
                  'objection',
                ]"
                :key="rightKey"
                class="flex items-start gap-2"
              >
                <span
                  class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-400"
                />
                <span>
                  <strong class="text-foreground">
                    {{
                      $t(
                        `legal.privacy.sections.rights.items.${rightKey}.title`
                      )
                    }}
                  </strong>
                  —
                  {{
                    $t(`legal.privacy.sections.rights.items.${rightKey}.body`)
                  }}
                </span>
              </li>
            </ul>
            <p>
              {{ $t('legal.privacy.sections.rights.outro') }}
              <a
                href="mailto:dpo@lumierebourg.fr"
                class="text-amber-600 underline-offset-2 hover:underline dark:text-amber-400"
              >
                dpo@lumierebourg.fr </a
              >.
              {{ $t('legal.privacy.sections.rights.complaint') }}
            </p>
          </div>
        </article>

        <div class="rounded-2xl border border-amber-400/15 bg-amber-400/5 p-6">
          <p class="text-muted-foreground text-sm">
            {{ $t('legal.privacy.footer') }}
            <a
              href="mailto:contact@lumierebourg.fr"
              class="text-amber-600 underline-offset-2 hover:underline dark:text-amber-400"
            >
              contact@lumierebourg.fr </a
            >.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  description: () => t('legal.privacy.seoDescription'),
  title: () => t('legal.privacy.seoTitle'),
});
</script>

<style scoped></style>
