<script setup lang="ts">
import type { Resident } from '#imports';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { useAdminFloorLabel } from '~/features/admin/composables/useAdminFloorLabel';

interface Props {
  resident: Serialize<Resident>;
}

const props = defineProps<Props>();

const { formatFloor } = useAdminFloorLabel();
</script>

<template>
  <Card v-if="props.resident.lodgment">
    <CardHeader>
      <CardTitle>{{ $t('common.cards.lodgment') }}</CardTitle>
    </CardHeader>
    <CardContent class="grid gap-y-3 text-sm sm:grid-cols-2">
      <div>
        <p class="text-muted-foreground">{{ $t('common.cards.building') }}</p>
        <p class="font-medium">{{ props.resident.lodgment.building.name }}</p>
      </div>
      <div>
        <p class="text-muted-foreground">{{ $t('common.cards.room') }}</p>
        <p class="font-medium">
          {{
            $t('admin.location.room', {
              number: props.resident.lodgment.roomNumber,
            })
          }}
          -
          {{ formatFloor(props.resident.lodgment.floor) }}
        </p>
      </div>
      <div>
        <p class="text-muted-foreground">
          {{ $t('common.cards.occupation') }}
        </p>
        <p class="font-medium">
          {{ props.resident.lodgment.residentsCount }} /
          {{ props.resident.lodgment.capacity }}
        </p>
      </div>
    </CardContent>
  </Card>
</template>
