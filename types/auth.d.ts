import type { User } from './user';

export type AuthState = {
  auth: boolean;
  user?: User;
  token?: string;
};
