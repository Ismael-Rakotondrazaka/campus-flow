<script setup lang="ts">
import { toast } from 'vue-sonner';

import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from '~/components/ui/dropdown-menu';

const { clear } = useUserSession();
const { t } = useI18n();

const localeRoute = useLocaleRoute();

const handleLogout = async () => {
  await clear();

  toast.success(t('header.logout.success'));

  await navigateTo(
    localeRoute({
      name: 'index',
    })
  );
};
</script>

<template>
  <DropdownMenuItem @click="handleLogout">
    {{ $t('header.logout.label') }}
    <DropdownMenuShortcut>
      <Icon name="mdi:logout" size="1rem" />
    </DropdownMenuShortcut>
  </DropdownMenuItem>
</template>
