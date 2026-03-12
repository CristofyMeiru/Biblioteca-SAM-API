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
  basePath: '/auth',
  plugins: [adminPlugin, openAPI({ path: '/docs' })],
  trustedOrigins: JSON.parse(String(process.env.CLIENT_ORIGINS)),
});

console.log(JSON.parse(String(process.env.CLIENT_ORIGINS)));
