<script setup lang="ts">
import type { HousingApplication } from '#imports';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { useAdminFloorLabel } from '~/features/admin/composables/useAdminFloorLabel';

interface Props {
  housingApplication: Serialize<HousingApplication>;
}

const props = defineProps<Props>();

const { formatFloor } = useAdminFloorLabel();
</script>

<template>
  <Card v-if="props.housingApplication.lodgment">
    <CardHeader>
      <CardTitle>{{ $t('common.cards.assignedLodgment') }}</CardTitle>
    </CardHeader>
    <CardContent class="grid gap-y-3 text-sm sm:grid-cols-2">
      <div>
        <p class="text-muted-foreground">{{ $t('common.cards.room') }}</p>
        <p class="font-medium">
          {{
            $t('admin.location.room', {
              number: props.housingApplication.lodgment.roomNumber,
            })
          }}
          -
          {{ formatFloor(props.housingApplication.lodgment.floor) }}
        </p>
      </div>
      <div>
        <p class="text-muted-foreground">{{ $t('common.cards.capacity') }}</p>
        <p class="font-medium">
          {{ props.housingApplication.lodgment.residentsCount }} /
          {{ props.housingApplication.lodgment.capacity }}
        </p>
      </div>
    </CardContent>
  </Card>
</template>
