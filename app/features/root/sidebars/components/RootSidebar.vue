<script setup lang="ts">
import type { NuxtLinkProps } from 'nuxt/app';

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
} from '@/components/ui/sidebar';

interface Menu {
  icon: string;
  id: string;
  label: string;
  to: NuxtLinkProps['to'];
}

const menus: Menu[] = [
  {
    icon: 'mdi:view-dashboard',
    id: 'dashboard',
    label: 'Tableau de bord',
    to: { name: 'admin-root-dashboard' },
  },
  {
    icon: 'mdi:shield-account',
    id: 'admins',
    label: 'Administrateurs',
    to: { name: 'admin-root-admins' },
  },
  {
    icon: 'mdi:account',
    id: 'users',
    label: 'Utilisateurs',
    to: { name: 'admin-root-users' },
  },
  {
    icon: 'mdi:account-group',
    id: 'residents',
    label: 'Résidents',
    to: { name: 'admin-root-residents' },
  },
  {
    icon: 'mdi:domain',
    id: 'faculties',
    label: 'Facultés',
    to: { name: 'admin-root-faculties' },
  },
  {
    icon: 'mdi:calendar-clock',
    id: 'academic-sessions',
    label: 'Sessions académiques',
    to: { name: 'admin-root-academic-sessions' },
  },
  {
    icon: 'mdi:bullhorn',
    id: 'announcements',
    label: 'Annonces',
    to: { name: 'admin-root-announcements' },
  },
  {
    icon: 'mdi:office-building',
    id: 'buildings',
    label: 'Bâtiments',
    to: { name: 'admin-root-buildings' },
  },
  {
    icon: 'mdi:bed',
    id: 'lodgments',
    label: 'Logements',
    to: { name: 'admin-root-lodgments' },
  },
  {
    icon: 'mdi:calendar-check',
    id: 'housing-applications',
    label: 'Demandes de Logement',
    to: { name: 'admin-root-housing-applications' },
  },
  {
    icon: 'mdi:file-refresh',
    id: 'renewals',
    label: 'Renouvellements',
    to: { name: 'admin-root-renewals' },
  },
  {
    icon: 'mdi:wrench',
    id: 'maintenances',
    label: 'Maintenances',
    to: { name: 'admin-root-maintenances' },
  },
];
</script>

<template>
  <Sidebar collapsible="offcanvas">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <div class="flex flex-col leading-none">
              <span class="text-primary text-2xl font-bold">Lumièrebourg</span>
              <span class="text-muted-foreground text-sm"
                >Pour Administrateur</span
              >
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
                <NuxtLink :to="menu.to">
                  <Icon :name="menu.icon" size="16px" class="shrink-0" />
                  <span>{{ menu.label }}</span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
