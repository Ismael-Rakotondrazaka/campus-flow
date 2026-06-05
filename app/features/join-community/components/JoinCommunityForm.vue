<script setup lang="ts">
import type { AcademicSession, JoinCommunity } from '#imports';

import { Gender, JoinCommunitySchema, Origin } from '#imports';

import { Card, CardContent } from '~/components/ui/card';
import { facultyListQuery } from '~/features/shared/faculties/faculty.query';
import { uploadHousingApplicationDocument } from '~/features/shared/housing-applications';
import { useCreateHousingApplication } from '~/features/shared/housing-applications/housing-application.query';

import JoinCommunityFormContactInfo from './JoinCommunityFormContactInfo.vue';
import JoinCommunityFormEducationInfo from './JoinCommunityFormEducationInfo.vue';
import JoinCommunityFormError from './JoinCommunityFormError.vue';
import JoinCommunityFormGeneralInfo from './JoinCommunityFormGeneralInfo.vue';
import JoinCommunityFormNavigation from './JoinCommunityFormNavigation.vue';
import JoinCommunityFormStepper from './JoinCommunityFormStepper.vue';
import JoinCommunityFormSuccess from './JoinCommunityFormSuccess.vue';
import JoinCommunityFormVerification from './JoinCommunityFormVerification.vue';

interface Props {
  session: Serialize<AcademicSession>;
}

const props = defineProps<Props>();

const SubmissionState = {
  error: 'error',
  idle: 'idle',
  loading: 'loading',
  success: 'success',
} as const;
type SubmissionState = (typeof SubmissionState)[keyof typeof SubmissionState];

const currentStep = ref(1);
const submissionState = ref<SubmissionState>(SubmissionState.idle);

// File refs for uploads
const profilePhotoFile = ref<File | null>(null);
const profilePhotoPreview = ref<null | string>(null);
const nicFile = ref<File | null>(null);
const nicPreview = ref<null | string>(null);
const schoolCertFile = ref<File | null>(null);

const { t } = useI18n();

const {
  handleSubmit,
  isSubmitting,
  setErrors,
  setFieldError,
  validateField,
  values,
} = useForm({
  initialValues: {
    email: '',
    emergencyNumber: '',
    facultyId: '',
    firstName: '',
    gender: Gender.male,
    lastName: '',
    nic: '',
    origin: Origin.national,
    phoneNumber: '',
  },
  validationSchema: toTypedSchema(JoinCommunitySchema),
});

// Queries and mutations
const { data: facultiesData } = useQuery(() =>
  facultyListQuery({ limit: 100 })
);
const createHousingApplicationMutation = useCreateHousingApplication();

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
    'imageUrl' | 'nicUrl' | 'schoolCertificateUrl',
    | {
        errorMessage: null;
        isSuccess: true;
      }
    | {
        errorMessage: string;
        isSuccess: false;
      }
  > = {
    imageUrl: {
      errorMessage: null,
      isSuccess: true,
    },
    nicUrl: {
      errorMessage: null,
      isSuccess: true,
    },
    schoolCertificateUrl: {
      errorMessage: null,
      isSuccess: true,
    },
  };

  if (currentStep.value === 1) {
    fieldsToValidate = ['firstName', 'lastName', 'gender', 'nic'];

    if (profilePhotoFile.value === null) {
      fileFieldValidation.imageUrl = {
        errorMessage: t('forms.validation.photoRequired'),
        isSuccess: false,
      };
    }

    if (nicFile.value === null) {
      fileFieldValidation.nicUrl = {
        errorMessage: t('joinCommunity.errors.documentsRequired'),
        isSuccess: false,
      };
    }
  } else if (currentStep.value === 2) {
    fieldsToValidate = ['email', 'phoneNumber', 'emergencyNumber'];
  } else if (currentStep.value === 3) {
    fieldsToValidate = ['facultyId'];

    if (schoolCertFile.value === null) {
      fileFieldValidation.schoolCertificateUrl = {
        errorMessage: t('joinCommunity.errors.documentsRequired'),
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
      field as 'imageUrl' | 'nicUrl' | 'schoolCertificateUrl',
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
      throw new Error(t('joinCommunity.errors.documentsRequired'));
    }

    // Pre-generate application ID so files are stored under its path
    const applicationId = crypto.randomUUID();

    // Upload files using the application ID as folder
    const [imagePath, nicPath, schoolCertificatePath] = await Promise.all([
      uploadHousingApplicationDocument(
        applicationId,
        profilePhotoFile.value,
        'photo'
      ),
      uploadHousingApplicationDocument(applicationId, nicFile.value, 'nic'),
      uploadHousingApplicationDocument(
        applicationId,
        schoolCertFile.value,
        'school-certificate'
      ),
    ]);

    // Create housing application with the pre-generated ID
    await createHousingApplicationMutation.mutation({
      academicSessionId: props.session.id,
      email: formValues.email,
      emergencyNumber: formValues.emergencyNumber,
      facultyId: formValues.facultyId,
      firstName: formValues.firstName,
      gender: formValues.gender,
      id: applicationId,
      imageUrl: imagePath,
      lastName: formValues.lastName,
      nic: formValues.nic,
      nicUrl: nicPath,
      origin: formValues.origin,
      phoneNumber: formValues.phoneNumber,
      schoolCertificateUrl: schoolCertificatePath,
    });

    submissionState.value = SubmissionState.success;
  } catch (error) {
    handleFetchError(error, t, setErrors);
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
      @retry="onSubmit"
    />

    <Card v-show="submissionState !== SubmissionState.success">
      <CardContent>
        <JoinCommunityFormStepper :current-step="currentStep" />

        <JoinCommunityFormGeneralInfo
          v-show="currentStep === 1"
          :first-name-initial="values.firstName?.charAt(0) ?? 'P'"
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
          :first-name="values.firstName"
          :last-name="values.lastName"
          :gender="values.gender ?? null"
          :origin="values.origin ?? null"
          :email="values.email"
          :phone-number="values.phoneNumber"
          :emergency-number="values.emergencyNumber"
          :nic-number="values.nic"
          :faculty-id="values.facultyId"
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
