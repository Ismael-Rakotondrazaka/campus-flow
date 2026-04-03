<script setup lang="ts">
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useUserFullname } from '~/features/shared/users/composables/useUserFullname';
import { useUserImageUrl } from '~/features/shared/users/composables/useUserImageUrl';

const user = useSupabaseUser();

const imageUrl = useUserImageUrl({
  first_name: user?.value?.app_metadata?.first_name,
  image_url: user?.value?.app_metadata?.image_url,
  last_name: user?.value?.app_metadata?.last_name,
});

const fullname = useUserFullname(() => ({
  first_name: user?.value?.app_metadata?.first_name,
  last_name: user?.value?.app_metadata?.last_name,
}));
</script>

<template>
  <DropdownMenuTrigger as-child>
    <Avatar>
      <AvatarImage :src="imageUrl" :alt="fullname" />
    </Avatar>
  </DropdownMenuTrigger>
</template>
