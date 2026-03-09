import type { EnvironmentVariables } from '@src/config-env';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {}
  }
}

export {};
