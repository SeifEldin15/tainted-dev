//@ts-nocheck

import { NEXTAUTH_ERROR_RESPONSES } from "@/constants/Messages";
import prisma from "@/prisma";
import { connectToDatabase } from "@/prisma/serverConnector";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

interface Credentials {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      authorize: async (credentials: Credentials, req: any) => {
        // If There Were No Credentials Provided Return Null
        if (!credentials || !credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Connecting to database
          await connectToDatabase();

          // Getting the user from the database
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          // console.log("NEXTAUTH USER : ", user);

          // If user not found then return null
          if (!user) {
            throw new Error(NEXTAUTH_ERROR_RESPONSES?.userNotFound.message);
          }

          const isPasswordValid = await bcrypt.compare(
            credentials?.password,
            user?.hashedPassword
          );

          // console.log("IS PASSWORD VALID : ", isPasswordValid);

          // if password is not valid then throw error
          if (!isPasswordValid) {
            throw new Error(
              NEXTAUTH_ERROR_RESPONSES?.invalidCredentials.message
            );
          }

          // if password is valid then return the user
          if (isPasswordValid) {
            return user;
          }

          // If no errors then return null
          return null;
        } catch (error) {
          // console loggin the error
          console.log("NEXTAUTH ERROR : ", error);
          return null;
        } finally {
          // Disconnecting from database
          await prisma.$disconnect();
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_JWT_SECRET,
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    jwt: true,
  },
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/login",
  },
  callbacks: {
    async session({ session, token, user }) {
      // console.log("SESSION SESSION", session);
      // console.log("SESSION TOKEN", token);
      // console.log("SESSION USER", user);

      if (!user) {
        user = token.user;
      }

      return {
        ...session,
        user: user,
      };
    },
    async jwt({ token, user, account }) {
      // console.log("JWT TOKEN", token);
      // console.log("JWT USER", user);
      // console.log("JWT ACCOUNT", account);

      if (user) {
        token.user = {
          id: user?.id,
          email: user?.email,
          username: user?.username,
          role: user?.role,
          image: user?.image,
        };
      }

      return token;
    },
  },
};
