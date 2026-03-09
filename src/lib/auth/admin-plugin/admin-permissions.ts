import { createAccessControl } from 'better-auth/plugins';
import { defaultStatements } from 'better-auth/plugins/admin/access';

const statements = {
  ...defaultStatements,
}

export const adminAccessControl = createAccessControl(statements);

