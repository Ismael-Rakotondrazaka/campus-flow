<script lang="ts" setup>
import { formatDate } from '@vueuse/core';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

import { academicSessionListQuery } from '../academic-session.query';

const { locale, t } = useI18n();

const academicSession = useRouteQuery<string | undefined, string | undefined>(
  'g_academic_session_id',
  undefined
);

const { data } = useQuery(() => academicSessionListQuery({ limit: 5 }));

const academicSessions = computed(() => data.value?.data ?? []);

watchEffect(() => {
  if (
    academicSession.value === undefined &&
    academicSessions.value.length > 0 &&
    academicSessions.value[0]?.id !== undefined
  ) {
    academicSession.value = academicSessions.value[0].id;
  }
});
</script>

<template>
  <div class="bg-primary flex items-center gap-2 rounded-xl p-2">
    <Icon
      name="mdi:calendar-clock"
      size="2rem"
      class="text-primary-foreground"
    />

    <Select v-model="academicSession">
      <SelectTrigger class="text-primary-foreground w-full max-w-xs">
        <SelectValue :placeholder="t('common.selects.academicSessions')" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem
            v-for="session in academicSessions"
            :key="session.id"
            :value="session.id"
          >
            {{
              formatDate(new Date(session.startAt), 'DD MMMM YYYY', {
                locales: locale,
              })
            }}
            &nbsp;-&nbsp;
            {{
              formatDate(new Date(session.endAt), 'DD MMMM YYYY', {
                locales: locale,
              })
            }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
