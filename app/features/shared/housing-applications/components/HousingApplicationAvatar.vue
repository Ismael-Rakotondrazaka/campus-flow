<script setup lang="ts">
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useHousingApplicationSignedUrl } from '~/features/shared/housing-applications/composables/useHousingApplicationSignedUrl';
import { formatFallbackUrl } from '~/features/shared/users/composables/useUserImageUrl';

interface Props {
  firstName?: null | string;
  imageUrl?: null | string;
  lastName?: null | string;
}

const props = defineProps<Props>();

const { getSignedUrl } = useHousingApplicationSignedUrl();

const resolvedUrl = ref<null | string>(null);

const fullname = computed(() => {
  const parts: string[] = [];
  if (props.firstName?.trim()) parts.push(props.firstName.trim());
  if (props.lastName?.trim()) parts.push(props.lastName.trim());
  return parts.join(' ') || 'Utilisateur';
});

const fallbackUrl = computed(() =>
  formatFallbackUrl(props.firstName, props.lastName)
);

watchEffect(async () => {
  const url = props.imageUrl;

  if (!url) {
    resolvedUrl.value = null;
    return;
  }

  // Full URL (seed data or legacy) — use as-is
  if (url.startsWith('http')) {
    resolvedUrl.value = url;
    return;
  }

  // Storage path — generate signed URL
  try {
    resolvedUrl.value = await getSignedUrl(url);
  } catch {
    resolvedUrl.value = null;
  }
});
</script>

<template>
  <Avatar>
    <AvatarImage :alt="fullname" :src="resolvedUrl ?? fallbackUrl" />
  </Avatar>
</template>
