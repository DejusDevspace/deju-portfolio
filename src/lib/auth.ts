import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
          console.error("Missing ADMIN_EMAIL or ADMIN_PASSWORD environment variables");
          return null;
        }

        if (
          credentials?.email === adminEmail &&
          credentials?.password === adminPassword
        ) {
          return { id: "1", email: adminEmail };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // FastAPI expects an HS256 signed JWT with the "email" claim.
      // NextAuth uses JWE (encrypted) by default for its session cookies.
      // To bridge this cleanly, we generate a standard HS256 token here
      // and expose it as `accessToken` to the client for API requests.

      const secret = process.env.NEXTAUTH_SECRET;
      if (!secret) {
        console.error("Missing NEXTAUTH_SECRET environment variable");
        return session;
      }

      // Generate a token strictly for the FastAPI backend
      const apiToken = jwt.sign(
        { email: token.email },
        secret,
        { algorithm: "HS256", expiresIn: "1d" } // Token valid for 1 day
      );

      return {
        ...session,
        accessToken: apiToken,
      };
    },
  },
  pages: {
    signIn: "/admin/login",
  },
};
