import { DefaultSession, ISODateString } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string | null
    error?: string
    user?: {
      name?: string | null
      email?: string | null
      image?: string | null
      username?: string | null
      id?: string | null
    }
    expires: ISODateString
  }

  interface DefaultUser {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    username?: string | null;
  }

  interface Profile {
    sub?: string;
    name?: string;
    email?: string;
    image?: string;
    username?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Record<string, unknown>, DefaultJWT {
    accessToken?: string | null;
    username?: string | null;
    name?: string | null;
    sub?: string | null;
    error?: any;
  }
}
