import { v4 as uuidv4 } from "uuid";
import { getPasswordResetTokenByEmail } from "@/data/reset-password";
import { prisma } from "@/lib/prisma";
import { getVerificationTokenByEmail } from "@/data/verification-token";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(Date.now() + 3600 * 1000); // 1 jam dari sekarang

  const existingToken = await getVerificationTokenByEmail(email);

  if (!existingToken) {
    // Belum ada token sebelumnya → buat baru
    const verificationToken = await prisma.verificationToken.create({
      data: { email, token, expires },
    });
    return verificationToken;
  }

  if (existingToken.expires < new Date()) {
    // Token kadaluarsa → hapus dan buat baru
    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    });

    const verificationToken = await prisma.verificationToken.create({
      data: { email, token, expires },
    });
    return verificationToken;
  }

  return existingToken;
};
export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};
