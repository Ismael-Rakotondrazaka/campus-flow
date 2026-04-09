<script setup lang="ts">
import { toast } from 'vue-sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PhotoUploadField from '~/features/join-community/components/PhotoUploadField.vue';
import {
  type Announcement,
  AnnouncementStatus,
  type AnnouncementUpdate,
} from '~/features/shared/announcements/announcement.model';
import { useUpdateAnnouncement } from '~/features/shared/announcements/announcement.query';
import {
  type UpdateAnnouncementForm,
  UpdateAnnouncementFormSchema,
} from '~/features/shared/announcements/announcement.schema';
import { useUploadAnnouncementIllustration } from '~/features/shared/announcements/composables/useUploadAnnouncementIllustration';

const props = defineProps<{
  announcement: Announcement;
}>();

const updateAnnouncementMutation = useUpdateAnnouncement();
const uploadIllustration = useUploadAnnouncementIllustration();

const illustrationFile = ref<File | null>(null);
const illustrationRemovedByUser = ref(false);
const newFilePreviewUrl = ref<null | string>(null);
const storedIllustrationUrl = ref<null | string>(
  props.announcement.illustration_url
);

const illustrationPreview = computed(
  () => newFilePreviewUrl.value ?? storedIllustrationUrl.value
);

const handleIllustrationChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  illustrationFile.value = file;
  illustrationRemovedByUser.value = false;
  if (newFilePreviewUrl.value) URL.revokeObjectURL(newFilePreviewUrl.value);
  newFilePreviewUrl.value = URL.createObjectURL(file);
  input.value = '';
};

const handleIllustrationClear = () => {
  if (newFilePreviewUrl.value) URL.revokeObjectURL(newFilePreviewUrl.value);
  newFilePreviewUrl.value = null;
  illustrationFile.value = null;
  storedIllustrationUrl.value = null;
  illustrationRemovedByUser.value = true;
  setFieldValue('illustration_url', null);
};

onUnmounted(() => {
  if (newFilePreviewUrl.value) URL.revokeObjectURL(newFilePreviewUrl.value);
});

const { handleSubmit, isSubmitting, setFieldValue, setValues } = useForm({
  initialValues: {
    content: props.announcement.content,
    illustration_url: '',
    title: props.announcement.title,
  },
  validationSchema: toTypedSchema(UpdateAnnouncementFormSchema),
});

const applyAnnouncementToForm = (a: Announcement) => {
  if (newFilePreviewUrl.value) {
    URL.revokeObjectURL(newFilePreviewUrl.value);
    newFilePreviewUrl.value = null;
  }
  illustrationFile.value = null;
  illustrationRemovedByUser.value = false;
  storedIllustrationUrl.value = a.illustration_url;
  setValues({
    content: a.content,
    illustration_url: '',
    title: a.title,
  });
};

watch(() => props.announcement, applyAnnouncementToForm);

const runUpdate = async (
  formValues: UpdateAnnouncementForm,
  status: AnnouncementStatus
) => {
  try {
    const updates: AnnouncementUpdate = {
      content: formValues.content,
      status,
      title: formValues.title,
    };

    if (illustrationFile.value) {
      updates.illustration_url = await uploadIllustration(
        props.announcement.id,
        illustrationFile.value
      );
    } else if (illustrationRemovedByUser.value) {
      updates.illustration_url = null;
    }

    await updateAnnouncementMutation.mutation({
      id: props.announcement.id,
      updates,
    });
    toast.success('Annonce mise à jour');
    await navigateTo({ name: 'admin-root-announcements' });
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "Une erreur s'est produite"
    );
  }
};

const onPublish = handleSubmit(async (formValues: UpdateAnnouncementForm) => {
  await runUpdate(formValues, AnnouncementStatus.published);
});

const onSaveDraft = handleSubmit(async (formValues: UpdateAnnouncementForm) => {
  await runUpdate(formValues, AnnouncementStatus.draft);
});
</script>

<template>
  <div class="w-full space-y-4">
    <Card>
      <CardHeader>
        <CardTitle>Modifier l'annonce</CardTitle>
        <CardDescription>
          Mettez à jour le titre, le contenu, l'illustration ou le statut de
          publication.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent>
          <FieldGroup class="space-y-4">
            <VeeField v-slot="{ errors, componentField }" name="title">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="edit-announcement-title">
                  Titre
                  <span class="text-destructive" aria-hidden="true">*</span>
                </FieldLabel>
                <Input
                  id="edit-announcement-title"
                  v-bind="componentField"
                  aria-required="true"
                  :aria-invalid="!!errors.length"
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>

            <VeeField v-slot="{ errors, componentField }" name="content">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="edit-announcement-content">
                  Contenu
                  <span class="text-destructive" aria-hidden="true">*</span>
                </FieldLabel>
                <Textarea
                  id="edit-announcement-content"
                  v-bind="componentField"
                  class="min-h-32"
                  aria-required="true"
                  :aria-invalid="!!errors.length"
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>

            <PhotoUploadField
              :file-name="illustrationFile?.name ?? null"
              :preview="illustrationPreview"
              field-name="illustration_url"
              label="Illustration"
              preview-alt="Aperçu de l'illustration"
              :required="false"
              @change="handleIllustrationChange"
              @clear="handleIllustrationClear"
            />

            <Field
              class="flex flex-col gap-2 sm:flex-row sm:flex-nowrap sm:items-center"
            >
              <Button
                class="w-full sm:w-min!"
                type="button"
                :disabled="isSubmitting"
                @click="onPublish"
              >
                <Icon name="mdi:publish" />
                Publier
              </Button>
              <Button
                class="w-full sm:w-min!"
                type="button"
                variant="secondary"
                :disabled="isSubmitting"
                @click="onSaveDraft"
              >
                <Icon name="mdi:draft" />
                Brouillon
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
