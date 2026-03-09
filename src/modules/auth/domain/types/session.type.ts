type UserRole = 'admin' | 'user';

export type AuthSession = {
  session: {
    id: string;
    userId: string;
    token: string;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
    ipAddress: string;
    userAgent: string;
    activeOrganizationId: string | null;
    activeTeamId: string | null;
    impersonatedBy: string | null;
  };
  user: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: boolean;
    image: string | null;
    role: UserRole;
    banned: boolean;
    banReason: string | null;
    banExpires: string | null;
    createdAt: string;
    updatedAt: string;
  };
};
