<template>
  <div
    class="testimonial-card bg-card mx-2 w-80 shrink-0 rounded-2xl border p-6 shadow-sm"
  >
    <div class="mb-4 flex items-center gap-3">
      <div
        class="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
      >
        {{ avatar }}
      </div>
      <div>
        <p class="font-display text-foreground text-sm font-semibold">
          {{ author }}
        </p>
        <p class="text-muted-foreground text-xs">{{ faculty }}</p>
      </div>
      <span
        class="ml-auto font-serif text-4xl leading-none text-amber-400/60 select-none"
        >&ldquo;</span
      >
    </div>
    <p class="text-muted-foreground text-sm leading-relaxed">{{ quote }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  author: string;
  avatar: string;
  faculty: string;
  quote: string;
}

defineProps<Props>();
</script>

<style scoped>
.testimonial-card {
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.2s;
}

.testimonial-card:hover {
  border-color: hsl(var(--primary) / 0.3);
  box-shadow: 0 8px 32px hsl(var(--primary) / 0.08);
  transform: translateY(-2px);
}
</style>
