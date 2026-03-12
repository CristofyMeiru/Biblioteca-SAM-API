import { admin } from 'better-auth/plugins';
import { adminAccessControl, adminRoles } from './admin-permissions';

export const adminPlugin = admin({
  ac: adminAccessControl,
  roles: adminRoles,
  adminRoles: ['coordinator'],
  defaultRole: 'assistant',
});
