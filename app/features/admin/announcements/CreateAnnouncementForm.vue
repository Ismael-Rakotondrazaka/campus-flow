<script setup lang="ts">
import {
  AnnouncementStatus,
  type CreateAnnouncement,
  type CreateAnnouncementForm,
  CreateAnnouncementFormSchema,
} from '#imports';
import { toast } from 'vue-sonner';

import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import PhotoUploadField from '~/features/join-community/components/PhotoUploadField.vue';
import { uploadAnnouncementIllustration } from '~/features/shared/announcements';
import { useCreateAnnouncement } from '~/features/shared/announcements/announcement.query';

const createAnnouncementMutation = useCreateAnnouncement();

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
  setFieldValue('illustrationUrl', null);
};

onUnmounted(() => {
  if (illustrationPreview.value) URL.revokeObjectURL(illustrationPreview.value);
});

const { t } = useI18n();

const { handleSubmit, isSubmitting, setErrors, setFieldValue } = useForm({
  initialValues: {
    content: '',
    illustrationUrl: '',
    title: '',
  },
  validationSchema: toTypedSchema(CreateAnnouncementFormSchema),
});

const localeRoute = useLocaleRoute();

const runCreate = async (
  formValues: CreateAnnouncementForm,
  status: AnnouncementStatus
) => {
  try {
    const announcementId = crypto.randomUUID();
    let illustrationUrl: string | undefined;

    if (illustrationFile.value) {
      illustrationUrl = await uploadAnnouncementIllustration(
        announcementId,
        illustrationFile.value
      );
    }

    const insert: CreateAnnouncement = {
      content: formValues.content,
      status,
      title: formValues.title,
    };

    if (illustrationUrl) {
      insert.illustrationUrl = illustrationUrl;
    }

    await createAnnouncementMutation.mutation(insert);
    toast.success(t('common.toasts.announcement.created'));

    await navigateTo(localeRoute({ name: 'admin-root-announcements' }));
  } catch (error) {
    handleFetchError(error, t, setErrors);
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
        <CardTitle>{{ $t('admin.announcements.formTitle') }}</CardTitle>
        <CardDescription>
          {{ $t('admin.announcements.createDescription') }}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent>
          <FieldGroup class="space-y-4">
            <VeeField v-slot="{ errors, componentField }" name="title">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="announcement-title">
                  {{ $t('forms.fields.title.label') }}
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
                  {{ $t('forms.fields.content.label') }}
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
              field-name="illustrationUrl"
              :label="$t('admin.announcements.illustration')"
              :preview-alt="$t('admin.announcements.illustrationPreview')"
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
                {{ $t('common.buttons.publish') }}
              </Button>
              <Button
                class="w-full sm:w-min!"
                type="button"
                variant="secondary"
                :disabled="isSubmitting"
                @click="onSaveDraft"
              >
                <Icon name="mdi:draft" />
                {{ $t('admin.announcements.draft') }}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
