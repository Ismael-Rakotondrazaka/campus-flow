<script setup lang="ts">
import type {
  Gender,
  Origin,
} from '~/features/shared/residents/resident.model';

import {
  GenderLabel,
  OriginLabel,
} from '~/features/shared/housing-applications/housing-application.model';

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

const getFacultyName = (id: string | undefined, faculties: Faculty[]) => {
  if (!id) return '-';
  return faculties.find(f => f.id === id)?.name ?? '-';
};
</script>

<template>
  <div class="space-y-2">
    <div>
      <h3 class="mb-4 font-semibold">Veuillez vérifier vos informations</h3>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p class="text-muted-foreground text-sm">Prénom</p>
          <p class="font-medium">{{ firstName || '-' }}</p>
        </div>
        <div>
          <p class="text-muted-foreground text-sm">Nom</p>
          <p class="font-medium">{{ lastName || '-' }}</p>
        </div>
        <div>
          <p class="text-muted-foreground text-sm">Genre</p>
          <p class="font-medium">
            {{ gender ? GenderLabel[gender] : '-' }}
          </p>
        </div>
        <div>
          <p class="text-muted-foreground text-sm">Origine</p>
          <p class="font-medium">
            {{ origin ? OriginLabel[origin] : '-' }}
          </p>
        </div>
        <div>
          <p class="text-muted-foreground text-sm">E-mail</p>
          <p class="font-medium">{{ email || '-' }}</p>
        </div>
        <div>
          <p class="text-muted-foreground text-sm">Numéro de téléphone</p>
          <p class="font-medium">{{ phoneNumber || '-' }}</p>
        </div>
        <div>
          <p class="text-muted-foreground text-sm">Numéro d'urgence</p>
          <p class="font-medium">{{ emergencyNumber || '-' }}</p>
        </div>
        <div>
          <p class="text-muted-foreground text-sm">Faculté</p>
          <p class="font-medium">
            {{ getFacultyName(facultyId, faculties) }}
          </p>
        </div>
        <div>
          <p class="text-muted-foreground text-sm">
            Numéro de carte d'identité nationale
          </p>
          <p class="font-medium">{{ nicNumber || '-' }}</p>
        </div>
      </div>
      <div class="mt-4 space-y-2">
        <p class="text-muted-foreground text-sm">Photo d'identité</p>
        <p class="text-sm">
          {{ profilePhotoFileName ?? 'Aucun fichier sélectionné' }}
        </p>
        <p class="text-muted-foreground text-sm">
          Photo de carte d'identité nationale
        </p>
        <p class="text-sm">
          {{ nicFileName ?? 'Aucun fichier sélectionné' }}
        </p>
        <p class="text-muted-foreground text-sm">Certificat de scolarité</p>
        <p class="text-sm">
          {{ schoolCertFileName ?? 'Aucun fichier sélectionné' }}
        </p>
      </div>
    </div>
  </div>
</template>
