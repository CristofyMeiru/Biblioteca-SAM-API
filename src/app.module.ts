import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config-env';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ validate: validateEnv }), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
