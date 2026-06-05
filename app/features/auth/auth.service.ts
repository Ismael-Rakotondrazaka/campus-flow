import type { LoginBody } from '#shared/features/auth';

export const loginWithCredentials = async (body: LoginBody) => {
  return $fetch('/api/auth/login', { body, method: 'POST' });
};

export const logout = async () => {
  return $fetch('/api/auth/logout', { method: 'POST' });
};
