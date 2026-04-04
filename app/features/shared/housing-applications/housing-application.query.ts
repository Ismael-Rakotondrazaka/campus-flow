import { defineQueryOptions } from '@pinia/colada';

import type { HousingApplicationFilters } from './housing-application.model';

import {
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

  root: ['housing_applications'] as const,
};

export const housingApplicationListQuery = defineQueryOptions(
  (filters: HousingApplicationFilters = {}) => ({
    key: HOUSING_APPLICATION_QUERY_KEYS.list(filters),
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
