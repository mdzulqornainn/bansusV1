"use server";

import { FormDataUpdatePendaftar } from "@/lib/interfaces";
import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";

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
    // 🌟 GANTI ke findFirst untuk mendapatkan data unik (mengambil yang terbaru)
    const asdosApplication = await prisma.asdosApplication.findFirst({
      where: { npm },
      orderBy: { createdAt: "desc" }
    });

    if (!asdosApplication) return { error: "Data tidak ditemukan" };

    // 🌟 GANTI ke update dengan ID (karena ID adalah kunci unik yang pasti)
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

    // ... (sisa logika status accepted/rejected tetap sama)
    // Pastikan penggunaan asdos.findUnique juga menggunakan npm (jika npm unik di tabel Asdos)
    // Jika tabel Asdos juga compound, gunakan id
    
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