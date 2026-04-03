import { defineQueryOptions } from '@pinia/colada';

import { getAuthClaims } from './auth.service';

export const AUTH_QUERY_KEYS = {
  claims: () => [...AUTH_QUERY_KEYS.root, 'claims'] as const,

  root: ['auth'] as const,
};

export const authClaimsQuery = defineQueryOptions(() => ({
  key: AUTH_QUERY_KEYS.claims(),
  query: () => getAuthClaims(),
}));
