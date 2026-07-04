"use server";

import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";

// ------------------------ CREATE FUNCTION ------------------------

// ------------------------ READ FUNCTION ------------------------

export const getClasses = async () => {
  try {
    const classs = await prisma.class.findMany({
      include: {
        jadwalPraktikum: true,
        classAsdos: {
          include: {
            asdos: {
              include: {
                user: true,
              },
            },
            absensi: true,
          },
        },
        classDosen: {
          include: {
            dosen: true,
          },
        },
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
      orderBy: [
        {
          course: {
            semester: {
              prodi: {
                name: "asc",
              },
            },
          },
        },
        {
          course: {
            semester: {
              semesterNumber: "asc", // Kemudian berdasarkan semester number
            },
          },
        },
        {
          course: {
            name: "asc", // Urutkan berdasarkan nama mata kuliah
          },
        },
        {
          name: "asc", // Terakhir berdasarkan nama kelas
        },
      ],
    });
    return classs;
  } catch {
    return null;
  }
};

export const getClass = async (id: string) => {
  try {
    const classs = await prisma.class.findUnique({
      where: { id },
      include: {
        jadwalPraktikum: true,
        classDosen: {
          include: {
            dosen: true,
          },
        },
        classAsdos: {
          include: {
            asdos: {
              include: {
                user: true,
              },
            },
            absensi: true,
          },
        },
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
    });
    return classs;
  } catch {
    return null;
  }
};

// ------------------------ UPDATE FUNCTION ------------------------

export const updateClassJadwal = async (
  data: {
    hari: string;
    mulai: string;
    selesai: string;
    ruangan: string;
  },
  classId: string,
  jadwalId: string | undefined
) => {
  try {
    if (jadwalId) {
      await prisma.jadwalPraktikum.update({
        where: { id: jadwalId },
        data: {
          hari: data.hari,
          mulai: data.mulai,
          selesai: data.selesai,
          ruangan: data.ruangan,
        },
      });
      updateTag(`asdos`);
      updateTag(`class`);
      updateTag(`class-${classId}`);
      return { success: "Data berhasil diupdate" };
    }

    const jadwal = await prisma.jadwalPraktikum.create({
      data: {
        hari: data.hari,
        mulai: data.mulai,
        selesai: data.selesai,
        ruangan: data.ruangan,
      },
    });

    await prisma.class.update({
      where: { id: classId },
      data: { jadwalPraktikumId: jadwal.id },
    });
    updateTag(`asdos`);
    updateTag(`class`);
    updateTag(`class-${classId}`);
    return { success: "Data berhasil diupdate" };
  } catch {
    return { error: "Data gagal diupdate" };
  }
};

// ------------------------ DELETE FUNCTION ------------------------

export const deleteClass = async (classId: string, courseId: string) => {
  try {
    await prisma.class.delete({
      where: {
        id: classId,
      },
    });
    updateTag(`asdos`);
    updateTag(`class-${classId}`);
    updateTag(`course-${courseId}`);
    return { success: "Berhasil Mengahapus Kelas" };
  } catch {
    return { error: "Gagal Mengahapus Kelas" };
  }
};
