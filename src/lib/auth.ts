import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "admin@desa.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Dummy authentication logic
        if (credentials?.email === "admin@desa.com" && credentials?.password === "admin123") {
          return {
            id: "1",
            name: "Admin Desa",
            email: "admin@desa.com",
            role: "ADMIN"
          };
        }
        
        if (credentials?.email === "superadmin@desa.com" && credentials?.password === "super123") {
          return {
            id: "2",
            name: "Kepala Desa",
            email: "superadmin@desa.com",
            role: "SUPER_ADMIN"
          };
        }

        if (credentials?.email === "kades@desa.com" && credentials?.password === "kades123") {
          return {
            id: "3",
            name: "Kepala Desa",
            email: "kades@desa.com",
            role: "KEPALA_DESA"
          };
        }

        if (credentials?.email === "kadus@desa.com" && credentials?.password === "kadus123") {
          return {
            id: "4",
            name: "Kepala Dusun",
            email: "kadus@desa.com",
            role: "RT_RW"
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
