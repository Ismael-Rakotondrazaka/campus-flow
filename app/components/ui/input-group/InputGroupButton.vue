<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

import type { ButtonVariants } from '~/components/ui/button';

import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

import type { InputGroupButtonVariants } from '.';

import { inputGroupButtonVariants } from '.';

interface InputGroupButtonProps {
  class?: HTMLAttributes['class'];
  size?: InputGroupButtonVariants['size'];
  variant?: ButtonVariants['variant'];
}

const props = withDefaults(defineProps<InputGroupButtonProps>(), {
  class: undefined,
  size: 'xs',
  variant: 'ghost',
});
</script>

<template>
  <Button
    :data-size="props.size"
    :variant="props.variant"
    :class="cn(inputGroupButtonVariants({ size: props.size }), props.class)"
  >
    <slot />
  </Button>
</template>
