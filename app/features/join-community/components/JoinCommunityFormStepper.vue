<script setup lang="ts">
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper';

interface Props {
  currentStep: number;
}

defineProps<Props>();
</script>

<template>
  <Stepper :model-value="currentStep" class="mb-8">
    <StepperItem :step="1" :completed="currentStep > 1">
      <StepperTrigger disabled>
        <StepperIndicator>
          <Icon name="mdi:information-outline" />
        </StepperIndicator>
        <div>
          <StepperTitle>Informations générales</StepperTitle>
        </div>
      </StepperTrigger>
      <StepperSeparator />
    </StepperItem>

    <StepperItem :step="2" :completed="currentStep > 2">
      <StepperTrigger disabled>
        <StepperIndicator class="bg-muted">
          <Icon name="mdi:phone-outline" />
        </StepperIndicator>
        <div>
          <StepperTitle>Informations de contact</StepperTitle>
        </div>
      </StepperTrigger>
      <StepperSeparator />
    </StepperItem>

    <StepperItem :step="3" :completed="currentStep > 3">
      <StepperTrigger disabled>
        <StepperIndicator class="bg-muted">
          <Icon name="mdi:book-open-outline" />
        </StepperIndicator>
        <div>
          <StepperTitle>Informations éducatives</StepperTitle>
        </div>
      </StepperTrigger>
      <StepperSeparator />
    </StepperItem>

    <StepperItem :step="4" :completed="false">
      <StepperTrigger disabled>
        <StepperIndicator class="bg-muted">
          <Icon name="mdi:check-circle-outline" />
        </StepperIndicator>
        <div>
          <StepperTitle>Vérification</StepperTitle>
        </div>
      </StepperTrigger>
    </StepperItem>
  </Stepper>
</template>
