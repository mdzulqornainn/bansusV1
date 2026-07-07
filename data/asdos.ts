"use server";

import { FormDataAddAsdos, FormDataUpdatePendaftar } from "@/lib/interfaces";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { createFolderForAsdos } from "@/lib/drives";

// ------------------------ CREATE FUNCTION ------------------------

export const addAsdosClass = async (
  npm: string,
  classId: string,
  userId: string,
) => {
  try {
    await prisma.classAsdos.create({ data: { asdosNpm: npm, classId } });
    revalidateTag("class");
    revalidateTag("asdos");
    revalidateTag(`asdos-${npm}`);
    revalidateTag(`asdos-${userId}`);
    return { success: "Data berhasil disimpan" };
  } catch {
    return { error: "Data gagal disimpan, coba dengan data yang berbeda" };
  }
};

export const addAsdos = async (data: FormDataAddAsdos) => {
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

    // 2. Jalankan seluruh operasi Database dalam satu transaksi (Optimasi Vercel)
    await prisma.$transaction([
      // Simpan data asdos baru beserta ID folder Drive-nya
      prisma.asdos.create({
        data: {
          npm: data.npm,
          userId: data.userId,
          fileId: data.fileId,
          whatsapp: data.whatsapp,
          domisili: data.domisili,
          alasan: data.alasan,
          driveFolderId: driveFolderId,
        },
      }),

      // Update role user menjadi ASDOS
      prisma.user.update({
        where: { id: data.userId },
        data: { role: "ASDOS" },
      }),

      // Hapus data lamaran pendaftaran yang sudah selesai diproses
      prisma.asdosApplication.deleteMany({
        where: { npm: data.npm },
      }),
    ]);

    // 3. Perbarui Cache Next.js agar UI langsung sinkron dan tidak berstatus null
    revalidateTag("user");
    revalidateTag(`user-${data.userId}`);
    revalidateTag("asdos");
    revalidateTag(`asdos-${data.npm}`);

    return { success: "Data berhasil disimpan dan folder telah dibuat!" };
  } catch (e) {
    console.error("CRITICAL ERROR pada addAsdos:", e);
    return {
      error: "Data gagal disimpan. " + (e instanceof Error ? e.message : e),
    };
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
};

// ------------------------ UPDATE FUNCTION ------------------------
export const updateAsdos = async (
  npm: string,
  data: FormDataUpdatePendaftar,
) => {};

// ------------------------ DELETE FUNCTION ------------------------

export const deleteAsdos = async (npm: string) => {
  try {
    await prisma.asdos.delete({ where: { npm } });
    revalidateTag("asdos");
    revalidateTag(`asdos-${npm}`);
    return { success: "Data berhasil dihapus" };
  } catch {
    return { error: "Data gagal dihapus" };
  }
};

export const deleteClassAsdos = async (id: string, npm: string) => {
  try {
    await prisma.classAsdos.delete({ where: { id } });
    revalidateTag("asdos");
    revalidateTag(`asdos-${npm}`);
    revalidateTag(`class-asdos-${id}`);
    return { success: "Data berhasil dihapus" };
  } catch {
    return { error: "Data gagal dihapus" };
  }
};
