"use server";

import { FormDataUpdatePendaftar } from "@/lib/interfaces";
import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";

// ------------------------ CREATE FUNCTION ------------------------

// ------------------------ READ FUNCTION ------------------------
export const getAsdosApplications = async () => {
  try {
    const calonAsdos = await prisma.asdosApplication.findMany({
      include: {
        user: true,
        suratPernyataan: true,
        courseApplicantion: {
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
      orderBy: { createdAt: "desc" },
    });
    return calonAsdos;
  } catch {
    return null;
  }
};

export const getAsdosApplication = async (npm: string) => {
  try {
    const calonAsdos = await prisma.asdosApplication.findUnique({
      include: {
        user: true,
        suratPernyataan: true,
        courseApplicantion: {
          include: {
            course: true,
          },
        },
      },
      where: { npm },
    });
    return calonAsdos;
  } catch {
    return null;
  }
};

// ------------------------ UPDATE FUNCTION ------------------------
export const updateAsdosApplication = async (
  npm: string,
  data: FormDataUpdatePendaftar
) => {
  try {
    const asdosApplication = await prisma.asdosApplication.update({
      data: {
        whatsapp: data.whatsapp,
        domisili: data.domisili,
        status: data.status,
        wawancara: data.wawancara,
        alasanOnline: data.alasanOnline,
      },
      where: { npm },
    });
    if (asdosApplication.status === "accepted") {
      const asdos = prisma.asdos.findUnique({ where: { npm } });
      if (!asdos) {
        await prisma.asdos.create({
          data: {
            npm,
            userId: asdosApplication.userId,
            fileId: asdosApplication.fileId,
            whatsapp: asdosApplication.whatsapp,
            domisili: asdosApplication.domisili,
            alasan: asdosApplication.alasan,
          },
        });
        updateTag("asdos");
      }
      await prisma.user.update({
        where: { id: asdosApplication.userId },
        data: { role: "ASDOS" },
      });
      updateTag("current-user");
      updateTag("user");
    } else if (asdosApplication.status === "rejected") {
      await prisma.user.update({
        where: { id: asdosApplication.userId },
        data: { role: "CALON_ASDOS" },
      });
      updateTag("current-user");
      updateTag("user");
    }
    updateTag("asdos-application");
    updateTag(`asdos-application-${npm}`);
    return { success: "Data berhasil diupdate" };
  } catch {
    return { error: "Data gagal diupdate" };
  }
};

// ------------------------ DELETE FUNCTION ------------------------

export const deleteAsdosApplication = async (npm: string) => {
  try {
    await prisma.asdosApplication.delete({ where: { npm } });
    updateTag("asdos-application");
    updateTag(`asdos-application-${npm}`);
    return { success: "Data berhasil dihapus" };
  } catch {
    return { error: "Data gagal dihapus" };
  }
};
