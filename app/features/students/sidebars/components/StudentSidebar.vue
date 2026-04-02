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
    to: { name: 'students-dashboard' },
  },
  {
    icon: 'mdi:refresh',
    id: 'renewals',
    label: 'Renouvellements',
    to: { name: 'students-renewals' },
  },
  {
    icon: 'mdi:bullhorn',
    id: 'announcements',
    label: 'Annonces',
    to: { name: 'students-announcements' },
  },
  {
    icon: 'mdi:wrench',
    id: 'maintenances',
    label: 'Maintenances',
    to: { name: 'students-maintenances' },
  },
  {
    icon: 'mdi:cog',
    id: 'settings',
    label: 'Paramètres',
    to: { name: 'students-settings' },
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
              <span class="text-muted-foreground text-sm">Espace étudiant</span>
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
