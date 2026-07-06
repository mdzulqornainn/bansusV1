// File: src/lib/oprec.ts
import { prisma } from "@/lib/prisma";

// Tipe data type-safe untuk input data ke database
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
 * READ: Mengambil baris pertama data Oprec
 */
export async function getOprecDetailsFromDb() {
  return await prisma.oprecDetails.findFirst();
}

/**
 * UPSERT: Mengupdate jika ada ID/Data lama, atau membuat baru jika kosong
 */
export async function upsertOprecDetailsInDb(rawId: string | null, data: OprecDetailsPayload) {
  const dataToSave = {
    ...data,
    updatedAt: new Date(),
  };

  // Jika ID dikirim dari form dan valid
  if (rawId && rawId !== "") {
    return await prisma.oprecDetails.update({
      where: { id: rawId },
      data: dataToSave,
    });
  }

  // Fallback: Cari data pertama jika ID dari form kosong
  const existing = await prisma.oprecDetails.findFirst();
  if (existing) {
    return await prisma.oprecDetails.update({
      where: { id: existing.id },
      data: dataToSave,
    });
  }

  // Jika benar-benar kosong (pertama kali setup aplikasi)
  return await prisma.oprecDetails.create({
    data: {
      id: "oprec-settings", // ID statis pengunci dobel data
      ...dataToSave,
    },
  });
}

/**
 * DELETE: Menghapus data pengaturan
 */
export async function deleteOprecDetailsFromDb() {
  return await prisma.oprecDetails.deleteMany();
}