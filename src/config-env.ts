import { plainToInstance, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsString,
  validateSync,
} from 'class-validator';

export interface EnvironmentVariables {
  NODE_ENV: 'development' | 'production' | 'staging';
  PORT?: number;
  DATABASE_URL: string;
  CLIENT_ORIGINS: string[];
  BETTER_AUTH_SECRET: string;
  BASE_URL: string;
}

export class EnvSchema implements EnvironmentVariables {
  @IsInt()
  @Type(() => Number)
  PORT: number;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  BETTER_AUTH_SECRET: string;

  @Transform(({ value }) => JSON.parse(value))
  @IsArray()
  @IsString({ each: true })
  CLIENT_ORIGINS: string[];

  @IsEnum(['development', 'production', 'staging'])
  NODE_ENV: 'development' | 'production' | 'staging';

  @IsString()
  BASE_URL: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvSchema, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
