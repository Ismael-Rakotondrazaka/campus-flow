import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { LoginAuthRequest } from '#shared/features/auth';

import { getAuthUserByEmail } from './auth.service';

export const loginAuthEventHandlerFn: EventHandlerFn<
  LoginAuthRequest
> = async ({ body, userSession }) => {
  const user = await getAuthUserByEmail(body.email);

  const identity = user?.identities[0];

  const credentialsErrorKey = 'auth.signIn.form.errors.credentials.notMatch';

  if (!user || !identity?.password) {
    throw Exception.unauthorized({
      data: {},
      message: credentialsErrorKey,
    });
  }

  const valid = await verifyPassword(identity.password, body.password);

  if (!valid) {
    throw Exception.unauthorized({
      data: {},
      message: credentialsErrorKey,
    });
  }

  const [admin, resident] = await Promise.all([
    getAdmin(user.id),
    getResident(user.id),
  ]);

  const role = admin?.role ? admin.role : resident ? 'resident' : undefined;

  await userSession.replace({
    user: {
      email: user.email,
      id: user.id,
      role: role,
    },
  });

  return { success: true };
};
