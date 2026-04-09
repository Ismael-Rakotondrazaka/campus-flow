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
  type AnnouncementInsert,
  AnnouncementStatus,
} from '~/features/shared/announcements/announcement.model';
import { useCreateAnnouncement } from '~/features/shared/announcements/announcement.query';
import {
  type CreateAnnouncementForm,
  CreateAnnouncementFormSchema,
} from '~/features/shared/announcements/announcement.schema';
import { useUploadAnnouncementIllustration } from '~/features/shared/announcements/composables/useUploadAnnouncementIllustration';

const createAnnouncementMutation = useCreateAnnouncement();
const uploadIllustration = useUploadAnnouncementIllustration();

const illustrationFile = ref<File | null>(null);
const illustrationPreview = ref<null | string>(null);

const handleIllustrationChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  illustrationFile.value = file;
  if (illustrationPreview.value) URL.revokeObjectURL(illustrationPreview.value);
  illustrationPreview.value = URL.createObjectURL(file);
  input.value = '';
};

const handleIllustrationClear = () => {
  if (illustrationPreview.value) URL.revokeObjectURL(illustrationPreview.value);
  illustrationFile.value = null;
  illustrationPreview.value = null;
  setFieldValue('illustration_url', null);
};

onUnmounted(() => {
  if (illustrationPreview.value) URL.revokeObjectURL(illustrationPreview.value);
});

const { handleSubmit, isSubmitting, setFieldValue } = useForm({
  initialValues: {
    content: '',
    illustration_url: '',
    title: '',
  },
  validationSchema: toTypedSchema(CreateAnnouncementFormSchema),
});

const runCreate = async (
  formValues: CreateAnnouncementForm,
  status: AnnouncementStatus
) => {
  try {
    const announcementId = crypto.randomUUID();
    let illustrationUrl: string | undefined;

    if (illustrationFile.value) {
      illustrationUrl = await uploadIllustration(
        announcementId,
        illustrationFile.value
      );
    }

    const insert: AnnouncementInsert = {
      content: formValues.content,
      id: announcementId,
      status,
      title: formValues.title,
    };

    if (illustrationUrl) {
      insert.illustration_url = illustrationUrl;
    }

    await createAnnouncementMutation.mutation(insert);
    toast.success('Annonce créée avec succès');
    await navigateTo({ name: 'admin-root-announcements' });
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "Une erreur s'est produite"
    );
  }
};

const onPublish = handleSubmit(async (formValues: CreateAnnouncementForm) => {
  await runCreate(formValues, AnnouncementStatus.published);
});

const onSaveDraft = handleSubmit(async (formValues: CreateAnnouncementForm) => {
  await runCreate(formValues, AnnouncementStatus.draft);
});
</script>

<template>
  <div class="w-full space-y-4">
    <Card>
      <CardHeader>
        <CardTitle>Informations de l'annonce</CardTitle>
        <CardDescription>
          Renseignez le titre, le contenu et les options de publication.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent>
          <FieldGroup class="space-y-4">
            <VeeField v-slot="{ errors, componentField }" name="title">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="announcement-title">
                  Titre
                  <span class="text-destructive" aria-hidden="true"> *</span>
                </FieldLabel>
                <Input
                  id="announcement-title"
                  v-bind="componentField"
                  aria-required="true"
                  :aria-invalid="!!errors.length"
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>

            <VeeField v-slot="{ errors, componentField }" name="content">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="announcement-content">
                  Contenu
                  <span class="text-destructive" aria-hidden="true"> *</span>
                </FieldLabel>
                <Textarea
                  id="announcement-content"
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
