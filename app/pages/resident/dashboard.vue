<script setup lang="ts">
import { RenewalStatusLabel } from '#shared/features/renewals/renewal.model';

import { Card, CardContent } from '~/components/ui/card';
import { maintenanceCountQuery } from '~/features/shared/maintenances/maintenance.query';
import { renewalListQuery } from '~/features/shared/renewals/renewal.query';
import { residentByIdQuery } from '~/features/shared/residents/resident.query';

const { t } = useI18n();

const { user: authUser } = useUserSession();

const residentId = computed(() => authUser.value!.id);

const { state: residentState } = useQuery(() =>
  residentByIdQuery({ id: residentId.value })
);

const { refetch: refetchMaintenanceCount, state: maintenanceCountState } =
  useQuery(() => maintenanceCountQuery({ residentId: residentId.value }));

const { refetch: refetchRenewalList, state: renewalListState } = useQuery(() =>
  renewalListQuery({ limit: 1, residentId: residentId.value })
);

const resident = computed(() => residentState.value?.data ?? null);

const latestRenewal = computed(
  () => renewalListState.value?.data?.data?.[0] ?? null
);

const lodgmentInfo = computed(() => {
  const lodgment = resident.value?.lodgment;
  if (!lodgment) return null;
  return {
    building: lodgment.building?.name ?? '',
    floor: lodgment.floor,
    room: lodgment.roomNumber,
  };
});
</script>

