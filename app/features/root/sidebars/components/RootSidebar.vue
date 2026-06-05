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
    to: { name: 'admin-root-dashboard' },
  },
  {
    icon: 'mdi:shield-account',
    id: 'admins',
    labelKey: 'sider.root.admins',
    to: { name: 'admin-root-admins' },
  },
  {
    icon: 'mdi:account-group',
    id: 'residents',
    labelKey: 'sider.root.residents',
    to: { name: 'admin-root-residents' },
  },
  {
    icon: 'mdi:domain',
    id: 'faculties',
    labelKey: 'sider.root.faculties',
    to: { name: 'admin-root-faculties' },
  },
  {
    icon: 'mdi:calendar-clock',
    id: 'academic-sessions',
    labelKey: 'sider.root.academicSessions',
    to: { name: 'admin-root-academic-sessions' },
  },
  {
    icon: 'mdi:bullhorn',
    id: 'announcements',
    labelKey: 'sider.root.announcements',
    to: { name: 'admin-root-announcements' },
  },
  {
    icon: 'mdi:office-building',
    id: 'buildings',
    labelKey: 'sider.shared.buildings',
    to: { name: 'admin-root-buildings' },
  },
  {
    icon: 'mdi:bed',
    id: 'lodgments',
    labelKey: 'sider.shared.lodgments',
    to: { name: 'admin-root-lodgments' },
  },
  {
    icon: 'mdi:calendar-check',
    id: 'housing-applications',
    labelKey: 'sider.shared.housingApplications',
    to: { name: 'admin-root-housing-applications' },
  },
  {
    icon: 'mdi:file-refresh',
    id: 'renewals',
    labelKey: 'sider.shared.renewals',
    to: { name: 'admin-root-renewals' },
  },
  {
    icon: 'mdi:wrench',
    id: 'maintenances',
    labelKey: 'sider.shared.maintenances',
    to: { name: 'admin-root-maintenances' },
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
                $t('sider.root.subtitle')
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
