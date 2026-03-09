import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { auth } from '@src/lib/auth';
import { Permissions, PermissionsMetadata } from '../decorators/permissions.decorator';

@Injectable()
export class HasPermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const permissions = this.reflector.getAllAndOverride<PermissionsMetadata>(
      Permissions,
      [context.getHandler(), context.getClass()],
    );

    const headers = request.headers;

    if (!permissions) {
      return true;
    }

    const { success } = await auth.api.userHasPermission({
      headers: headers,
      body: {
        permissions: {
          [permissions.resource]: permissions.action,
        },
      },
    });

    if (!success) throw new ForbiddenException();
    return success;
  }
}
