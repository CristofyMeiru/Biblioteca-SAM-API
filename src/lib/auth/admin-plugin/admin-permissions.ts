import { createAccessControl } from 'better-auth/plugins';
import { defaultStatements } from 'better-auth/plugins/admin/access';

const statements = {
  ...defaultStatements,
  book: ['create', 'delete', 'update', 'associate'],
  author: ['create', 'delete', 'update', 'associate'],
  loan: ['create', 'return', 'revoke', 'update'],
  course: ['create', 'delete', 'update'],
  userSchedule: ['create', 'deactivate', 'update'],
  attendanceRecord: ['create', 'deactivate', 'update'],
} as const;

export const adminAccessControl = createAccessControl(statements);

export const adminRoles = {
  coordinator: adminAccessControl.newRole({
    book: ['create', 'delete', 'update', 'associate'],
    author: ['create', 'delete', 'update', 'associate'],
    loan: ['create', 'return', 'revoke', 'update'],
    course: ['create', 'delete', 'update'],
    userSchedule: ['create', 'deactivate', 'update'],
    attendanceRecord: ['create', 'deactivate', 'update'],
  }),

  librarian: adminAccessControl.newRole({
    book: ['create', 'delete', 'update', 'associate'],
    author: ['create', 'delete', 'update', 'associate'],
    loan: ['create', 'return', 'revoke', 'update'],
    course: ['create', 'delete', 'update'],
    userSchedule: ['create', 'deactivate', 'update'],
    attendanceRecord: ['create', 'deactivate', 'update'],
  }),

  assistant: adminAccessControl.newRole({
    book: ['associate'],
    author: ['associate'],
    loan: ['create', 'return'],
    attendanceRecord: ['create'],
  }),
};
