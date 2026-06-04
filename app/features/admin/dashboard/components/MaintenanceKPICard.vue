<script lang="ts" setup>
import { MaintenanceStatus } from '#imports';

import { Card, CardContent } from '~/components/ui/card';
import { useNumericAbbreviation } from '~/composables/useNumericAbbreviation';
import { maintenanceCountQuery } from '~/features/shared/maintenances/maintenance.query';

const { refetch, state } = useQuery(() =>
  maintenanceCountQuery({
    status: MaintenanceStatus.pending,
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
            name="mdi:wrench"
            size="2.5rem"
            class="text-background m-2 inline-block"
          />
        </div>

        <div>
          <p class="text-foreground text-base font-bold">
            {{ $t('admin.kpi.maintenances') }}
          </p>
          <p class="text-muted-foreground text-sm">
            {{ $t('admin.kpi.maintenancesSubtitle') }}
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

    <CardContent v-else-if="state.data != null">
      <div class="flex items-center gap-4">
        <div class="bg-primary flex items-center justify-center rounded-md">
          <Icon
            name="mdi:wrench"
            size="2.5rem"
            class="text-background m-2 inline-block"
          />
        </div>

        <div>
          <p class="text-foreground text-base font-bold">
            {{ $t('admin.kpi.maintenances') }}
          </p>
          <p class="text-muted-foreground text-sm">
            {{ $t('admin.kpi.maintenancesSubtitle') }}
          </p>
          <div class="text-2xl font-bold">{{ formattedCount }}</div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped></style>
