<script setup lang="ts">
import type { AcademicSession } from '~/features/shared/academic-sessions/academic-session.model';

import { Card, CardContent } from '@/components/ui/card';
import { useUploadHousingApplicationDocument } from '~/features/join-community/composables/useUploadHousingApplicationDocument';
import {
  type JoinCommunity,
  JoinCommunitySchema,
} from '~/features/join-community/join-community.schema';
import { facultyListQuery } from '~/features/shared/faculties/faculty.query';
import { useCreateHousingApplication } from '~/features/shared/housing-applications/housing-application.query';
import { Gender, Origin } from '~/features/shared/residents/resident.model';

import JoinCommunityFormContactInfo from './JoinCommunityFormContactInfo.vue';
import JoinCommunityFormEducationInfo from './JoinCommunityFormEducationInfo.vue';
import JoinCommunityFormError from './JoinCommunityFormError.vue';
import JoinCommunityFormGeneralInfo from './JoinCommunityFormGeneralInfo.vue';
import JoinCommunityFormNavigation from './JoinCommunityFormNavigation.vue';
import JoinCommunityFormStepper from './JoinCommunityFormStepper.vue';
import JoinCommunityFormSuccess from './JoinCommunityFormSuccess.vue';
import JoinCommunityFormVerification from './JoinCommunityFormVerification.vue';

interface Props {
  session: AcademicSession;
}

const props = defineProps<Props>();

const SubmissionState = {
  error: 'error',
  idle: 'idle',
  loading: 'loading',
  success: 'success',
} as const;
type SubmissionState = (typeof SubmissionState)[keyof typeof SubmissionState];

const currentStep = ref(3);
const submissionState = ref<SubmissionState>(SubmissionState.idle);
const submissionError = ref<null | string>(null);

// File refs for uploads
const profilePhotoFile = ref<File | null>(null);
const profilePhotoPreview = ref<null | string>(null);
const nicFile = ref<File | null>(null);
const nicPreview = ref<null | string>(null);
const schoolCertFile = ref<File | null>(null);

const { handleSubmit, isSubmitting, setFieldError, validateField, values } =
  useForm({
    initialValues: {
      email: '',
      emergency_number: '',
      faculty_id: '',
      first_name: '',
      gender: Gender.male,
      last_name: '',
      nic: '',
      origin: Origin.national,
      phone_number: '',
    },
    validationSchema: toTypedSchema(JoinCommunitySchema),
  });

// Queries and mutations
const { data: facultiesData } = useQuery(() =>
  facultyListQuery({ limit: 100 })
);
const createHousingApplicationMutation = useCreateHousingApplication();

const upload = useUploadHousingApplicationDocument();

const facultyList = computed(() => facultiesData.value?.data ?? []);

// File handlers
const handlePhotoChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  profilePhotoFile.value = file;
  if (profilePhotoPreview.value) URL.revokeObjectURL(profilePhotoPreview.value);
  profilePhotoPreview.value = URL.createObjectURL(file);
  input.value = '';
};

const handleNicChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  nicFile.value = file;
  if (nicPreview.value) URL.revokeObjectURL(nicPreview.value);
  nicPreview.value = URL.createObjectURL(file);
  input.value = '';
};

const handleSchoolCertChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  schoolCertFile.value = file;
  input.value = '';
};

// Step navigation
const goNext = async () => {
  type FormField = keyof JoinCommunity;
  let fieldsToValidate: FormField[] = [];
  const fileFieldValidation: Record<
    'image_url' | 'nic_url' | 'school_certificate_url',
    | {
        errorMessage: null;
        isSuccess: true;
      }
    | {
        errorMessage: string;
        isSuccess: false;
      }
  > = {
    image_url: {
      errorMessage: null,
      isSuccess: true,
    },
    nic_url: {
      errorMessage: null,
      isSuccess: true,
    },
    school_certificate_url: {
      errorMessage: null,
      isSuccess: true,
    },
  };

  if (currentStep.value === 1) {
    fieldsToValidate = ['first_name', 'last_name', 'gender', 'nic'];

    if (profilePhotoFile.value === null) {
      fileFieldValidation.image_url = {
        errorMessage: 'Obligatoire',
        isSuccess: false,
      };
    }

    if (nicFile.value === null) {
      fileFieldValidation.nic_url = {
        errorMessage: 'Obligatoire',
        isSuccess: false,
      };
    }
  } else if (currentStep.value === 2) {
    fieldsToValidate = ['email', 'phone_number', 'emergency_number'];
  } else if (currentStep.value === 3) {
    fieldsToValidate = ['faculty_id'];

    if (schoolCertFile.value === null) {
      fileFieldValidation.school_certificate_url = {
        errorMessage: 'Obligatoire',
        isSuccess: false,
      };
    }
  }

  // Validate all fields for the current step
  const validationResults = await Promise.all(
    fieldsToValidate.map(field => validateField(field))
  );

  Object.entries(fileFieldValidation).forEach(([field, validation]) => {
    setFieldError(
      field as 'image_url' | 'nic_url' | 'school_certificate_url',
      validation.isSuccess ? undefined : validation.errorMessage
    );
  });

  const hasValidationErrors = validationResults.some(result => !result.valid);
  const hasFileErrors = Object.values(fileFieldValidation).some(
    fileValidation => !fileValidation.isSuccess
  );

  if (!hasValidationErrors && !hasFileErrors) {
    currentStep.value++;
  }
};

