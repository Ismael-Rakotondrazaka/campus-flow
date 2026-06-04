<script setup lang="ts">
import type { Maintenance } from '#imports';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { useAdminFloorLabel } from '~/features/admin/composables/useAdminFloorLabel';

interface Props {
  maintenance: Serialize<Maintenance>;
}

const props = defineProps<Props>();

const { formatFloor } = useAdminFloorLabel();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ $t('common.cards.location') }}</CardTitle>
    </CardHeader>
    <CardContent class="grid gap-y-3 text-sm sm:grid-cols-2">
      <div>
        <p class="text-muted-foreground">{{ $t('common.cards.building') }}</p>
        <p class="font-medium">
          {{ props.maintenance.lodgment.building.name }}
        </p>
      </div>
      <div>
        <p class="text-muted-foreground">{{ $t('common.cards.floor') }}</p>
        <p class="font-medium">
          {{ formatFloor(props.maintenance.lodgment.floor) }}
        </p>
      </div>
      <div>
        <p class="text-muted-foreground">{{ $t('common.cards.room') }}</p>
        <p class="font-medium">
          {{
            $t('admin.location.room', {
              number: props.maintenance.lodgment.roomNumber,
            })
          }}
        </p>
      </div>
    </CardContent>
  </Card>
</template>
