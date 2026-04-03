<script setup lang="ts">
import { toast } from 'vue-sonner';

import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';

const handleLogout = async () => {
  const userSBClient = useSupabaseClient();
  const { error } = await userSBClient.auth.signOut();

  if (error) {
    toast.error(getAuthErrorMessage(error));
    return;
  }

  toast.success('Logged out successfully');

  navigateTo({
    name: 'index',
  });
};
</script>

<template>
  <DropdownMenuItem @click="handleLogout">
    Log out
    <DropdownMenuShortcut>
      <Icon name="mdi:logout" size="1rem" />
    </DropdownMenuShortcut>
  </DropdownMenuItem>
</template>
