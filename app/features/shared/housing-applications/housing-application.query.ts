import type {
  CreateHousingApplication,
  HousingApplicationQuery,
  UpdateHousingApplication,
} from '#shared/features/housing-applications';

import {
  defineMutation,
  defineQueryOptions,
  useQueryCache,
} from '@pinia/colada';

import {
  createHousingApplication,
  deleteHousingApplication,
  getHousingApplication,
  getHousingApplications,
  getHousingApplicationsCount,
  updateHousingApplication,
} from './housing-application.service';

export const HOUSING_APPLICATION_QUERY_KEYS = {
  byId: (id: string) => [...HOUSING_APPLICATION_QUERY_KEYS.root, id] as const,

  count: (
    filters: Omit<HousingApplicationQuery, 'limit' | 'page' | 'sortOrder'> = {}
  ) => [...HOUSING_APPLICATION_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: HousingApplicationQuery = {}) =>
    [...HOUSING_APPLICATION_QUERY_KEYS.root, 'list', filters] as const,

  root: ['housing-applications'] as const,
};

export const housingApplicationListQuery = defineQueryOptions(
  (filters: HousingApplicationQuery = {}) => {
    const fetchFn = useRequestFetch();
    return {
      key: HOUSING_APPLICATION_QUERY_KEYS.list(filters),
      placeholderData: previousData => previousData,
      query: () => getHousingApplications(filters, fetchFn),
    };
  }
);

export const housingApplicationByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => {
    const fetchFn = useRequestFetch();
    return {
      key: HOUSING_APPLICATION_QUERY_KEYS.byId(id),
      query: () => getHousingApplication(id, fetchFn),
    };
  }
);

export const housingApplicationCountQuery = defineQueryOptions(
  (
    filters: Omit<HousingApplicationQuery, 'limit' | 'page' | 'sortOrder'> = {}
  ) => {
    const fetchFn = useRequestFetch();
    return {
      key: HOUSING_APPLICATION_QUERY_KEYS.count(filters),
      query: () => getHousingApplicationsCount(filters, fetchFn),
    };
  }
);

export const useCreateHousingApplication = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: (application: CreateHousingApplication) =>
      createHousingApplication(application),
    onSuccess: () => {
      queryCache.invalidateQueries({
        key: HOUSING_APPLICATION_QUERY_KEYS.root,
      });
    },
  };
});

export const useDeleteHousingApplication = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: (id: string) => deleteHousingApplication(id),
    onSuccess: () => {
      queryCache.invalidateQueries({
        key: HOUSING_APPLICATION_QUERY_KEYS.root,
      });
    },
  };
});

export const useUpdateHousingApplication = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: ({
      id,
      updates,
    }: {
      id: string;
      updates: UpdateHousingApplication;
    }) => updateHousingApplication(id, updates),
    onSuccess: () => {
      queryCache.invalidateQueries({
        key: HOUSING_APPLICATION_QUERY_KEYS.root,
      });
    },
  };
});
