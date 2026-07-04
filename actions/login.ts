"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { TSignInSchema } from "@/lib/types";
import { signInSchema } from "@/lib/zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (data: TSignInSchema) => {
  const validatedFields = signInSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Mohon isi form dengan benar!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser?.email || !existingUser?.password) {
    return {
      error:
        "kredensial tidak valid atau kredensial tidak sah. (email atau password salah)",
    };
  }

  if (!existingUser.emailVerified) {
    await generateVerificationToken(existingUser.email);
    return {
      success:
        "Email belum diverifikasi!, Untuk melakukan verifikasi silahkan cek email",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return;
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return { error: "Akun tidak terdaftar!" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw e;
  }
};
