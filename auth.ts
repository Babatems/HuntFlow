import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User } from '@/app/lib/definition';
import bcrypt from 'bcryptjs';
import supabase from '@/app/lib/supabase';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Supabase error:', error.message);
      return undefined;
    }

    return data as User;
  } catch (error) {
    console.error('Unexpected error while fetching user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log('Invalid input');
          return null;
        }

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);

        if (!user) {
          console.log('User not found');
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          console.log('Incorrect password');
          return null;
        }

        return user;
      },
    }),
  ],
});
