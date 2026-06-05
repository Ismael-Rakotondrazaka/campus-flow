<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui';

import {
  type RefusalReason,
  RefusalReasonLabel,
  RefusalReasons,
  type Renewal,
  RenewalStatus,
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
import { useUpdateRenewal } from '~/features/shared/renewals/renewal.query';

interface Props {
  renewal: Serialize<Renewal>;
}

const props = defineProps<Props>();

const { t } = useI18n();

const updateMutation = useUpdateRenewal();

const selectedRefusalReason = ref<null | RefusalReason>(
  props.renewal.refusalReason ?? null
);

const acceptDialogOpen = ref(false);
const refuseDialogOpen = ref(false);
const validateDialogOpen = ref(false);
const isSubmitting = ref(false);

watch(
  () => props.renewal,
  r => {
    selectedRefusalReason.value = r.refusalReason ?? null;
  }
);

const isTerminal = computed(
  () =>
    props.renewal.status === RenewalStatus.validated ||
    props.renewal.status === RenewalStatus.refused
);

const onRefusalReasonChange = (value: AcceptableValue) => {
  selectedRefusalReason.value = value as null | RefusalReason;
};

const submit = async (
  status: Serialize<Renewal>['status'],
  extra: { refusalReason?: null | RefusalReason } = {}
) => {
  isSubmitting.value = true;
  try {
    await updateMutation.mutation({
      id: props.renewal.id,
      updates: { status, ...extra },
    });
    toast.success(t('common.toasts.renewal.updated'));
    acceptDialogOpen.value = false;
    refuseDialogOpen.value = false;
    validateDialogOpen.value = false;
  } catch (error) {
    handleFetchError(error, t);
  } finally {
    isSubmitting.value = false;
  }
};

const handleAccept = () => submit(RenewalStatus.accepted);

const handleValidate = () => submit(RenewalStatus.validated);

const handleRefuse = () =>
  submit(RenewalStatus.refused, {
    refusalReason: selectedRefusalReason.value,
  });

const terminalStatusLabel = computed(() =>
  t(
    props.renewal.status === RenewalStatus.validated
      ? 'admin.workflow.terminalValidated'
      : 'admin.workflow.terminalRefused'
  )
);
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ $t('admin.renewals.manageTitle') }}</CardTitle>
      <CardDescription>
        {{ $t('admin.renewals.manageDescription') }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <!-- Terminal state -->
      <p v-if="isTerminal" class="text-muted-foreground text-sm">
        {{
          $t('admin.workflow.renewalTerminalPrefix', {
            status: terminalStatusLabel,
          })
        }}
      </p>

      <!-- pending → accept or refuse -->
      <div
        v-else-if="renewal.status === RenewalStatus.pending"
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
                {{ $t('admin.renewals.workflow.acceptTitle') }}
              </DialogTitle>
              <DialogDescription>
                {{ $t('admin.renewals.workflow.acceptDescription') }}
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
                {{ $t('admin.renewals.workflow.rejectTitle') }}
              </DialogTitle>
              <DialogDescription>
                {{ $t('admin.renewals.workflow.rejectDescription') }}
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

      <!-- accepted → validate or refuse -->
      <div
        v-else-if="renewal.status === RenewalStatus.accepted"
        class="flex gap-2"
      >
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
                {{ $t('admin.renewals.workflow.rejectTitle') }}
              </DialogTitle>
              <DialogDescription>
                {{ $t('admin.renewals.workflow.rejectDescription') }}
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
            <Button class="flex-1" :disabled="isSubmitting">
              <Icon name="mdi:check-all" />
              {{ $t('common.buttons.validate') }}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {{ $t('admin.renewals.workflow.validateTitle') }}
              </DialogTitle>
              <DialogDescription>
                {{ $t('admin.renewals.workflow.validateDescription') }}
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
    </CardContent>
  </Card>
</template>
