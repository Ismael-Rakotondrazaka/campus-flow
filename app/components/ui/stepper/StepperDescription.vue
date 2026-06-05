<script lang="ts" setup>
import type { StepperDescriptionProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

import { reactiveOmit } from '@vueuse/core';
import { StepperDescription, useForwardProps } from 'reka-ui';

import { cn } from '~/lib/utils';

const props = defineProps<
  { class?: HTMLAttributes['class'] } & StepperDescriptionProps
>();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <StepperDescription
    v-slot="slotProps"
    v-bind="forwarded"
    :class="cn('text-muted-foreground text-xs', props.class)"
  >
    <slot v-bind="slotProps" />
  </StepperDescription>
</template>
