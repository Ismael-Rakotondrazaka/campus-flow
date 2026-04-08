import {
  defineMutation,
  defineQueryOptions,
  useQueryCache,
} from '@pinia/colada';

import type {
  HousingApplicationFilters,
  HousingApplicationInsert,
} from './housing-application.model';

import {
  createHousingApplication,
  deleteHousingApplication,
  getHousingApplication,
  getHousingApplications,
  getHousingApplicationsCount,
} from './housing-application.service';

export const HOUSING_APPLICATION_QUERY_KEYS = {
  byId: (id: string) => [...HOUSING_APPLICATION_QUERY_KEYS.root, id] as const,

  count: (filters: Omit<HousingApplicationFilters, 'limit' | 'page'> = {}) =>
    [...HOUSING_APPLICATION_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: HousingApplicationFilters = {}) =>
    [...HOUSING_APPLICATION_QUERY_KEYS.root, 'list', filters] as const,

  root: ['housing-applications'] as const,
};

export const housingApplicationListQuery = defineQueryOptions(
  (filters: HousingApplicationFilters = {}) => ({
    key: HOUSING_APPLICATION_QUERY_KEYS.list(filters),
    placeholderData: previousData => previousData,
    query: () => getHousingApplications(filters),
  })
);

export const housingApplicationByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => ({
    key: HOUSING_APPLICATION_QUERY_KEYS.byId(id),
    query: () => getHousingApplication(id),
  })
);

export const housingApplicationCountQuery = defineQueryOptions(
  (filters: Omit<HousingApplicationFilters, 'limit' | 'page'> = {}) => ({
    key: HOUSING_APPLICATION_QUERY_KEYS.count(filters),
    query: () => getHousingApplicationsCount(filters),
  })
);

export const useCreateHousingApplication = defineMutation(() => {
  const queryCache = useQueryCache();
  return {
    mutation: (application: HousingApplicationInsert) =>
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
