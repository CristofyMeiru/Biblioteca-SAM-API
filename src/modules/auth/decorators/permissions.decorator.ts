// disabled features are defined by comments

import { Reflector } from '@nestjs/core';
import { adminAccessControl } from '@src/lib/auth/admin-plugin/admin-permissions';
// import { organizationAccessControl } from '@src/lib/auth/organization-plugin/organization-permissions';

type StatementsMap = Record<string, readonly string[]>;
type ResourcesFrom<S extends StatementsMap> = keyof S;
type ActionsFrom<S extends StatementsMap, R extends keyof S> = S[R][number];

// type OrgStatements = typeof organizationAccessControl.statements;
type AdminStatements = typeof adminAccessControl.statements;

// type OrgResources = ResourcesFrom<OrgStatements>;
type AdminResources = ResourcesFrom<AdminStatements>;

// type OrgPermission<R extends OrgResources> = {
//   scope: 'organization';
//   resource: R;
//   action: ActionsFrom<OrgStatements, R>[];
// };

type AdminPermission<R extends AdminResources> = {
  scope: 'admin';
  resource: R;
  action: ActionsFrom<AdminStatements, R>[];
};

export type PermissionsMetadata =
  // | {
  //     [R in OrgResources]: OrgPermission<R>;
  //   }[OrgResources]
  {
    [R in AdminResources]: AdminPermission<R>;
  }[AdminResources];

export const Permissions = Reflector.createDecorator<PermissionsMetadata>();
