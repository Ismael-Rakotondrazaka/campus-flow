<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import JoinCommunityForm from '~/features/join-community/components/JoinCommunityForm.vue';
import { activeApplicationSessionQuery } from '~/features/shared/academic-sessions/academic-session.query';

useHead({
  title: 'Rejoindre la Communauté - Campus Flow',
});

const { data: activeSession, isPending } = useQuery(() =>
  activeApplicationSessionQuery()
);
</script>

<template>
  <div
    class="from-background to-muted/20 min-h-screen bg-linear-to-b px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="mx-auto max-w-3xl">
      <div class="mb-8">
        <h1 class="text-primary text-3xl font-bold">Rejoindre la communauté</h1>
        <p class="text-muted-foreground mt-2 text-lg">
          Pour rejoindre la communauté, veuillez remplir les informations
          suivantes pour soumettre votre demande.
        </p>
      </div>

      <!-- Loading state -->
      <div v-if="isPending" class="space-y-2">
        <Skeleton class="h-12 rounded-lg" />
        <Skeleton class="h-64 rounded-lg" />
      </div>

      <!-- Closed window state -->
      <div v-else-if="!activeSession" class="mx-auto max-w-lg">
        <Card class="border-amber-200 bg-amber-50">
          <CardHeader>
            <div class="flex items-center gap-3">
              <Icon name="mdi:information" class="size-8 text-amber-600" />
              <div>
                <CardTitle>
                  Les Candidatures sont actuellement fermées
                </CardTitle>
                <CardDescription>
                  Les demandes de logement ne sont pas actuellement ouvertes
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground mb-4 text-sm">
              Veuillez revenir plus tard pendant la période de candidature. Nous
              accepterons bientôt les demandes de logement.
            </p>
            <NuxtLink to="/" class="text-primary hover:underline">
              <Button variant="ghost">
                <Icon name="mdi:arrow-left" />
                Retour à l'accueil
              </Button>
            </NuxtLink>
          </CardContent>
        </Card>
      </div>

      <!-- Active form -->
      <JoinCommunityForm v-else :session="activeSession" />
    </div>
  </div>
</template>
