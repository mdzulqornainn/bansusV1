"use server";

import { FormDataUpdatePendaftar } from "@/lib/interfaces";
import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";
import { createFolderForAsdos } from "@/lib/drives";

// ------------------------ READ FUNCTION ------------------------
export const getAsdosApplications = async () => {
  try {
    return await prisma.asdosApplication.findMany({
      include: {
        user: true,
        suratPernyataan: true,
        courseApplicantion: {
          include: {
            course: { include: { semester: { include: { prodi: true } } } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return null;
  }
};

export const getAsdosApplication = async (npm: string) => {
  try {
    // 🌟 GANTI ke findFirst karena npm bukan lagi unique tunggal
    return await prisma.asdosApplication.findFirst({
      include: {
        user: true,
        suratPernyataan: true,
        courseApplicantion: {
          include: { course: true },
        },
      },
      where: { npm },
    });
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
    const asdosApplication = await prisma.asdosApplication.findFirst({
      where: { npm },
      orderBy: { createdAt: "desc" }
    });

    if (!asdosApplication) return { error: "Data tidak ditemukan" };

    // 1. Update status di tabel AsdosApplication
    await prisma.asdosApplication.update({
      data: {
        whatsapp: data.whatsapp,
        domisili: data.domisili,
        status: data.status,
        wawancara: data.wawancara,
        alasanOnline: data.alasanOnline,
      },
      where: { id: asdosApplication.id }, 
    });

    // 2. Logic jika diterima (Accepted)
    if (data.status === "accepted") {
      const asdos = await prisma.asdos.findUnique({ where: { npm } });
      
      // Buat record Asdos jika belum ada
      if (!asdos) {
        const newAsdos = await prisma.asdos.create({
          data: {
            npm,
            userId: asdosApplication.userId,
            fileId: asdosApplication.fileId,
            whatsapp: asdosApplication.whatsapp,
            domisili: asdosApplication.domisili,
            alasan: asdosApplication.alasan,
          },
        });

        // 🌟 OTOMATISASI: Buat folder Google Drive
        try {
          const user = await prisma.user.findUnique({ where: { id: asdosApplication.userId } });
          const folderName = user?.name ? `${user.name} - ${npm}` : `Asdos - ${npm}`;
          
          const folderRes = await createFolderForAsdos(folderName);

          if (folderRes.data?.id) {
            await prisma.asdos.update({
              where: { npm },
              data: { driveFolderId: folderRes.data.id },
            });
          }
        } catch (driveError) {
          console.error("Gagal membuat folder Google Drive:", driveError);
          // Kita tidak melempar error agar proses update status tetap sukses
        }
        updateTag("asdos");
      }

      // Update role user
      await prisma.user.update({
        where: { id: asdosApplication.userId },
        data: { role: "ASDOS" },
      });
      updateTag("current-user");
      updateTag("user");

    } else if (data.status === "rejected") {
      // Update role user kembali ke CALON_ASDOS jika ditolak
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
  } catch (e) {
    return { error: "Data gagal diupdate" };
  }
};
// ------------------------ DELETE FUNCTION ------------------------
export const deleteAsdosApplication = async (npm: string) => {
  try {
    // 🌟 GANTI ke deleteMany untuk menghapus data berdasarkan npm
    await prisma.asdosApplication.deleteMany({ where: { npm } });
    updateTag("asdos-application");
    updateTag(`asdos-application-${npm}`);
    return { success: "Data berhasil dihapus" };
  } catch {
    return { error: "Data gagal dihapus" };
  }
};