"use server";

import { uploadFileToDrive } from "@/lib/drives";
import { prisma } from "@/lib/prisma";
import { unstable_cache, updateTag } from "next/cache";

// ------------------------ CREATE FUNCTION ------------------------

export const createActiveAbsensi = async () => {
  try {
    const data = await prisma.activeAbsensi.create({
      data: {
        pertemuanActive: [], // Initialize with empty array
      },
    });
    updateTag("active-absensi");
    return { data, success: "Data berhasil disimpan" };
  } catch (error) {
    console.error("Error creating active absensi:", error);
    return { error: "Data gagal disimpan, coba dengan data yang berbeda" };
  }
};

export const submitAbsensi = async (
  userId: string,
  npm: string,
  classAsdosId: string,
  pertemuanKe: number,
  waktuKehadiran: Date,
  name: string,
  materi: string,
  ruangan: string,
  matkul: string,
  buktiKehadiran: File | null
) => {
  try {
    const fileName = `${npm}_${name.split(" ").join("_").toLowerCase()}_${matkul}_pertmuan_${pertemuanKe}.pdf`;
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ABSENSI_ASDOS;

    if (!folderId) {
      return { error: "Folder bukti kehadiran tidak ditemukan" };
    }
    if (!buktiKehadiran) {
      return { error: "File bukti kehadiran tidak ditemukan" };
    }
    const getActiveAbsensiCached = unstable_cache(
      async () => getActiveAbsensi(),
      [],
      {
        tags: [
          "global-cache",
          `absensi`,
          `active-absensi`,
          `asdos-${npm}`,
          `asdos-${userId}`,
        ],
        revalidate: false,
      }
    );

    const dataAbsensi = await getActiveAbsensiCached();

    if (!dataAbsensi?.pertemuanActive.includes(pertemuanKe)) {
      return { error: "Pertemuan ini tidak dapat diisi" };
    }
    const responseUpload = await uploadFileToDrive(
      buktiKehadiran,
      fileName,
      folderId,
      true
    );
    const data = await prisma.absensi.create({
      data: {
        fileId: responseUpload?.data?.id || "",
        classAsdosId,
        pertemuanKe,
        waktuKehadiran: waktuKehadiran || new Date(),
        materi,
        ruangan,
      },
    });

    updateTag("absensi");
    updateTag("asdos-absensi");
    updateTag(`asdos-${npm}`);
    updateTag(`asdos-${userId}`);
    return { data, success: "Data berhasil disimpan" };
  } catch (error) {
    console.error("Error creating active absensi:", error);
    return { error: "Data gagal disimpan, coba dengan data yang berbeda" };
  }
};

// ------------------------ READ FUNCTION ------------------------

export const getActiveAbsensi = async () => {
  try {
    const data = await prisma.activeAbsensi.findFirst();

    // If no data exists, create a new one
    if (!data) {
      const newData = await createActiveAbsensi();
      return newData.data;
    }

    return data;
  } catch (error) {
    console.error("Error getting active absensi:", error);
    return null;
  }
};

// ------------------------ UPDATE FUNCTION ------------------------

export const updateActiveAbsensi = async (pertemuanActive: number[]) => {
  try {
    // Get existing data
    const absensiData = await getActiveAbsensi();

    if (!absensiData?.id) {
      return { error: "Data absensi aktif tidak ditemukan" };
    }

    const data = await prisma.activeAbsensi.update({
      data: { pertemuanActive },
      where: {
        id: absensiData.id,
      },
    });

    updateTag("active-absensi"); // Use consistent tag name
    return { data, success: "Data berhasil diupdate" };
  } catch (error) {
    console.error("Error updating active absensi:", error);
    return { error: "Data gagal diupdate" };
  }
};

// ------------------------ DELETE FUNCTION ------------------------

export const deleteActiveAbsensi = async (id: string) => {
  try {
    const data = await prisma.activeAbsensi.delete({
      where: { id },
    });
    updateTag("active-absensi");
    return { data, success: "Data berhasil dihapus" };
  } catch (error) {
    console.error("Error deleting active absensi:", error);
    return { error: "Data gagal dihapus" };
  }
};

// ------------------------ UPSERT FUNCTION (Alternative) ------------------------

export const upsertActiveAbsensi = async (pertemuanActive: number[]) => {
  try {
    // Try to find existing record
    const existingData = await prisma.activeAbsensi.findFirst();

    let data;
    if (existingData) {
      // Update existing record
      data = await prisma.activeAbsensi.update({
        data: { pertemuanActive },
        where: { id: existingData.id },
      });
    } else {
      // Create new record
      data = await prisma.activeAbsensi.create({
        data: { pertemuanActive },
      });
    }

    updateTag("active-absensi");
    return { data, success: "Data berhasil disimpan" };
  } catch (error) {
    console.error("Error upserting active absensi:", error);
    return { error: "Data gagal disimpan" };
  }
};
