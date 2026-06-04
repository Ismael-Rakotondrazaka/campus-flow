<script setup lang="ts">
import {
  type Announcement,
  AnnouncementStatus,
  type UpdateAnnouncement,
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
import {
  uploadAnnouncementIllustration,
  useUpdateAnnouncement,
} from '~/features/shared/announcements';

interface Props {
  announcement: Serialize<Announcement>;
}

const props = defineProps<Props>();

const updateAnnouncementMutation = useUpdateAnnouncement();

const illustrationFile = ref<File | null>(null);
const illustrationRemovedByUser = ref(false);
const newFilePreviewUrl = ref<null | string>(null);
const storedIllustrationUrl = ref<null | string>(
  props.announcement.illustrationUrl
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
  setFieldValue('illustrationUrl', null);
};

onUnmounted(() => {
  if (newFilePreviewUrl.value) URL.revokeObjectURL(newFilePreviewUrl.value);
});

const { t } = useI18n();

const { handleSubmit, isSubmitting, setErrors, setFieldValue, setValues } =
  useForm({
    initialValues: {
      content: props.announcement.content,
      illustrationUrl: '',
      title: props.announcement.title,
    },
    validationSchema: toTypedSchema(UpdateAnnouncementFormSchema),
  });

const applyAnnouncementToForm = (a: Serialize<Announcement>) => {
  if (newFilePreviewUrl.value) {
    URL.revokeObjectURL(newFilePreviewUrl.value);
    newFilePreviewUrl.value = null;
  }
  illustrationFile.value = null;
  illustrationRemovedByUser.value = false;
  storedIllustrationUrl.value = a.illustrationUrl;
  setValues({
    content: a.content,
    illustrationUrl: '',
    title: a.title,
  });
};

const localeRoute = useLocaleRoute();

watch(() => props.announcement, applyAnnouncementToForm);

const runUpdate = async (
  formValues: UpdateAnnouncementForm,
  status: AnnouncementStatus
) => {
  try {
    const updates: UpdateAnnouncement = {
      content: formValues.content,
      status,
      title: formValues.title,
    };

    if (illustrationFile.value) {
      updates.illustrationUrl = await uploadAnnouncementIllustration(
        props.announcement.id,
        illustrationFile.value
      );
    } else if (illustrationRemovedByUser.value) {
      updates.illustrationUrl = null;
    }

    await updateAnnouncementMutation.mutation({
      id: props.announcement.id,
      updates,
    });
    toast.success(t('common.toasts.announcement.updated'));
    await navigateTo(localeRoute({ name: 'admin-root-announcements' }));
  } catch (error) {
    handleFetchError(error, t, setErrors);
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
        <CardTitle>{{ $t('admin.announcements.editTitle') }}</CardTitle>
        <CardDescription>
          {{ $t('admin.announcements.editDescription') }}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent>
          <FieldGroup class="space-y-4">
            <VeeField v-slot="{ errors, componentField }" name="title">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="edit-announcement-title">
                  {{ $t('forms.fields.title.label') }}
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
                  {{ $t('forms.fields.content.label') }}
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
