<script setup lang="ts">
import type { Maintenance } from '#imports';

import { useMutation, useQuery } from '@pinia/colada';
import { refDebounced } from '@vueuse/core';
import { MAINTAINER_PROFILES_BUCKET, MaintenanceStatus } from '#imports';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { maintainerListQuery } from '~/features/shared/maintainers/maintainer.query';
import {
  useAssignMaintainer,
  useUnassignMaintainer,
} from '~/features/shared/maintenances/maintenance.query';
import SignedUrlAvatar from '~/features/shared/users/components/SignedUrlAvatar.vue';
import { cn } from '~/lib/utils';

interface Props {
  maintenance: Serialize<Maintenance>;
}

const props = defineProps<Props>();

const open = ref(false);
const search = ref('');
const debouncedSearch = refDebounced(search, 300);

const { asyncStatus, data: maintainersData } = useQuery(() =>
  maintainerListQuery({
    excludeMaintenanceId: props.maintenance.id,
    search: debouncedSearch.value || undefined,
  })
);

const availableMaintainers = computed(() => maintainersData.value?.data ?? []);

const { isLoading: isAssigning, mutateAsync: assign } = useMutation(
  useAssignMaintainer()
);
const { isLoading: isUnassigning, mutate: unassign } = useMutation(
  useUnassignMaintainer()
);

const handleSelect = async (maintainerId: string) => {
  open.value = false;
  search.value = '';
  await assign({
    maintainerId,
    maintenanceId: props.maintenance.id,
  });
};

const handleUnassign = (maintainerId: string) => {
  unassign({
    maintainerId,
    maintenanceId: props.maintenance.id,
  });
};

const onSearchInput = (e: Event) => {
  search.value = (e.target as HTMLInputElement).value;
};

const isTerminal = computed(
  () =>
    props.maintenance.status === MaintenanceStatus.done ||
    props.maintenance.status === MaintenanceStatus.refused
);
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{
        $t('admin.maintenances.maintainersCard.title')
      }}</CardTitle>
    </CardHeader>
    <CardContent class="space-y-4">
      <div
        v-if="maintenance.maintenanceMaintainers.length === 0"
        class="text-muted-foreground text-sm"
      >
        {{ $t('admin.maintenances.maintainersCard.none') }}
      </div>

      <ul v-else class="space-y-2">
        <li
          v-for="mm in maintenance.maintenanceMaintainers"
          :key="mm.maintainerId"
          class="flex items-center justify-between gap-2"
        >
          <div class="flex items-center gap-2">
            <SignedUrlAvatar
              :bucket="MAINTAINER_PROFILES_BUCKET"
              :first-name="mm.maintainer.firstName"
              :image-url="mm.maintainer.imageUrl"
              :last-name="mm.maintainer.lastName"
              class="size-8 shrink-0"
            />
            <span class="text-sm font-medium">
              {{ mm.maintainer.firstName }} {{ mm.maintainer.lastName }}
            </span>
          </div>
          <Button
            :disabled="isUnassigning || isTerminal"
            size="sm"
            variant="ghost"
            @click="handleUnassign(mm.maintainerId)"
          >
            <Icon name="mdi:close" />
          </Button>
        </li>
      </ul>

      <div v-if="!isTerminal" class="border-t pt-4">
        <p class="text-muted-foreground mb-2 text-sm">
          {{ $t('admin.maintenances.maintainersCard.assign') }}
        </p>
        <Popover v-model:open="open">
          <PopoverTrigger as-child>
            <Button
              :aria-expanded="open"
              :disabled="isAssigning"
              class="w-full justify-between"
              role="combobox"
              variant="outline"
            >
              {{ $t('admin.maintenances.maintainersCard.choose') }}
              <Icon
                :class="
                  cn(
                    'ml-2 opacity-50 transition-transform',
                    open && 'rotate-180'
                  )
                "
                name="mdi:chevron-down"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-full p-0">
            <Command :should-filter="false">
              <CommandInput
                :model-value="search"
                :placeholder="$t('admin.maintenances.maintainersCard.search')"
                @input="onSearchInput"
              />
              <CommandList>
                <CommandEmpty v-if="asyncStatus !== 'loading'">
                  {{ $t('admin.maintenances.maintainersCard.emptySearch') }}
                </CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    v-for="maintainer in availableMaintainers"
                    :key="maintainer.id"
                    :value="maintainer.id"
                    @select="handleSelect(maintainer.id)"
                  >
                    {{ maintainer.firstName }} {{ maintainer.lastName }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </CardContent>
  </Card>
</template>
