<script setup lang="ts">
import { useQuery } from '@pinia/colada';

import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import CreateRenewalForm from '~/features/residents/renewals/components/CreateRenewalForm.vue';
import { activeRenewalSessionQuery } from '~/features/shared/academic-sessions/academic-session.query';
import { renewalListQuery } from '~/features/shared/renewals/renewal.query';

const { user: authUser } = useUserSession();
const localeRoute = useLocaleRoute();

const { data: activeSession, isPending: isSessionPending } = useQuery(() =>
  activeRenewalSessionQuery()
);

const { data: existingRenewals, isPending: isRenewalPending } = useQuery(() =>
  renewalListQuery({
    academicSessionId: activeSession.value?.id,
    limit: 1,
    residentId: authUser.value!.id,
  })
);

const isPending = computed(
  () => isSessionPending.value || isRenewalPending.value
);

const existingRenewal = computed(
  () => existingRenewals.value?.data?.[0] ?? null
);
</script>

<template>
  <div class="container mx-auto p-2">
    <h1 class="mb-4 text-2xl font-bold">
      {{ $t('resident.renewals.createPageTitle') }}
    </h1>

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
                Les renouvellements sont actuellement fermés
              </CardTitle>
              <CardDescription>
                La période de renouvellement n'est pas ouverte pour le moment.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p class="text-muted-foreground mb-4 text-sm">
            Veuillez revenir pendant la période de renouvellement.
          </p>
          <NuxtLinkLocale :to="localeRoute({ name: 'resident-renewals' })">
            <Button variant="ghost">
              <Icon name="mdi:arrow-left" />
              Retour à mes renouvellements
            </Button>
          </NuxtLinkLocale>
        </CardContent>
      </Card>
    </div>

    <!-- Already submitted state -->
    <div v-else-if="existingRenewal" class="mx-auto max-w-lg">
      <Card class="border-blue-200 bg-blue-50">
        <CardHeader>
          <div class="flex items-center gap-3">
            <Icon name="mdi:check-circle" class="size-8 text-blue-600" />
            <div>
              <CardTitle>Demande déjà soumise</CardTitle>
              <CardDescription>
                Vous avez déjà soumis une demande de renouvellement pour cette
                session.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <NuxtLinkLocale
            :to="
              localeRoute({
                name: 'resident-renewals-renewalId',
                params: { renewalId: existingRenewal.id },
              })
            "
          >
            <Button variant="outline">
              <Icon name="mdi:eye" />
              Voir ma demande
            </Button>
          </NuxtLinkLocale>
        </CardContent>
      </Card>
    </div>

    <!-- Active form -->
    <CreateRenewalForm v-else :session="activeSession" />
  </div>
</template>
