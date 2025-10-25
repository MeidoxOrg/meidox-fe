import { DefaultUser } from "next-auth";

declare module "next-auth" {
  // CUSTOM MODEL USER IN NEXT-AUTH
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
