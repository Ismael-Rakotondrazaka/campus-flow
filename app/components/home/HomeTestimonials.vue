<template>
  <section class="bg-background overflow-hidden py-24">
    <div class="mx-auto mb-16 max-w-6xl px-6 lg:px-16">
      <div
        class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <div>
          <span
            class="text-primary mb-3 block text-xs font-bold tracking-[0.2em] uppercase"
          >
            {{ $t('home.testimonials.eyebrow') }}
          </span>
          <h2
            class="font-display text-foreground text-4xl leading-tight font-bold lg:text-5xl"
          >
            {{ $t('home.testimonials.title.line1') }}<br />{{
              $t('home.testimonials.title.line2')
            }}
          </h2>
        </div>
        <p class="text-muted-foreground max-w-sm">
          {{ $t('home.testimonials.intro') }}
        </p>
      </div>
    </div>

    <div class="relative">
      <div
        class="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-linear-to-r to-transparent"
      />
      <div
        class="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-linear-to-l to-transparent"
      />

      <div class="marquee-row mb-4">
        <div class="marquee-track marquee-track--forward">
          <HomeTestimonialCard
            v-for="(item, i) in [...row1, ...row1]"
            :key="`r1-${i}`"
            v-bind="item"
          />
        </div>
      </div>

      <div class="marquee-row">
        <div class="marquee-track marquee-track--reverse">
          <HomeTestimonialCard
            v-for="(item, i) in [...row2, ...row2]"
            :key="`r2-${i}`"
            v-bind="item"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type TestimonialCard = {
  author: string;
  avatar: string;
  faculty: string;
  quote: string;
};

const { rt, tm } = useI18n();

const resolveTestimonialRow = (key: string): TestimonialCard[] => {
  const raw = tm(key);
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.map(item => ({
    author: rt(item.author),
    avatar: rt(item.avatar),
    faculty: rt(item.faculty),
    quote: rt(item.quote),
  }));
};

const row1 = computed(() =>
  resolveTestimonialRow('home.testimonials.cards.row1')
);
const row2 = computed(() =>
  resolveTestimonialRow('home.testimonials.cards.row2')
);
</script>

<style scoped>
.marquee-row {
  display: flex;
  overflow: hidden;
}

.marquee-track {
  display: flex;
  width: max-content;
}

.marquee-track--forward {
  animation: scroll-forward 40s linear infinite;
}

.marquee-track--reverse {
  animation: scroll-reverse 40s linear infinite;
}

.marquee-row:hover .marquee-track {
  animation-play-state: paused;
}

@keyframes scroll-forward {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@keyframes scroll-reverse {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
