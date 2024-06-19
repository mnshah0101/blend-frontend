import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Credentials {
    email: string;
    password: string;
  }

  interface User {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    id: string;
  }

  interface Session {
    user: {
      username: string;
      first_name: string;
      last_name: string;
      email: string;
        id: string;
    }
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    id: string;
  }
}
