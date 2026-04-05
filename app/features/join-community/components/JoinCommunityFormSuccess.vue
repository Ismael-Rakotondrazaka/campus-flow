<script setup lang="ts">
import { Icon } from '#components';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
</script>

<template>
  <Card class="border-green-200 bg-green-50">
    <CardHeader>
      <div class="flex items-center gap-3">
        <Icon name="mdi:check-circle" class="size-8 text-green-600" />
        <div>
          <CardTitle>Demande soumise avec succès</CardTitle>
          <CardDescription>
            Votre demande de logement a été reçue. Nous l'examinerons et vous
            recontacterons bientôt.
          </CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Button @click="() => navigateTo('/')"> Retour à l'accueil </Button>
    </CardContent>
  </Card>
</template>
