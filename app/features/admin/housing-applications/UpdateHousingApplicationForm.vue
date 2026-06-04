<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui';

import { useQuery } from '@pinia/colada';
import {
  type HousingApplication,
  HousingApplicationStatus,
  RefusalReasonLabel,
  RefusalReasons,
} from '#imports';
import { toast } from 'vue-sonner';

import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useUpdateHousingApplication } from '~/features/shared/housing-applications/housing-application.query';
import { lodgmentListQuery } from '~/features/shared/lodgments/lodgment.query';

interface Props {
  housingApplication: Serialize<HousingApplication>;
}

const props = defineProps<Props>();

const { t } = useI18n();

const updateMutation = useUpdateHousingApplication();

const { state: lodgmentsState } = useQuery(() =>
  lodgmentListQuery({ limit: 200 })
);
const lodgments = computed(() => lodgmentsState.value?.data?.data ?? []);

const selectedLodgmentId = ref<null | string>(
  props.housingApplication.lodgmentId ?? null
);
const selectedRefusalReason = ref<null | string>(
  props.housingApplication.refusalReason ?? null
);

const acceptDialogOpen = ref(false);
const refuseDialogOpen = ref(false);
const validateDialogOpen = ref(false);
const isSubmitting = ref(false);

watch(
  () => props.housingApplication,
  app => {
    selectedLodgmentId.value = app.lodgmentId ?? null;
    selectedRefusalReason.value = app.refusalReason ?? null;
  }
);

const isTerminal = computed(
  () =>
    props.housingApplication.status === HousingApplicationStatus.validated ||
    props.housingApplication.status === HousingApplicationStatus.refused
);

const selectedLodgment = computed(() =>
  lodgments.value.find(l => l.id === selectedLodgmentId.value)
);

const onLodgmentChange = (value: AcceptableValue) => {
  selectedLodgmentId.value = value as null | string;
};

const onRefusalReasonChange = (value: AcceptableValue) => {
  selectedRefusalReason.value = value as null | string;
};

const submit = async (
  status: Serialize<HousingApplication>['status'],
  extra: { lodgmentId?: null | string; refusalReason?: null | string } = {}
) => {
  isSubmitting.value = true;
  try {
    await updateMutation.mutation({
      id: props.housingApplication.id,
      updates: { status, ...extra },
    });
    toast.success(t('common.toasts.housingApplication.updated'));
    acceptDialogOpen.value = false;
    refuseDialogOpen.value = false;
    validateDialogOpen.value = false;
  } catch (error) {
    handleFetchError(error, t);
  } finally {
    isSubmitting.value = false;
  }
};

const handleAccept = () => submit(HousingApplicationStatus.accepted);

const handleValidate = () =>
  submit(HousingApplicationStatus.validated, {
    lodgmentId: selectedLodgmentId.value,
  });

const handleRefuse = () =>
  submit(HousingApplicationStatus.refused, {
    refusalReason: selectedRefusalReason.value,
  });

