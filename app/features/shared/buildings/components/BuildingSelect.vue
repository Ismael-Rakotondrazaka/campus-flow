<script setup lang="ts">
import type { Building } from '#imports';

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-vue-next';
import { ref } from 'vue';

import { Button } from '~/components/ui/button';
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
import {
  buildingByIdQuery,
  buildingListQuery,
} from '~/features/shared/buildings/building.query';
import { cn } from '~/lib/utils';

const value = defineModel<string | undefined>('value', {
  default: undefined,
  required: false,
});

interface Props {
  ariaInvalid?: 'false' | 'true' | boolean;
}

defineProps<Props>();

type Emits = {
  'update:modelValue': [event: string | undefined];
};
const emit = defineEmits<Emits>();

const open = ref(false);
const selectedBuilding = ref<null | Serialize<Building>>(null);
const search = ref('');

const { data: buildingsData, state } = useQuery(() =>
  buildingListQuery({
    limit: 5,
    orderBy: 'name',
    search: search.value,
    sortOrder: SortOrder.asc,
  })
);

const shouldFetchBuilding = computed(() => {
  if (!value.value) return false;

  if (selectedBuilding.value?.id === value.value) return false;

  if (
    buildingsData.value?.data?.length &&
    buildingsData.value?.data?.find(building => building.id === value.value)
  )
    return false;

  return true;
});

const { data: fetchedBuildingData } = useQuery(() => ({
  ...buildingByIdQuery({ id: value.value ?? '' }),
  enabled: shouldFetchBuilding.value,
}));

watch(
  () => selectedBuilding.value?.id,
  newValue => {
    value.value = newValue;
    emit('update:modelValue', newValue);
  }
);

watch(
  () => value.value,
  newValue => {
    if (!newValue) {
      selectedBuilding.value = null;
      return;
    }

    if (selectedBuilding.value?.id === newValue) {
      return;
    }

    const fromListBuilding =
      buildingsData.value?.data?.find(building => building.id === newValue) ??
      null;
    if (fromListBuilding) {
      selectedBuilding.value = fromListBuilding;
      return;
    }

    if (fetchedBuildingData.value) {
      selectedBuilding.value = fetchedBuildingData.value;
      return;
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="w-full">
    <Popover v-model:open="open" class="w-full">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          class="w-full justify-between"
        >
          {{
            selectedBuilding?.name
              ? $t('admin.location.building', { name: selectedBuilding.name })
              : $t('common.selects.selectBuilding')
          }}
          <ChevronsUpDownIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent class="w-full p-0">
        <Command should-filter-items class="w-full">
          <CommandInput
            v-model="search"
            :placeholder="$t('common.search.placeholderBuilding')"
          />

          <CommandList>
            <CommandGroup v-if="state.status === 'pending'" class="space-y-1">
              <Skeleton v-for="i in 5" :key="i" class="h-8 w-full" />
            </CommandGroup>

            <CommandGroup v-else-if="state.data?.data?.length">
              <CommandItem
                v-for="building in buildingsData?.data"
                :key="building.id"
                :value="building.id"
                @select="
                  () => {
                    selectedBuilding =
                      selectedBuilding?.id === building.id ? null : building;
                    open = false;
                  }
                "
              >
                <CheckIcon
                  :class="
                    cn(
                      'mr-2 h-4 w-4',
                      selectedBuilding?.id === building.id
                        ? 'opacity-100'
                        : 'opacity-0'
                    )
                  "
                />
                {{ $t('admin.location.building', { name: building.name }) }}
              </CommandItem>
            </CommandGroup>

            <CommandEmpty v-else>{{
              $t('common.empty.noBuilding')
            }}</CommandEmpty>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>
