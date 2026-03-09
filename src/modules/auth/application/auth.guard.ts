import type {
  CanActivate,
  ContextType,
  ExecutionContext,
} from '@nestjs/common';
import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_PROVIDER } from '@src/modules/auth/domain/auth.constants';
import { getRequestFromContext } from '@src/modules/auth/infraestructure/auth.utils';
import type { getSession } from 'better-auth/api';
import { fromNodeHeaders } from 'better-auth/node';
import type { AuthProvider } from '../domain/auth.interface';

export type BaseUserSession = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getSession>>>
>;

export type UserSession = BaseUserSession & {
  user: BaseUserSession['user'] & {
    role?: string | string[];
  };
};

const AuthErrorType = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
} as const;

let WsException: any;
function getWsException() {
  if (!WsException) {
    try {
      WsException = require('@nestjs/websockets').WsException;
    } catch {
      throw new Error(
        '@nestjs/websockets is required for WebSocket support. Please install it.',
      );
    }
  }
  return WsException;
}

const AuthContextErrorMap: Record<
  ContextType,
  Record<keyof typeof AuthErrorType, (args?: unknown) => Error>
> = {
  http: {
    UNAUTHORIZED: (args) =>
      new UnauthorizedException(
        args ?? { code: 'UNAUTHORIZED', message: 'Unauthorized' },
      ),
    FORBIDDEN: (args) =>
      new ForbiddenException(
        args ?? { code: 'FORBIDDEN', message: 'Insufficient permissions' },
      ),
  },
  ws: {
    UNAUTHORIZED: (args) => {
      const WsExceptionClass = getWsException();
      return new WsExceptionClass(args ?? 'UNAUTHORIZED');
    },
    FORBIDDEN: (args) => {
      const WsExceptionClass = getWsException();
      return new WsExceptionClass(args ?? 'FORBIDDEN');
    },
  },
  rpc: {
    UNAUTHORIZED: () => new Error('UNAUTHORIZED'),
    FORBIDDEN: () => new Error('FORBIDDEN'),
  },
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AUTH_PROVIDER)
    private readonly auth: AuthProvider,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = getRequestFromContext(context);

    const session: UserSession | null = await this.auth.api.getSession({
      headers: fromNodeHeaders(
        request?.headers || request?.handshake?.headers || [],
      ),
    });

    request.session = session;
    request.user = session?.user ?? null;

    const isPublic = this.reflector.getAllAndOverride<boolean>('PUBLIC', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const isOptional = this.reflector.getAllAndOverride<boolean>('OPTIONAL', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!session && isOptional) return true;

    const ctxType = context.getType();
    if (!session) throw AuthContextErrorMap[ctxType].UNAUTHORIZED();

    const requiredRoles = this.reflector.getAllAndOverride<string[]>('ROLES', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles?.length) {
      const userRole = session.user.role;
      const roles = Array.isArray(userRole)
        ? userRole
        : typeof userRole === 'string'
          ? userRole.split(',')
          : [];

      const hasRole = roles.some((role) => requiredRoles.includes(role));

      if (!hasRole) throw AuthContextErrorMap[ctxType].FORBIDDEN();
    }

    return true;
  }
}
