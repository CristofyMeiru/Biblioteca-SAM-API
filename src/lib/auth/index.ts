import { PrismaService } from '@src/shared/services/prisma.service';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { openAPI } from 'better-auth/plugins';
import 'dotenv/config';
import { adminPlugin } from './admin-plugin/admin-plugin';

export const auth = betterAuth({
  database: prismaAdapter(new PrismaService(), {
    provider: 'postgresql',
    transaction: true,
  }),
  baseURL: process.env.BASE_URL,
  plugins: [adminPlugin, openAPI({ path: '/docs' })],
  trustedOrigins: process.env.CLIENT_ORIGINS,
});
