"use server";

import { FormDataAddDosen, FormDataUpdatePendaftar } from "@/lib/interfaces";
import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";

// ------------------------ CREATE FUNCTION ------------------------

export const addDosenClass = async (npm: string, classId: string) => {
  try {
    await prisma.classDosen.create({ data: { dosenNip: npm, classId } });
    updateTag("class");
    updateTag("dosen");
    updateTag(`dosen-${npm}`);
    return { success: "Data berhasil disimpan" };
  } catch {
    return { error: "Data gagal disimpan, coba dengan data yang berbeda" };
  }
};

export const addDosen = async (data: FormDataAddDosen) => {
  try {
    await prisma.dosen.create({
      data: {
        nip: data.nip,
        userId: data.userId,
        namaDosen: data.namaDosen || "",
      },
    });
    await prisma.user.update({
      where: { id: data.userId },
      data: { role: "DOSEN" },
    });
    updateTag("user");
    updateTag(`user-${data.userId}`);
    updateTag("dosen");
    updateTag(`dosen-${data.nip}`);
    return { success: "Data berhasil disimpan" };
  } catch (e) {
    return { error: "Data gagal disimpan, coba dengan data yang berbeda" + e };
  }
};

// ------------------------ READ FUNCTION ------------------------

export const getDosens = async () => {
  try {
    const dosens = await prisma.dosen.findMany({
      include: {
        user: true,
        classDosen: {
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
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return dosens;
  } catch (error) {
    console.error("Error fetching dosens:", error);
    return null;
  }
};

export const getDosen = async (nip: string) => {
  try {
    const Dosen = await prisma.dosen.findUnique({
      where: { nip },
      include: {
        user: true,
        classDosen: {
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
          },
        },
      },
    });
    return Dosen;
  } catch {
    return null;
  }
};

export const getDosenByUserId = async (userId: string) => {
  try {
    const Dosen = await prisma.dosen.findUnique({
      where: { userId },
      include: {
        user: true,
        classDosen: {
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
          },
        },
      },
    });
    return Dosen;
  } catch {
    return null;
  }
};

// ------------------------ UPDATE FUNCTION ------------------------
export const updateDosen = async (
  npm: string,
  data: FormDataUpdatePendaftar
) => {};

// ------------------------ DELETE FUNCTION ------------------------

export const deleteDosen = async (nip: string) => {
  try {
    await prisma.dosen.delete({ where: { nip } });
    updateTag("dosen");
    updateTag(`dosen-${nip}`);
    return { success: "Data berhasil dihapus" };
  } catch {
    return { error: "Data gagal dihapus" };
  }
};
