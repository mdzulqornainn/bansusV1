"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { unstable_cache, updateTag } from "next/cache";

export const currentUser = unstable_cache(
  async (id: string) => {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        role: true,
        name: true,
        email: true,
        asdos: true,
        dosen: true,
        asdosApplicant: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },
  [],
  {
    tags: ["global-cache", "current-user"],
    revalidate: false,
  }
);

export const currentUserCached = async () => {
  const data = await auth();
  if (!data?.user?.id) return null;

  return await currentUser(data.user.id);
};

export const refresh = async () => {
  updateTag("global-cache");
};
