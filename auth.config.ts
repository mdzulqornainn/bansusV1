import bcryptjs from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "@/data/user";
import { signInSchema } from "@/lib/zod";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateField = signInSchema.safeParse(credentials);
        if (validateField.success) {
          const { email, password } = validateField.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await bcryptjs.compare(password, user.password);

          if (passwordMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
