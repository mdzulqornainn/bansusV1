"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ------------------------ CREATE FUNCTION ------------------------

// ------------------------ READ FUNCTION ------------------------

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};

export const getUsers = async () => {
  try {
    const user = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
    return user;
  } catch {
    return null;
  }
};

// ------------------------ UPDATE FUNCTION ------------------------

export const updateAsdosApplicationToGuest = async (
  userId: string,
  npm: string
) => {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: "GUEST" },
    });

    if (user.role === "GUEST")
      await prisma.asdosApplication.delete({ where: { npm } });
    revalidatePath("/admin/users");
    return { success: "Data berhasil dihapus" };
  } catch {
    return { error: "Data gagal dihapus" };
  }
};

// ------------------------ DELETE FUNCTION ------------------------

export const deleteUser = async (id: string) => {
  try {
    await prisma.user.delete({ where: { id } });
    revalidatePath("/admin/users");
    return { success: "Data berhasil dihapus" };
  } catch {
    return { error: "Data gagal dihapus" };
  }
};