<template>
  <div class="container mx-auto p-2">
    <div class="mb-6">
      <template v-if="residentState.status === 'pending'">
        <Skeleton class="mb-2 h-8 w-48" />
        <Skeleton class="h-4 w-64" />
      </template>
      <template v-else-if="resident">
        <h1 class="text-2xl font-bold">
          {{
            t('dashboard.resident.greeting', { firstName: resident.firstName })
          }}
        </h1>
        <p class="text-muted-foreground text-sm">
          {{ t('dashboard.resident.subtitle') }}
        </p>
      </template>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <!-- Maintenances -->
      <Card>
        <CardContent v-if="maintenanceCountState.status === 'pending'">
          <div class="flex items-center gap-4">
            <div class="bg-primary flex items-center justify-center rounded-md">
              <Icon
                name="mdi:wrench"
                size="2.5rem"
                class="text-background m-2 inline-block"
              />
            </div>
            <div>
              <p class="text-foreground text-base font-bold">
                {{ t('dashboard.resident.maintenances.title') }}
              </p>
              <p class="text-muted-foreground text-sm">
                {{ t('dashboard.resident.maintenances.countSubtitle') }}
              </p>
              <Skeleton class="mt-1 h-8 w-20" />
            </div>
          </div>
        </CardContent>

        <CardContent v-if="maintenanceCountState.status === 'error'">
          <div class="flex items-center justify-center">
            <Button
              size="icon"
              variant="outline"
              @click="refetchMaintenanceCount"
            >
              <Icon
                name="mdi:refresh"
                size="1.5rem"
                class="text-foreground inline-block"
              />
            </Button>
          </div>
        </CardContent>

        <CardContent v-else-if="maintenanceCountState.data != null">
          <div class="flex items-center gap-4">
            <div class="bg-primary flex items-center justify-center rounded-md">
              <Icon
                name="mdi:wrench"
                size="2.5rem"
                class="text-background m-2 inline-block"
              />
            </div>
            <div>
              <p class="text-foreground text-base font-bold">
                {{ t('dashboard.resident.maintenances.title') }}
              </p>
              <p class="text-muted-foreground text-sm">
                {{ t('dashboard.resident.maintenances.countSubtitle') }}
              </p>
              <div class="text-2xl font-bold">
                {{ maintenanceCountState.data }}
              </div>
              <NuxtLinkLocale
                :to="{ name: 'resident-maintenances' }"
                class="text-primary mt-1 inline-flex items-center gap-1 text-sm hover:underline"
              >
                {{ t('dashboard.resident.maintenances.viewMine') }}
                <Icon name="mdi:arrow-right" size="1rem" />
              </NuxtLinkLocale>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Renewals -->
      <Card>
        <CardContent v-if="renewalListState.status === 'pending'">
          <div class="flex items-center gap-4">
            <div class="bg-primary flex items-center justify-center rounded-md">
              <Icon
                name="mdi:file-refresh"
                size="2.5rem"
                class="text-background m-2 inline-block"
              />
            </div>
            <div>
              <p class="text-foreground text-base font-bold">
                {{ t('dashboard.resident.renewals.title') }}
              </p>
              <p class="text-muted-foreground text-sm">
                {{ t('dashboard.resident.renewals.lastStatus') }}
              </p>
              <Skeleton class="mt-1 h-6 w-28" />
            </div>
          </div>
        </CardContent>

        <CardContent v-if="renewalListState.status === 'error'">
          <div class="flex items-center justify-center">
            <Button size="icon" variant="outline" @click="refetchRenewalList">
              <Icon
                name="mdi:refresh"
                size="1.5rem"
                class="text-foreground inline-block"
              />
            </Button>
          </div>
        </CardContent>

        <CardContent v-else-if="renewalListState.data != null">
          <div class="flex items-center gap-4">
            <div class="bg-primary flex items-center justify-center rounded-md">
              <Icon
                name="mdi:file-refresh"
                size="2.5rem"
                class="text-background m-2 inline-block"
              />
            </div>
            <div>
              <p class="text-foreground text-base font-bold">
                {{ t('dashboard.resident.renewals.title') }}
              </p>
              <p class="text-muted-foreground text-sm">
                {{ t('dashboard.resident.renewals.lastStatus') }}
              </p>
              <template v-if="latestRenewal">
                <span
                  class="mt-1 inline-block rounded-full px-2 py-0.5 text-sm font-medium"
                  :class="
                    latestRenewal.status === 'accepted' ||
                    latestRenewal.status === 'validated'
                      ? 'bg-green-100 text-green-800'
                      : latestRenewal.status === 'refused'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                  "
                >
                  {{ RenewalStatusLabel[latestRenewal.status] }}
                </span>
              </template>
              <template v-else>
                <p class="text-muted-foreground mt-1 text-sm">
                  {{ t('dashboard.resident.renewals.none') }}
                </p>
              </template>
              <NuxtLinkLocale
                :to="{ name: 'resident-renewals' }"
                class="text-primary mt-1 inline-flex items-center gap-1 text-sm hover:underline"
              >
                {{ t('dashboard.resident.renewals.viewMine') }}
                <Icon name="mdi:arrow-right" size="1rem" />
              </NuxtLinkLocale>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Lodgment -->
      <Card>
        <CardContent v-if="residentState.status === 'pending'">
          <div class="flex items-center gap-4">
            <div class="bg-primary flex items-center justify-center rounded-md">
              <Icon
                name="mdi:home"
                size="2.5rem"
                class="text-background m-2 inline-block"
              />
            </div>
            <div>
              <p class="text-foreground text-base font-bold">
                {{ t('dashboard.resident.lodgment.title') }}
              </p>
              <p class="text-muted-foreground text-sm">
                {{ t('dashboard.resident.lodgment.subtitle') }}
              </p>
              <Skeleton class="mt-1 h-8 w-32" />
            </div>
          </div>
        </CardContent>

        <CardContent v-if="residentState.status === 'error'">
          <div class="flex items-center justify-center">
            <Button size="icon" variant="outline">
              <Icon
                name="mdi:refresh"
                size="1.5rem"
                class="text-foreground inline-block"
              />
            </Button>
          </div>
        </CardContent>

        <CardContent v-else-if="residentState.data != null">
          <div class="flex items-center gap-4">
            <div class="bg-primary flex items-center justify-center rounded-md">
              <Icon
                name="mdi:home"
                size="2.5rem"
                class="text-background m-2 inline-block"
              />
            </div>
            <div>
              <p class="text-foreground text-base font-bold">
                {{ t('dashboard.resident.lodgment.title') }}
              </p>
              <p class="text-muted-foreground text-sm">
                {{ t('dashboard.resident.lodgment.subtitle') }}
              </p>
              <template v-if="lodgmentInfo">
                <div class="text-2xl font-bold">
                  {{ lodgmentInfo.building }}
                </div>
                <p class="text-muted-foreground text-sm">
                  {{
                    t('dashboard.resident.lodgment.floorRoom', {
                      floor: lodgmentInfo.floor,
                      room: lodgmentInfo.room,
                    })
                  }}
                </p>
              </template>
              <template v-else>
                <p class="text-muted-foreground mt-1 text-sm">
                  {{ t('dashboard.resident.lodgment.none') }}
                </p>
              </template>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
