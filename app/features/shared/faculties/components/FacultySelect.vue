<script setup lang="ts">
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-vue-next';
import { ref } from 'vue';

import type { Faculty } from '~/features/shared/faculties/faculty.model';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  facultyByIdQuery,
  facultyListQuery,
} from '~/features/shared/faculties/faculty.query';
import { cn } from '~/lib/utils';

const modelValue = defineModel<string | undefined>({
  default: undefined,
  required: false,
});

interface Props {
  ariaInvalid?: 'false' | 'true' | boolean;
}

defineProps<Props>();

const open = ref(false);
const selectedFaculty = ref<Faculty | null>(null);
const search = ref('');

const { data: facultiesData, state } = useQuery(() =>
  facultyListQuery({
    limit: 5,
    orderBy: 'name',
    search: search.value,
    sortOrder: SortOrder.asc,
  })
);

const shouldFetchFaculty = computed(() => {
  if (!modelValue.value) return false;

  if (selectedFaculty.value?.id === modelValue.value) return false;

  if (
    facultiesData.value?.data?.length &&
    facultiesData.value?.data?.find(faculty => faculty.id === modelValue.value)
  )
    return false;

  return true;
});

const { data: fetchedFacultyData } = useQuery(() => ({
  ...facultyByIdQuery({ id: modelValue.value ?? '' }),
  enabled: shouldFetchFaculty.value,
}));

watch(
  () => selectedFaculty.value?.id,
  newValue => {
    modelValue.value = newValue;
  }
);

watch(
  () => modelValue.value,
  newValue => {
    if (!newValue) {
      selectedFaculty.value = null;
      return;
    }

    if (selectedFaculty.value?.id === newValue) {
      return;
    }

    const fromListFaculty =
      facultiesData.value?.data?.find(faculty => faculty.id === newValue) ??
      null;
    if (fromListFaculty) {
      selectedFaculty.value = fromListFaculty;
      return;
    }

    if (fetchedFacultyData.value) {
      selectedFaculty.value = fetchedFacultyData.value;
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
          {{ selectedFaculty?.name ?? 'Sélectionner une faculté...' }}
          <ChevronsUpDownIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent class="w-full p-0">
        <Command should-filter-items class="w-full">
          <CommandInput v-model="search" placeholder="Rechercher..." />

          <CommandList>
            <CommandGroup v-if="state.status === 'pending'" class="space-y-1">
              <Skeleton v-for="i in 5" :key="i" class="h-8 w-full" />
            </CommandGroup>

            <CommandGroup v-else-if="state.data?.data?.length">
              <CommandItem
                v-for="faculty in facultiesData?.data"
                :key="faculty.id"
                :value="faculty.id"
                @select="
                  () => {
                    selectedFaculty =
                      selectedFaculty?.id === faculty.id ? null : faculty;
                    open = false;
                  }
                "
              >
                <CheckIcon
                  :class="
                    cn(
                      'mr-2 h-4 w-4',
                      selectedFaculty?.id === faculty.id
                        ? 'opacity-100'
                        : 'opacity-0'
                    )
                  "
                />
                {{ faculty.name }}
              </CommandItem>
            </CommandGroup>

            <CommandEmpty v-else>Aucune faculté trouvée.</CommandEmpty>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>
