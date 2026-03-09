import type { getSession } from 'better-auth/api';

export interface AuthProvider {
  api: {
    getSession: ReturnType<typeof getSession>;
  };
}
