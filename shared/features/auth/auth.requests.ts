import type { Request } from '../../utils/request';
import type { LoginBody } from './auth.schema';

export type LoginAuthData = { success: boolean };
export type LoginAuthRequest = Request<LoginAuthData, LoginBody>;

export type LogoutAuthData = { success: boolean };
export type LogoutAuthRequest = Request<LogoutAuthData>;
