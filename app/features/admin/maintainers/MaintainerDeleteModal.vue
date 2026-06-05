<script setup lang="ts">
import type { Maintainer } from '#imports';

import { toast } from 'vue-sonner';

import { useDeleteMaintainer } from '~/features/shared/maintainers/maintainer.query';

interface Props {
  maintainer: Serialize<Maintainer>;
}

const props = defineProps<Props>();

const open = defineModel<boolean>('open', {
  default: false,
  required: false,
});

type Emits = {
  'maintainer:deleted': [maintainer: Serialize<Maintainer>];
};
const emit = defineEmits<Emits>();

const { t } = useI18n();
const { isLoading, mutateAsync } = useMutation(useDeleteMaintainer());

const handleDelete = async () => {
  try {
    await mutateAsync(props.maintainer.id);
    emit('maintainer:deleted', props.maintainer);
    open.value = false;
    toast.success(t('common.toasts.maintainer.deleted'));
  } catch {
    toast.error(t('common.toasts.deleteFailed'));
  }
};
</script>

<template>
  <ResponsiveModal v-model:open="open">
    <template #title>
      {{
        $t('common.deleteModal.title', {
          entity: $t('admin.maintainers.deleteEntity'),
        })
      }}
    </template>

    <template #description>
      {{ $t('common.deleteModal.description') }}
    </template>

    <div class="flex justify-end gap-2 pt-4">
      <Button
        type="button"
        variant="outline"
        :disabled="isLoading"
        @click="open = false"
      >
        <Icon name="mdi:close" />
        {{ $t('forms.buttons.cancel') }}
      </Button>

      <Button
        type="button"
        variant="destructive"
        :disabled="isLoading"
        @click="handleDelete"
      >
        <Icon v-if="isLoading" name="mdi:loading" class="animate-spin" />
        <Icon v-else name="mdi:delete" />
        {{ $t('common.buttons.delete') }}
      </Button>
    </div>
  </ResponsiveModal>
</template>
