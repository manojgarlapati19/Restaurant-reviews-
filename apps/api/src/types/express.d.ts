import type { UserRole } from "@dishcovery/types";

declare global {
  namespace Express {
    interface Request {
      authUser?: {
        id: string;
        firebaseUid: string;
        email?: string;
        username?: string;
        roles: UserRole[];
      };
    }
  }
}

export {};
