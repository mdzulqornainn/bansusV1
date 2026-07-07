"use server";

import { FormDataUpdatePendaftar } from "@/lib/interfaces";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

// ------------------------ CREATE FUNCTION ------------------------

export const addAsdosClass = async (
  npm: string,
  classId: string,
  userId: string,
) => {
  try {
    await prisma.classAsdos.create({ data: { asdosNpm: npm, classId } });
    (revalidateTag as any)("class");
    (revalidateTag as any)("asdos");
    (revalidateTag as any)(`asdos-${npm}`);
    (revalidateTag as any)(`asdos-${userId}`);
    return { success: "Data berhasil disimpan" };
  } catch {
    return { error: "Data gagal disimpan, coba dengan data yang berbeda" };
  }
};

// ------------------------ READ FUNCTION ------------------------

export const getAsdoss = async () => {
  try {
    const asdoss = await prisma.asdos.findMany({
      include: {
        user: true,
        classAsdos: {
          include: {
            class: {
              include: {
                course: {
                  include: {
                    semester: {
                      include: {
                        prodi: true,
                      },
                    },
                  },
                },
              },
            },
            absensi: {
              orderBy: {
                pertemuanKe: "asc",
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return asdoss;
  } catch (error) {
    console.error("Error fetching asdoss:", error);
    return null;
  }
};

export const getAsdos = async (npm: string) => {
  try {
    const asdos = await prisma.asdos.findUnique({
      where: { npm },
      include: {
        user: true,
        suratPernyataan: true,
        classAsdos: {
          include: {
            class: {
              include: {
                jadwalPraktikum: true,
                course: {
                  include: {
                    semester: {
                      include: {
                        prodi: true,
                      },
                    },
                  },
                },
              },
            },
            absensi: {
              include: {
                buktiKehadiran: true,
              },
              orderBy: {
                pertemuanKe: "asc",
              },
            },
          },
        },
      },
    });
    return asdos;
  } catch {
    return null;
  }
};

export const getAsdosByUserId = async (userId: string) => {
  try {
    const asdos = await prisma.asdos.findUnique({
      where: { userId },
      include: {
        user: true,
        suratPernyataan: true,
        classAsdos: {
          include: {
            class: {
              include: {
                jadwalPraktikum: true,
                course: {
                  include: {
                    semester: {
                      include: {
                        prodi: true,
                      },
                    },
                  },
                },
              },
            },
            absensi: {
              include: {
                buktiKehadiran: true,
              },
              orderBy: {
                pertemuanKe: "asc",
              },
            },
          },
        },
      },
    });
    return asdos;
  } catch {
    return null;
  }
};

// ------------------------ UPDATE FUNCTION ------------------------
export const updateAsdos = async (
  npm: string,
  data: FormDataUpdatePendaftar,
) => {};

// ------------------------ DELETE FUNCTION ------------------------

export const deleteAsdos = async (npm: string) => {
  try {
    await prisma.asdos.delete({ where: { npm } });
    (revalidateTag as any)("asdos");
    (revalidateTag as any)(`asdos-${npm}`);
    return { success: "Data berhasil dihapus" };
  } catch {
    return { error: "Data gagal dihapus" };
  }
};

export const deleteClassAsdos = async (id: string, npm: string) => {
  try {
    await prisma.classAsdos.delete({ where: { id } });
    (revalidateTag as any)("asdos");
    (revalidateTag as any)(`asdos-${npm}`);
    (revalidateTag as any)(`class-asdos-${id}`);
    return { success: "Data berhasil dihapus" };
  } catch {
    return { error: "Data gagal dihapus" };
  }
};
