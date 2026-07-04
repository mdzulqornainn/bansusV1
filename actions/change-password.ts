"use server";
import { getPasswordResetTokenByToken } from "@/data/reset-password";
import { getUserByEmail } from "@/data/user";
import { prisma } from "@/lib/prisma";
import { TResetPasswordSchema } from "@/lib/types";
import { resetPasswordSchema } from "@/lib/zod";
import bcryptjs from "bcryptjs";

export const changePassword = async (
  data: TResetPasswordSchema,
  token: string | null
) => {
  const validateField = resetPasswordSchema.safeParse(data);

  if (!validateField.success) {
    return { error: "Invalid Email!" };
  }

  const { password } = validateField.data;

  if (!token) {
    return { error: "Invalid Token!" };
  }

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Something Went Worng!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const user = await getUserByEmail(existingToken.email);

  if (!user) {
    return { error: "Something Went Worng!" };
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: await bcryptjs.hash(password, 10),
    },
  });

  await prisma.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password Changed!" };
};
