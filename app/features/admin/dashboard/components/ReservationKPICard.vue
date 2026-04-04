<script lang="ts" setup>
import { Card, CardContent } from '@/components/ui/card';
import { useNumericAbbreviation } from '~/composables/useNumericAbbreviation';
import { ReservationStatus } from '~/features/shared/reservations/reservation.model';
import { reservationCountQuery } from '~/features/shared/reservations/reservation.query';

const { refetch, state } = useQuery(() =>
  reservationCountQuery({
    status: ReservationStatus.pending,
  })
);

const formattedCount = useNumericAbbreviation(() => state.value?.data ?? 0);
</script>

<template>
  <Card>
    <CardContent v-if="state.status === 'pending'">
      <div class="flex items-center gap-4">
        <div class="bg-primary flex items-center justify-center rounded-md">
          <Icon
            name="mdi:calendar-check"
            size="2.5rem"
            class="text-background m-2 inline-block"
          />
        </div>

        <div>
          <p class="text-foreground text-base font-bold">Réservations</p>
          <p class="text-muted-foreground text-sm">
            Nombre de réservations en attente de validation
          </p>
          <Skeleton class="mt-1 h-8 w-20" />
        </div>
      </div>
    </CardContent>

    <CardContent v-if="state.status === 'error'">
      <div class="flex items-center justify-center">
        <Button size="icon" variant="outline" @click="refetch">
          <Icon
            name="mdi:refresh"
            size="1.5rem"
            class="text-foreground inline-block"
          />
        </Button>
      </div>
    </CardContent>

    <CardContent v-else-if="state.data">
      <div class="flex items-center gap-4">
        <div class="bg-primary flex items-center justify-center rounded-md">
          <Icon
            name="mdi:calendar-check"
            size="2.5rem"
            class="text-background m-2 inline-block"
          />
        </div>

        <div>
          <p class="text-foreground text-base font-bold">Réservations</p>
          <p class="text-muted-foreground text-sm">
            Nombre de réservations en attente de validation
          </p>
          <div class="text-2xl font-bold">{{ formattedCount }}</div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped></style>
