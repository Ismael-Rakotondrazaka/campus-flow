<script setup lang="ts">
import type { Gender, Origin } from '#imports';

import { GenderLabel, OriginLabel } from '#imports';

interface Faculty {
  id: string;
  name: string;
}

interface Props {
  email: string | undefined;
  emergencyNumber: string | undefined;
  faculties: Faculty[];
  facultyId: string | undefined;
  firstName: string | undefined;
  gender: Gender | null;
  lastName: string | undefined;
  nicFileName: null | string;
  nicNumber: string | undefined;
  origin: null | Origin;
  phoneNumber: string | undefined;
  profilePhotoFileName: null | string;
  schoolCertFileName: null | string;
}

defineProps<Props>();

const { t } = useI18n();

const getFacultyName = (id: string | undefined, faculties: Faculty[]) => {
  if (!id) return '-';
  return faculties.find(f => f.id === id)?.name ?? '-';
};
</script>

<template>
  <div class="space-y-2">
    <div>
      <h3 class="mb-4 font-semibold">
        {{ t('joinCommunity.verification.title') }}
      </h3>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p class="text-muted-foreground text-sm">
            {{ t('joinCommunity.fields.firstName') }}
          </p>
          <p class="font-medium">{{ firstName || '-' }}</p>
        </div>
        <div>
          <p class="text-muted-foreground text-sm">
            {{ t('joinCommunity.fields.lastName') }}
          </p>
          <p class="font-medium">{{ lastName || '-' }}</p>
        </div>
        <div>
          <p class="text-muted-foreground text-sm">
            {{ t('joinCommunity.fields.gender') }}
          </p>
          <p class="font-medium">
            {{ gender ? GenderLabel[gender] : '-' }}
          </p>
        </div>
        <div>
          <p class="text-muted-foreground text-sm">
            {{ t('joinCommunity.fields.origin') }}
          </p>
          <p class="font-medium">
            {{ origin ? OriginLabel[origin] : '-' }}
          </p>
        </div>
        <div>
          <p class="text-muted-foreground text-sm">
            {{ t('joinCommunity.fields.email') }}
          </p>
          <p class="font-medium">{{ email || '-' }}</p>
        </div>
        <div>
          <p class="text-muted-foreground text-sm">
            {{ t('joinCommunity.fields.phoneNumber') }}
          </p>
          <p class="font-medium">{{ phoneNumber || '-' }}</p>
        </div>
        <div>
          <p class="text-muted-foreground text-sm">
            {{ t('joinCommunity.fields.emergencyNumber') }}
          </p>
          <p class="font-medium">{{ emergencyNumber || '-' }}</p>
        </div>
        <div>
          <p class="text-muted-foreground text-sm">
            {{ t('joinCommunity.fields.faculty') }}
          </p>
          <p class="font-medium">
            {{ getFacultyName(facultyId, faculties) }}
          </p>
        </div>
        <div>
          <p class="text-muted-foreground text-sm">
            {{ t('joinCommunity.fields.nicFull') }}
          </p>
          <p class="font-medium">{{ nicNumber || '-' }}</p>
        </div>
      </div>
      <div class="mt-4 space-y-2">
        <p class="text-muted-foreground text-sm">
          {{ t('joinCommunity.fields.profilePhoto') }}
        </p>
        <p class="text-sm">
          {{ profilePhotoFileName ?? t('common.empty.noFileSelected') }}
        </p>
        <p class="text-muted-foreground text-sm">
          {{ t('joinCommunity.fields.nicPhotoFull') }}
        </p>
        <p class="text-sm">
          {{ nicFileName ?? t('common.empty.noFileSelected') }}
        </p>
        <p class="text-muted-foreground text-sm">
          {{ t('joinCommunity.fields.schoolCertificate') }}
        </p>
        <p class="text-sm">
          {{ schoolCertFileName ?? t('common.empty.noFileSelected') }}
        </p>
      </div>
    </div>
  </div>
</template>
