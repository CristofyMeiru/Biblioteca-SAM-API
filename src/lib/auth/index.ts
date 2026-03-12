import { betterAuth } from 'better-auth';
import { openAPI } from 'better-auth/plugins';
import 'dotenv/config';
import { adminPlugin } from './admin-plugin/admin-plugin';
import { betterAuthDatabase, betterAuthDatabaseAdvancedOptions } from './database';

export const auth = betterAuth({
  database: betterAuthDatabase,
  advanced: {
    database: betterAuthDatabaseAdvancedOptions,
  },
  baseURL: process.env.BASE_URL,
  plugins: [adminPlugin, openAPI({ path: '/docs' })],
  trustedOrigins: process.env.CLIENT_ORIGINS,
});
