"use server";

import { FormDataAddAsdos, FormDataUpdatePendaftar } from "@/lib/interfaces";
import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";

// ------------------------ CREATE FUNCTION ------------------------

export const addAsdosClass = async (
  npm: string,
  classId: string,
  userId: string
) => {
  try {
    await prisma.classAsdos.create({ data: { asdosNpm: npm, classId } });
    updateTag("class");
    updateTag("asdos");
    updateTag(`asdos-${npm}`);
    updateTag(`asdos-${userId}`);
    return { success: "Data berhasil disimpan" };
  } catch {
    return { error: "Data gagal disimpan, coba dengan data yang berbeda" };
  }
};

export const addAsdos = async (data: FormDataAddAsdos) => {
  try {
    await prisma.asdos.create({
      data: {
        npm: data.npm,
        userId: data.userId,
        fileId: data.fileId,
        whatsapp: data.whatsapp,
        domisili: data.domisili,
        alasan: data.alasan,
      },
    });
    await prisma.user.update({
      where: { id: data.userId },
      data: { role: "ASDOS" },
    });
    await prisma.asdosApplication.delete({ where: { npm: data.npm } });
    updateTag("user");
    updateTag(`user-${data.userId}`);
    updateTag("asdos");
    updateTag(`asdos-${data.npm}`);
    updateTag("asdos-application");
    updateTag(`asdos-application-${data.npm}`);
    return { success: "Data berhasil disimpan" };
  } catch (e) {
    return { error: "Data gagal disimpan, coba dengan data yang berbeda" + e };
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
                buktiKehadiran: true, // Include file data for attendance proof
              },
              orderBy: {
                pertemuanKe: "asc", // Order by meeting number
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
                buktiKehadiran: true, // Include file data for attendance proof
              },
              orderBy: {
                pertemuanKe: "asc", // Order by meeting number
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
  data: FormDataUpdatePendaftar
) => {};

// ------------------------ DELETE FUNCTION ------------------------

export const deleteAsdos = async (npm: string) => {
  try {
    await prisma.asdos.delete({ where: { npm } });
    updateTag("asdos");
    updateTag(`asdos-${npm}`);
    return { success: "Data berhasil dihapus" };
  } catch {
    return { error: "Data gagal dihapus" };
  }
};

export const deleteClassAsdos = async (id: string, npm: string) => {
  try {
    await prisma.classAsdos.delete({ where: { id } });
    updateTag("asdos");
    updateTag(`asdos-${npm}`);
    updateTag(`class-asdos-${id}`);
    return { success: "Data berhasil dihapus" };
  } catch {
    return { error: "Data gagal dihapus" };
  }
};