const onSubmit = handleSubmit(async (formValues: JoinCommunity) => {
  try {
    submissionState.value = SubmissionState.loading;

    // Guard: all files present
    if (!profilePhotoFile.value || !nicFile.value || !schoolCertFile.value) {
      throw new Error('Tous les documents sont requis');
    }

    // Upload files
    const [imageUrl, nicUrl, schoolCertificateUrl] = await Promise.all([
      upload(props.session.id, profilePhotoFile.value, 'photo'),
      upload(props.session.id, nicFile.value, 'nic'),
      upload(props.session.id, schoolCertFile.value, 'school-certificate'),
    ]);

    // Create housing application
    await createHousingApplicationMutation.mutation({
      academic_session_id: props.session.id,
      email: formValues.email,
      emergency_number: formValues.emergency_number,
      faculty_id: formValues.faculty_id,
      first_name: formValues.first_name,
      gender: formValues.gender,
      image_url: imageUrl,
      last_name: formValues.last_name,
      nic: formValues.nic,
      nic_url: nicUrl,
      origin: formValues.origin,
      phone_number: formValues.phone_number,
      school_certificate_url: schoolCertificateUrl,
    });

    submissionState.value = SubmissionState.success;
  } catch (error) {
    submissionError.value =
      error instanceof Error ? error.message : "Une erreur s'est produite";
    submissionState.value = SubmissionState.error;
  }
});
</script>

<template>
  <div class="w-full space-y-4">
    <JoinCommunityFormSuccess
      v-if="submissionState === SubmissionState.success"
    />

    <JoinCommunityFormError
      v-else-if="submissionState === SubmissionState.error"
      :error="submissionError"
      @retry="onSubmit"
    />

    <Card v-show="submissionState !== SubmissionState.success">
      <CardContent>
        <JoinCommunityFormStepper :current-step="currentStep" />

        <JoinCommunityFormGeneralInfo
          v-show="currentStep === 1"
          :first-name-initial="values.first_name?.charAt(0) ?? 'P'"
          :nic-file-name="nicFile?.name ?? null"
          :nic-preview="nicPreview"
          :photo-file-name="profilePhotoFile?.name ?? null"
          :photo-preview="profilePhotoPreview"
          @nic-change="handleNicChange"
          @photo-change="handlePhotoChange"
        />

        <JoinCommunityFormContactInfo v-show="currentStep === 2" />

        <JoinCommunityFormEducationInfo
          v-show="currentStep === 3"
          :faculties="facultyList"
          :school-cert-file-name="schoolCertFile?.name ?? null"
          @school-cert-change="handleSchoolCertChange"
        />

        <JoinCommunityFormVerification
          v-show="currentStep === 4"
          :first-name="values.first_name"
          :last-name="values.last_name"
          :gender="values.gender ?? null"
          :origin="values.origin ?? null"
          :email="values.email"
          :phone-number="values.phone_number"
          :emergency-number="values.emergency_number"
          :nic-number="values.nic"
          :faculty-id="values.faculty_id"
          :faculties="facultyList"
          :profile-photo-file-name="profilePhotoFile?.name ?? null"
          :nic-file-name="nicFile?.name ?? null"
          :school-cert-file-name="schoolCertFile?.name ?? null"
        />

        <JoinCommunityFormNavigation
          :current-step="currentStep"
          :is-submitting="isSubmitting"
          @back="currentStep--"
          @next="goNext"
          @submit="onSubmit"
        />
      </CardContent>
    </Card>
  </div>
</template>
