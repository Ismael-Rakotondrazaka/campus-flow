<script setup lang="ts">
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '~/components/ui/empty';
import { Spinner } from '~/components/ui/spinner';

const ConfirmStatus = {
  failed: 'failed',
  processing: 'processing',
  success: 'success',
} as const;

type ConfirmSuccess = (typeof ConfirmStatus)[keyof typeof ConfirmStatus];
const { fetch: refreshSession, user } = useUserSession();
const { t } = useI18n();

const status = ref<ConfirmSuccess>(ConfirmStatus.processing);

const route = useRoute('confirm');

const titleMap: Record<ConfirmSuccess, string> = {
  [ConfirmStatus.failed]: 'Error encountered',
  [ConfirmStatus.processing]: 'Confirming your email',
  [ConfirmStatus.success]: 'Email confirmed',
};

const title = computed(() => titleMap[status.value]);

const errorCode = ref<string | undefined>();

const descriptionMap: Record<ConfirmSuccess, string> = {
  [ConfirmStatus.failed]: 'Could not confirm.',
  [ConfirmStatus.processing]:
    'Please wait while we confirm your email. Do not refresh the page.',
  [ConfirmStatus.success]: 'Your email has been confirmed. Redirecting...',
};

const authConfirmErrorMessage = (code: string) => {
  const key = `errors.requests.auth.signin.${code}`;
  const message = t(key);
  return message === key ? t('errors.requests.auth.signin.default') : message;
};

const description = computed(() =>
  errorCode.value
    ? authConfirmErrorMessage(errorCode.value)
    : descriptionMap[status.value]
);

onMounted(() => {
  setTimeout(() => {
    if (typeof route.query.error_code === 'string') {
      errorCode.value = route.query.error_code;
      status.value = ConfirmStatus.failed;
    }
  }, 3000);
});

const localeRoute = useLocaleRoute();

const refreshAuthUserData = async () => {
  await refreshSession();
};

watch(
  user,
  () => {
    if (user.value) {
      setTimeout(() => {
        status.value = ConfirmStatus.success;

        void refreshAuthUserData();

        setTimeout(async () => {
          await navigateTo(localeRoute({ name: 'index' }));
        }, 3000);
      }, 3000);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div class="w-full max-w-sm">
      <Empty class="w-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Spinner v-if="status === ConfirmStatus.processing" />
            <Icon
              v-else-if="status === ConfirmStatus.success"
              name="mdi:check"
              size="1rem"
              class="text-primary"
            />
            <Icon
              v-else-if="status === ConfirmStatus.failed"
              name="mdi:close-circle-outline"
              size="1rem"
              class="text-destructive"
            />
          </EmptyMedia>
          <EmptyTitle>{{ title }}</EmptyTitle>
          <EmptyDescription>
            {{ description }}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  </div>
</template>
