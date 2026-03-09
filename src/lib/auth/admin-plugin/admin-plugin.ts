import { admin } from 'better-auth/plugins';
import { adminAccessControl } from './admin-permissions';

export const adminPlugin = admin({ ac: adminAccessControl, roles: {} });
