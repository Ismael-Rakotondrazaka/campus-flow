<script setup lang="ts">
import type { Maintenance } from '#imports';

import { useMutation } from '@pinia/colada';
import { formatDate } from '@vueuse/core';
import { MaintenanceStatus } from '#imports';
import { toast } from 'vue-sonner';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import MaintenanceStatusBadge from '~/features/shared/maintenances/components/MaintenanceStatusBadge.vue';
import MaintenanceTypeBadge from '~/features/shared/maintenances/components/MaintenanceTypeBadge.vue';
import { useUpdateMaintenance } from '~/features/shared/maintenances/maintenance.query';

interface Props {
  maintenance: Serialize<Maintenance>;
}

const props = defineProps<Props>();

const { locale, t } = useI18n();

const { mutateAsync: updateMaintenance } = useMutation(useUpdateMaintenance());

const acceptDialogOpen = ref(false);
const refuseDialogOpen = ref(false);
const doneDialogOpen = ref(false);
const isSubmitting = ref(false);

const isTerminal = computed(
  () =>
    props.maintenance.status === MaintenanceStatus.done ||
    props.maintenance.status === MaintenanceStatus.refused
);

const submit = async (status: Serialize<Maintenance>['status']) => {
  isSubmitting.value = true;
  try {
    await updateMaintenance({
      id: props.maintenance.id,
      updates: { status },
    });
    toast.success(t('common.toasts.maintenance.statusUpdated'));
    acceptDialogOpen.value = false;
    refuseDialogOpen.value = false;
    doneDialogOpen.value = false;
  } catch (error) {
    handleFetchError(error, t);
  } finally {
    isSubmitting.value = false;
  }
};

const handleAccept = () => submit(MaintenanceStatus.accepted);
const handleRefuse = () => submit(MaintenanceStatus.refused);
const handleDone = () => submit(MaintenanceStatus.done);

const formatDateLocalized = (dateStr: string) =>
  formatDate(new Date(dateStr), 'DD/MM/YYYY HH:mm', {
    locales: locale.value,
  });

const maintenanceTerminalStatus = computed(() =>
  t(
    props.maintenance.status === MaintenanceStatus.done
      ? 'admin.maintenances.workflow.terminalDone'
      : 'admin.maintenances.workflow.terminalRefused'
  )
);
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ $t('admin.maintenances.infoCardTitle') }}</CardTitle>
    </CardHeader>
    <CardContent class="space-y-4">
      <div class="grid gap-y-3 text-sm sm:grid-cols-2">
        <div>
          <p class="text-muted-foreground">{{ $t('common.cards.type') }}</p>
          <MaintenanceTypeBadge :value="maintenance.type" />
        </div>
        <div>
          <p class="text-muted-foreground">
            {{ $t('admin.maintenances.currentStatus') }}
          </p>
          <MaintenanceStatusBadge :value="maintenance.status" />
        </div>
        <div>
          <p class="text-muted-foreground">
            {{ $t('common.cards.reportedAt') }}
          </p>
          <p class="font-medium">
            {{ formatDateLocalized(maintenance.createdAt) }}
          </p>
        </div>
        <div v-if="maintenance.startAt">
          <p class="text-muted-foreground">
            {{ $t('common.cards.workStart') }}
          </p>
          <p class="font-medium">
            {{ formatDateLocalized(maintenance.startAt) }}
          </p>
        </div>
        <div v-if="maintenance.endAt">
          <p class="text-muted-foreground">{{ $t('common.cards.workEnd') }}</p>
          <p class="font-medium">
            {{ formatDateLocalized(maintenance.endAt) }}
          </p>
        </div>
      </div>

      <div>
        <p class="text-muted-foreground mb-1 text-sm">
          {{ $t('common.cards.description') }}
        </p>
        <p class="text-sm">{{ maintenance.description }}</p>
      </div>

      <div class="border-t pt-4">
        <p class="text-muted-foreground mb-2 text-sm">
          {{ $t('common.cards.actions') }}
        </p>

        <!-- Terminal states -->
        <p v-if="isTerminal" class="text-muted-foreground text-sm">
          {{
            $t('admin.workflow.maintenanceTerminalPrefix', {
              status: maintenanceTerminalStatus,
            })
          }}
        </p>

        <!-- pending → accept or refuse -->
        <div
          v-else-if="maintenance.status === MaintenanceStatus.pending"
          class="flex gap-2"
        >
          <Dialog v-model:open="acceptDialogOpen">
            <DialogTrigger as-child>
              <Button class="flex-1" :disabled="isSubmitting">
                <Icon name="mdi:check" />
                {{ $t('common.buttons.accept') }}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {{ $t('admin.maintenances.workflow.acceptTitle') }}
                </DialogTitle>
                <DialogDescription>
                  {{ $t('admin.maintenances.workflow.acceptDescription') }}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  :disabled="isSubmitting"
                  @click="acceptDialogOpen = false"
                >
                  {{ $t('forms.buttons.cancel') }}
                </Button>
                <Button :disabled="isSubmitting" @click="handleAccept">
                  {{ $t('common.buttons.confirmAccept') }}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog v-model:open="refuseDialogOpen">
            <DialogTrigger as-child>
              <Button
                class="flex-1"
                variant="destructive"
                :disabled="isSubmitting"
              >
                <Icon name="mdi:close" />
                {{ $t('common.buttons.reject') }}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {{ $t('admin.maintenances.workflow.rejectTitle') }}
                </DialogTitle>
                <DialogDescription>
                  {{ $t('admin.maintenances.workflow.rejectDescription') }}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  :disabled="isSubmitting"
                  @click="refuseDialogOpen = false"
                >
                  {{ $t('forms.buttons.cancel') }}
                </Button>
                <Button
                  variant="destructive"
                  :disabled="isSubmitting"
                  @click="handleRefuse"
                >
                  {{ $t('common.workflow.rejectDialog.confirm') }}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <!-- accepted → done -->
        <div
          v-else-if="maintenance.status === MaintenanceStatus.accepted"
          class="flex gap-2"
        >
          <Dialog v-model:open="doneDialogOpen">
            <DialogTrigger as-child>
              <Button class="flex-1" :disabled="isSubmitting">
                <Icon name="mdi:check-all" />
                {{ $t('admin.maintenances.workflow.markDone') }}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {{ $t('admin.maintenances.workflow.doneTitle') }}
                </DialogTitle>
                <DialogDescription>
                  {{ $t('admin.maintenances.workflow.doneDescription') }}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  :disabled="isSubmitting"
                  @click="doneDialogOpen = false"
                >
                  {{ $t('forms.buttons.cancel') }}
                </Button>
                <Button :disabled="isSubmitting" @click="handleDone">
                  {{ $t('common.buttons.confirm') }}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
