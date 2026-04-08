<script setup lang="ts">
import { toast } from 'vue-sonner';

import type { Announcement } from '~/features/shared/announcements/announcement.model';

import { useDeleteAnnouncement } from '~/features/shared/announcements/announcement.query';

interface Props {
  announcement: Announcement;
}

const props = defineProps<Props>();

const open = defineModel<boolean>('open', {
  default: false,
  required: false,
});

type Emits = {
  'announcement:deleted': [announcement: Announcement];
};
const emit = defineEmits<Emits>();

const { isLoading, mutateAsync } = useMutation(useDeleteAnnouncement());

const handleDelete = async () => {
  try {
    await mutateAsync(props.announcement.id);
    emit('announcement:deleted', props.announcement);
    toast.success("L'annonce a été supprimée avec succès");
  } catch {
    toast.error("Une erreur est survenue lors de la suppression de l'annonce");
  }
};
</script>

<template>
  <ResponsiveModal v-model:open="open">
    <template #title>Supprimer l'annonce</template>

    <template #description>
      Cette action est irréversible. L'annonce sera définitivement supprimée.
    </template>

    <div class="flex justify-end gap-2 pt-4">
      <Button
        type="button"
        variant="outline"
        :disabled="isLoading"
        @click="open = false"
      >
        Annuler
      </Button>

      <Button
        type="button"
        variant="destructive"
        :disabled="isLoading"
        @click="handleDelete"
      >
        <Icon v-if="isLoading" name="mdi:loading" class="animate-spin" />
        Supprimer
      </Button>
    </div>
  </ResponsiveModal>
</template>
