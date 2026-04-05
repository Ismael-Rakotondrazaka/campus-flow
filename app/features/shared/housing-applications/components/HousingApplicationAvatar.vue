<script setup lang="ts">
import { useQuery } from '@pinia/colada';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { housingApplicationSignedUrlQuery } from '~/features/shared/housing-applications/composables/useHousingApplicationSignedUrl';
import { formatFallbackUrl } from '~/features/shared/users/composables/useUserImageUrl';

interface Props {
  firstName?: null | string;
  imageUrl?: null | string;
  lastName?: null | string;
}

const props = defineProps<Props>();

const isStoragePath = computed(
  () => !!props.imageUrl && !props.imageUrl.startsWith('http')
);

const { data: signedUrl } = useQuery(() => ({
  ...housingApplicationSignedUrlQuery(props.imageUrl ?? ''),
  enabled: isStoragePath.value,
}));

const fallbackUrl = computed(() =>
  formatFallbackUrl(props.firstName, props.lastName)
);

const resolvedUrl = computed(() => {
  if (!props.imageUrl) return fallbackUrl.value;
  if (!isStoragePath.value) return props.imageUrl; // full http URL
  return signedUrl.value ?? fallbackUrl.value;
});

const fullname = computed(() => {
  const parts: string[] = [];
  if (props.firstName?.trim()) parts.push(props.firstName.trim());
  if (props.lastName?.trim()) parts.push(props.lastName.trim());
  return parts.join(' ') || 'Utilisateur';
});
</script>

<template>
  <Avatar>
    <AvatarImage :alt="fullname" :src="resolvedUrl" />
  </Avatar>
</template>
