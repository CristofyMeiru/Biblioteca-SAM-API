import { PrismaService } from '@src/shared/services/prisma.service';
import { BetterAuthAdvancedOptions, BetterAuthOptions, DBAdapter } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import 'dotenv/config';
import { v7 as uuidv7 } from 'uuid';

export const betterAuthDatabase: (options: BetterAuthOptions) => DBAdapter<BetterAuthOptions> = prismaAdapter(
  new PrismaService(),
  {
    provider: 'postgresql',
    transaction: true,
    usePlural: false,
  },
);

export const betterAuthDatabaseAdvancedOptions: BetterAuthAdvancedOptions['database'] = {
  generateId: () => uuidv7(),
};
