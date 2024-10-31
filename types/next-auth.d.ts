// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      sub: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
