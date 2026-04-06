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

const academicSession = useRouteQuery<string | undefined, string | undefined>(
  'g_academic_session_id',
  undefined
);

const menus = computed<Menu[]>(() => [
  {
    icon: 'mdi:view-dashboard',
    id: 'dashboard',
    label: 'Tableau de bord',
    to: {
      name: 'admin-root-dashboard',
      query: academicSession.value
        ? { g_academic_session_id: academicSession.value }
        : undefined,
    },
  },
  {
    icon: 'mdi:shield-account',
    id: 'admins',
    label: 'Administrateurs',
    to: {
      name: 'admin-root-admins',
      query: academicSession.value
        ? { g_academic_session_id: academicSession.value }
        : undefined,
    },
  },
  {
    icon: 'mdi:account',
    id: 'users',
    label: 'Utilisateurs',
    to: {
      name: 'admin-root-users',
      query: academicSession.value
        ? { g_academic_session_id: academicSession.value }
        : undefined,
    },
  },
  {
    icon: 'mdi:account-group',
    id: 'residents',
    label: 'Résidents',
    to: {
      name: 'admin-root-residents',
      query: academicSession.value
        ? { g_academic_session_id: academicSession.value }
        : undefined,
    },
  },
  {
    icon: 'mdi:domain',
    id: 'faculties',
    label: 'Facultés',
    to: {
      name: 'admin-root-faculties',
      query: academicSession.value
        ? { g_academic_session_id: academicSession.value }
        : undefined,
    },
  },
  {
    icon: 'mdi:calendar-clock',
    id: 'academic-sessions',
    label: 'Sessions académiques',
    to: {
      name: 'admin-root-academic-sessions',
      query: academicSession.value
        ? { g_academic_session_id: academicSession.value }
        : undefined,
    },
  },
  {
    icon: 'mdi:bullhorn',
    id: 'announcements',
    label: 'Annonces',
    to: {
      name: 'admin-root-announcements',
      query: academicSession.value
        ? { g_academic_session_id: academicSession.value }
        : undefined,
    },
  },
  {
    icon: 'mdi:office-building',
    id: 'buildings',
    label: 'Bâtiments',
    to: {
      name: 'admin-root-buildings',
      query: academicSession.value
        ? { g_academic_session_id: academicSession.value }
        : undefined,
    },
  },
  {
    icon: 'mdi:bed',
    id: 'lodgments',
    label: 'Logements',
    to: {
      name: 'admin-root-lodgments',
      query: academicSession.value
        ? { g_academic_session_id: academicSession.value }
        : undefined,
    },
  },
  {
    icon: 'mdi:calendar-check',
    id: 'housing-applications',
    label: 'Demandes de Logement',
    to: {
      name: 'admin-root-housing-applications',
      query: academicSession.value
        ? { g_academic_session_id: academicSession.value }
        : undefined,
    },
  },
  {
    icon: 'mdi:file-refresh',
    id: 'renewals',
    label: 'Renouvellements',
    to: {
      name: 'admin-root-renewals',
      query: academicSession.value
        ? { g_academic_session_id: academicSession.value }
        : undefined,
    },
  },
  {
    icon: 'mdi:wrench',
    id: 'maintenances',
    label: 'Maintenances',
    to: {
      name: 'admin-root-maintenances',
      query: academicSession.value
        ? { g_academic_session_id: academicSession.value }
        : undefined,
    },
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
