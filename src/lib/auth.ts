import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import { userAuthSchema } from '@/lib/validations/auth'
import { db } from "@/lib/db"
import { User } from "./definitions";
import { PrismaAdapter } from "@next-auth/prisma-adapter"


async function getUser(email: string): Promise<User | null> {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    })
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: 'login',
      credentials: {
        email: {},
        password: {}
      },
      //@ts-ignore
      async authorize(credentials) {
        if (!credentials) {
          return null
        }
        const parsedCredentials = userAuthSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = password === user.password;

          if(!passwordsMatch){
            return null
          }
          
          return user;
        }

        console.log('Invalid credentials');

        return null;
      },
    }),
  ],
  callbacks: {

    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.email = token.email
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email as string,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
      }
    },
  },
}

export default NextAuth(authOptions)