const terminalStatusLabel = computed(() =>
  t(
    props.housingApplication.status === HousingApplicationStatus.validated
      ? 'admin.workflow.terminalValidated'
      : 'admin.workflow.terminalRefused'
  )
);
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ $t('admin.housingApplications.manageTitle') }}</CardTitle>
      <CardDescription>
        {{ $t('admin.housingApplications.manageDescription') }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <!-- Terminal state -->
      <p v-if="isTerminal" class="text-muted-foreground text-sm">
        {{
          $t('admin.workflow.terminalPrefix', {
            status: terminalStatusLabel,
          })
        }}
      </p>

      <!-- pending → accept or refuse -->
      <div
        v-else-if="
          housingApplication.status === HousingApplicationStatus.pending
        "
        class="flex gap-2"
      >
        <!-- Accept -->
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
                {{ $t('common.workflow.acceptDialog.title') }}
              </DialogTitle>
              <DialogDescription>
                {{ $t('admin.housingApplications.workflow.acceptDescription') }}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                :disabled="isSubmitting"
                @click="acceptDialogOpen = false"
              >
                <Icon name="mdi:close" />
                {{ $t('forms.buttons.cancel') }}
              </Button>
              <Button :disabled="isSubmitting" @click="handleAccept">
                <Icon
                  v-if="isSubmitting"
                  name="mdi:loading"
                  class="animate-spin"
                />
                <Icon v-else name="mdi:check" />
                {{ $t('common.buttons.confirmAccept') }}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <!-- Refuse -->
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
                {{ $t('common.workflow.rejectDialog.title') }}
              </DialogTitle>
              <DialogDescription>
                {{ $t('admin.housingApplications.workflow.rejectDescription') }}
              </DialogDescription>
            </DialogHeader>
            <FieldGroup class="py-2">
              <Field>
                <FieldLabel for="refusal-reason-select">
                  {{ $t('admin.workflow.refusalReason') }}
                </FieldLabel>
                <Select
                  :model-value="selectedRefusalReason ?? ''"
                  @update:model-value="onRefusalReasonChange"
                >
                  <SelectTrigger id="refusal-reason-select">
                    <SelectValue
                      :placeholder="$t('common.workflow.chooseReason')"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        v-for="reason in RefusalReasons"
                        :key="reason"
                        :value="reason"
                      >
                        {{ RefusalReasonLabel[reason] }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
            <DialogFooter>
              <Button
                variant="outline"
                :disabled="isSubmitting"
                @click="refuseDialogOpen = false"
              >
                <Icon name="mdi:close" />
                {{ $t('forms.buttons.cancel') }}
              </Button>
              <Button
                variant="destructive"
                :disabled="isSubmitting"
                @click="handleRefuse"
              >
                <Icon
                  v-if="isSubmitting"
                  name="mdi:loading"
                  class="animate-spin"
                />
                <Icon v-else name="mdi:close" />
                {{ $t('common.workflow.rejectDialog.confirm') }}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <!-- accepted → assign lodgment + validate, or refuse -->
      <FieldGroup
        v-else-if="
          housingApplication.status === HousingApplicationStatus.accepted
        "
        class="space-y-4"
      >
        <Field>
          <FieldLabel for="lodgment-select">
            {{ $t('admin.housingApplications.workflow.assignedLodgment') }}
          </FieldLabel>
          <Select
            :model-value="selectedLodgmentId ?? ''"
            @update:model-value="onLodgmentChange"
          >
            <SelectTrigger id="lodgment-select">
              <SelectValue
                :placeholder="$t('common.workflow.chooseLodgment')"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="lodgment in lodgments"
                  :key="lodgment.id"
                  :value="lodgment.id"
                >
                  {{
                    $t('admin.housingApplications.workflow.lodgmentOption', {
                      building: lodgment.building.name,
                      room: lodgment.roomNumber,
                      floor: lodgment.floor,
                    })
                  }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <div class="flex gap-2">
          <!-- Refuse -->
          <Dialog v-model:open="refuseDialogOpen">
            <DialogTrigger as-child>
              <Button variant="outline" class="flex-1" :disabled="isSubmitting">
                <Icon name="mdi:close" />
                {{ $t('common.buttons.reject') }}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {{ $t('common.workflow.rejectDialog.title') }}
                </DialogTitle>
                <DialogDescription>
                  {{
                    $t('admin.housingApplications.workflow.rejectDescription')
                  }}
                </DialogDescription>
              </DialogHeader>
              <FieldGroup class="py-2">
                <Field>
                  <FieldLabel for="refusal-reason-select-accepted">
                    {{ $t('admin.workflow.refusalReason') }}
                  </FieldLabel>
                  <Select
                    :model-value="selectedRefusalReason ?? ''"
                    @update:model-value="onRefusalReasonChange"
                  >
                    <SelectTrigger id="refusal-reason-select-accepted">
                      <SelectValue
                        :placeholder="$t('common.workflow.chooseReason')"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          v-for="reason in RefusalReasons"
                          :key="reason"
                          :value="reason"
                        >
                          {{ RefusalReasonLabel[reason] }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>
              <DialogFooter>
                <Button
                  variant="outline"
                  :disabled="isSubmitting"
                  @click="refuseDialogOpen = false"
                >
                  <Icon name="mdi:close" />
                  {{ $t('forms.buttons.cancel') }}
                </Button>
                <Button
                  variant="destructive"
                  :disabled="isSubmitting"
                  @click="handleRefuse"
                >
                  <Icon
                    v-if="isSubmitting"
                    name="mdi:loading"
                    class="animate-spin"
                  />
                  <Icon v-else name="mdi:close" />
                  {{ $t('common.workflow.rejectDialog.confirm') }}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <!-- Validate -->
          <Dialog v-model:open="validateDialogOpen">
            <DialogTrigger as-child>
              <Button
                class="flex-1"
                :disabled="isSubmitting || !selectedLodgmentId"
              >
                <Icon name="mdi:check-all" />
                {{ $t('common.buttons.validate') }}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {{ $t('common.workflow.validateDialog.title') }}
                </DialogTitle>
                <DialogDescription>
                  {{
                    $t('admin.housingApplications.workflow.validateDescription')
                  }}
                  <strong v-if="selectedLodgment" class="mt-1 block">
                    {{
                      $t('admin.housingApplications.workflow.lodgmentOption', {
                        building: selectedLodgment.building.name,
                        room: selectedLodgment.roomNumber,
                        floor: selectedLodgment.floor,
                      })
                    }}
                  </strong>
                  {{
                    $t(
                      'admin.housingApplications.workflow.validateDescriptionFooter'
                    )
                  }}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  :disabled="isSubmitting"
                  @click="validateDialogOpen = false"
                >
                  <Icon name="mdi:close" />
                  {{ $t('forms.buttons.cancel') }}
                </Button>
                <Button :disabled="isSubmitting" @click="handleValidate">
                  <Icon
                    v-if="isSubmitting"
                    name="mdi:loading"
                    class="animate-spin"
                  />
                  <Icon v-else name="mdi:check-all" />
                  {{ $t('common.buttons.confirmValidate') }}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </FieldGroup>
    </CardContent>
  </Card>
</template>
