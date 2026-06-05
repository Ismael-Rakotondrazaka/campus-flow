export const AUTH_QUERY_KEYS = {
  claims: () => [...AUTH_QUERY_KEYS.root, 'claims'] as const,

  root: ['auth'] as const,
};
