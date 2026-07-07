"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { TSignInSchema } from "@/lib/types";
import { signInSchema } from "@/lib/zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

// 💡 Tambahkan parameter 'callbackUrl' (opsional) pada signature fungsi
export const login = async (
  data: TSignInSchema,
  callbackUrl?: string | null,
) => {
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
      redirect: false, // Tetap false agar tidak memicu error redirect bawaan Next-Auth di dalam try-catch
    });

    // 💡 Kembalikan alamat redirectTo agar dibaca oleh Client Component
    return {
      success: "Login berhasil!",
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    };
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return { error: "Akun tidak terdaftar!" };
        default:
          return { error: "Terjadi Kesalahan Saat Login" };
      }
    }
    return { error: "Terjadi Kesalahan Saat Login" };
  }
};
