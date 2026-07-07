"use server";

import { FormDataAddAsdos, FormDataUpdatePendaftar } from "@/lib/interfaces";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { createFolderForAsdos } from "@/lib/drives";

// Bypass glitch type-checking Next.js 16 Turbopack compiler
const safeRevalidateTag = revalidateTag as any;

// ------------------------ CREATE FUNCTION ------------------------

export async function addAsdosClass(
  npm: string,
  classId: string,
  userId: string,
) {
  try {
    await prisma.classAsdos.create({ data: { asdosNpm: npm, classId } });
    safeRevalidateTag("class");
    safeRevalidateTag("asdos");
    safeRevalidateTag(`asdos-${npm}`);
    safeRevalidateTag(`asdos-${userId}`);
    return { success: "Data berhasil disimpan" };
  } catch {
    return { error: "Data gagal disimpan, coba dengan data yang berbeda" };
  }
}

export async function addAsdos(data: FormDataAddAsdos) {
  try {
    let driveFolderId = null;

    // 1. Buat folder di Google Drive menggunakan Nama Lengkap
    try {
      const folderRes = await createFolderForAsdos(data.name);
      if (folderRes.data?.id) {
        driveFolderId = folderRes.data.id;
      }
    } catch (driveError) {
      console.error("Gagal membuat folder Google Drive:", driveError);
    }

    // 2. Interactive Transaction (tx) untuk menangani pendaftar baru vs pendaftar lama
    await prisma.$transaction(async (tx) => {
      const existingAsdos = await tx.asdos.findUnique({
        where: { npm: data.npm },
      });

      if (!existingAsdos) {
        // Jika asdos baru, lakukan operasi create
        await tx.asdos.create({
          data: {
            npm: data.npm,
            userId: data.userId,
            fileId: data.fileId,
            whatsapp: data.whatsapp,
            domisili: data.domisili,
            alasan: data.alasan,
            driveFolderId: driveFolderId,
          },
        });
      } else {
        // Jika asdos lama mendaftar ulang, lakukan update data berkas terbaru
        await tx.asdos.update({
          where: { npm: data.npm },
          data: {
            userId: data.userId,
            fileId: data.fileId,
            whatsapp: data.whatsapp,
            domisili: data.domisili,
            alasan: data.alasan,
            driveFolderId: driveFolderId ?? existingAsdos.driveFolderId,
          },
        });
      }

      // Update role user menjadi ASDOS
      await tx.user.update({
        where: { id: data.userId },
        data: { role: "ASDOS" },
      });

      // Hapus data lamaran pendaftaran yang sudah selesai diproses
      await tx.asdosApplication.deleteMany({
        where: { npm: data.npm },
      });
    });

    // 3. Sinkronisasi Cache
    safeRevalidateTag("user");
    safeRevalidateTag(`user-${data.userId}`);
    safeRevalidateTag("asdos");
    safeRevalidateTag(`asdos-${data.npm}`);

    return { success: "Data berhasil disimpan dan folder telah dibuat!" };
  } catch (e) {
    console.error("CRITICAL ERROR pada addAsdos:", e);
    return {
      error: "Data gagal disimpan. " + (e instanceof Error ? e.message : e),
    };
  }
}

// ------------------------ READ FUNCTION ------------------------

export async function getAsdoss() {
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
}

export async function getAsdos(npm: string) {
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
}

export async function getAsdosByUserId(userId: string) {
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
}

// ------------------------ UPDATE FUNCTION ------------------------
export async function updateAsdos(npm: string, data: FormDataUpdatePendaftar) {}

// ------------------------ DELETE FUNCTION ------------------------

export async function deleteAsdos(npm: string) {
  try {
    await prisma.asdos.delete({ where: { npm } });
    safeRevalidateTag("asdos");
    safeRevalidateTag(`asdos-${npm}`);
    return { success: "Data berhasil dihapus" };
  } catch {
    return { error: "Data gagal dihapus" };
  }
}

export async function deleteClassAsdos(id: string, npm: string) {
  try {
    await prisma.classAsdos.delete({ where: { id } });
    safeRevalidateTag("asdos");
    safeRevalidateTag(`asdos-${npm}`);
    safeRevalidateTag(`class-asdos-${id}`);
    return { success: "Data berhasil dihapus" };
  } catch {
    return { error: "Data gagal dihapus" };
  }
}
