"use server";

import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";

// ------------------------ CREATE FUNCTION ------------------------

// ------------------------ READ FUNCTION ------------------------

export const getJadwalWawancaras = async () => {
  try {
    const jadwal = await prisma.jadwalWawancara.findMany({
      orderBy: { tanggal: "asc" },
    });
    return jadwal;
  } catch {
    return null;
  }
};

export const getJadwalWawancara = async (id: string) => {
  try {
    const jadwal = await prisma.jadwalWawancara.findUnique({ where: { id } });
    return jadwal;
  } catch {
    return null;
  }
};

// ------------------------ UPDATE FUNCTION ------------------------

// ------------------------ DELETE FUNCTION ------------------------

export const deleteJadwalWawancara = async (id: string) => {
  try {
    await prisma.jadwalWawancara.delete({ where: { id } });
    return { success: "Data berhasil dihapus" };
  } catch {
    return { error: "Data gagal dihapus" };
  }
};
