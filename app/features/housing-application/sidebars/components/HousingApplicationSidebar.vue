<script setup lang="ts">
import type { RouteLocationNamedI18n } from 'vue-router';

import { Icon } from '#components';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/components/ui/sidebar';

interface Menu {
  icon: string;
  id: string;
  labelKey: string;
  to: RouteLocationNamedI18n;
}

const { t } = useI18n();

const menus = computed<Menu[]>(() => [
  {
    icon: 'mdi:view-dashboard',
    id: 'dashboard',
    labelKey: 'sider.shared.dashboard',
    to: { name: 'admin-housing-application-dashboard' },
  },
  {
    icon: 'mdi:office-building',
    id: 'buildings',
    labelKey: 'sider.shared.buildings',
    to: { name: 'admin-housing-application-buildings' },
  },
  {
    icon: 'mdi:bed',
    id: 'lodgments',
    labelKey: 'sider.shared.lodgments',
    to: { name: 'admin-housing-application-lodgments' },
  },
  {
    icon: 'mdi:calendar-check',
    id: 'housing-applications',
    labelKey: 'sider.shared.housingApplications',
    to: { name: 'admin-housing-application-housing-applications' },
  },
]);
</script>

<template>
  <Sidebar collapsible="offcanvas">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <div class="flex flex-col leading-none">
              <span class="text-primary text-2xl font-bold">{{
                $t('common.brand.name')
              }}</span>
              <span class="text-muted-foreground text-sm">{{
                $t('sider.housingApplication.subtitle')
              }}</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="menu in menus" :key="menu.id">
              <SidebarMenuButton as-child>
                <NuxtLinkLocale :to="menu.to">
                  <Icon
                    :name="menu.icon"
                    size="16px"
                    class="text-primary shrink-0"
                  />
                  <span>{{ t(menu.labelKey) }}</span>
                </NuxtLinkLocale>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
