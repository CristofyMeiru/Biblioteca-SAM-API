import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { auth } from '@src/lib/auth';
import { AuthController } from './application/auth.controller';
import { AuthGuard } from './application/auth.guard';
import { AUTH_PROVIDER } from './domain/auth.constants';

@Module({
  providers: [
    {
      provide: AUTH_PROVIDER,
      useValue: auth,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
