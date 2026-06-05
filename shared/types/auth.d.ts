import type { AdminRole } from 'shared/features/admins/admin.model';

export {};

declare module '#auth-utils' {
  interface User {
    firstName: string;
    id: string;
    imageUrl?: string;
    lastName: string;
    role: 'resident' | AdminRole;
  }
}
