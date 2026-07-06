// File: src/data/oprec.ts
import { prisma } from "@/lib/prisma";

export interface OprecDetailsPayload {
  recStart: Date;
  recEnd: Date;
  recExStart: Date | null;
  recExEnd: Date | null;
  seleksiAdmin: Date;
  wawancaraStart: Date;
  wawancaraEnd: Date;
  pengumuman: Date;
  orientasiStart: Date;
  orientasiEnd: Date;
  status: boolean;
  angkatanOnline: string;
  tahunAjaran: string;
}

/**
 * READ: Mengambil konfigurasi oprec pertama dari database
 * Langsung dipanggil oleh halaman publik OprecPage (Server Component)
 */
export async function getOprecDetails() {
  try {
    return await prisma.oprecDetails.findFirst();
  } catch (error) {
    console.error("Database error [getOprecDetails]:", error);
    return null;
  }
}

/**
 * UPSERT: Memperbarui data lama jika ada, atau membuat record baru jika kosong
 */
export async function upsertOprecDetails(rawId: string | null, data: OprecDetailsPayload) {
  const dataToSave = {
    ...data,
    updatedAt: new Date(),
  };

  // 1. Jika ID dikirim dari form admin dan valid
  if (rawId && rawId !== "") {
    return await prisma.oprecDetails.update({
      where: { id: rawId },
      data: dataToSave,
    });
  }

  // 2. Fallback jika ID form kosong: periksa record pertama di DB
  const existing = await prisma.oprecDetails.findFirst();
  if (existing) {
    return await prisma.oprecDetails.update({
      where: { id: existing.id },
      data: dataToSave,
    });
  }

  // 3. Jika tabel benar-benar kosong (Inisialisasi awal)
  return await prisma.oprecDetails.create({
    data: {
      id: "oprec-settings", // ID statis pengunci duplikasi data
      ...dataToSave,
    },
  });
}

/**
 * DELETE: Membersihkan / mereset pengaturan jadwal
 */
export async function deleteOprecDetailsData() {
  return await prisma.oprecDetails.deleteMany();
}