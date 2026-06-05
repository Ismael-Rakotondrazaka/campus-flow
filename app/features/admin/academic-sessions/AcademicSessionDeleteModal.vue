<script setup lang="ts">
import type { AcademicSession } from '#imports';

import { toast } from 'vue-sonner';

import { useDeleteAcademicSession } from '~/features/shared/academic-sessions/academic-session.query';

interface Props {
  session: Serialize<AcademicSession>;
}

const props = defineProps<Props>();

const open = defineModel<boolean>('open', {
  default: false,
  required: false,
});

type Emits = {
  'session:deleted': [session: Serialize<AcademicSession>];
};
const emit = defineEmits<Emits>();

const { t } = useI18n();
const { isLoading, mutateAsync } = useMutation(useDeleteAcademicSession());

const handleDelete = async () => {
  try {
    await mutateAsync(props.session.id);
    emit('session:deleted', props.session);
    open.value = false;
    toast.success(t('common.toasts.academicSession.deleted'));
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
          entity: $t('admin.academicSessions.deleteEntity'),
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
