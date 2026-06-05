<script setup lang="ts">
import { Avatar, AvatarImage } from '~/components/ui/avatar';
import { DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { useUserFullname } from '~/features/shared/users/composables/useUserFullname';
import { useUserImageUrl } from '~/features/shared/users/composables/useUserImageUrl';

const { user: authUser } = useUserSession();

const imageUrl = useUserImageUrl(() => authUser.value ?? {});

const fullname = useUserFullname(() => authUser.value ?? {});
</script>

<template>
  <DropdownMenuTrigger as-child>
    <Avatar>
      <AvatarImage :src="imageUrl" :alt="fullname" />
    </Avatar>
  </DropdownMenuTrigger>
</template>
