"use server";

import { FormDataAddMatkul, FormDataUpdateMatkul } from "@/lib/interfaces";
import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";

// ------------------------ CREATE FUNCTION ------------------------

export const addProdi = async (name: string) => {
  try {
    await prisma.prodi.create({ data: { name } });
    updateTag("prodi");
    return { success: "Data berhasil disimpan" };
  } catch {
    return { error: "Data gagal disimpan, coba dengan data yang berbeda" };
  }
};

export const addCourse = async (data: FormDataAddMatkul) => {
  try {
    await prisma.course.create({
      data: {
        code: data.code,
        name: data.name,
        sks: Number(data.sks),
        kuota: Number(data.kuota),
        status: data.status,
        semesterId: data.semesterId,
      },
    });
    updateTag("course");
    return { success: "Data berhasil disimpan" };
  } catch {
    return { error: "Data gagal disimpan" };
  }
};

export const addSemster = async (semesterNumber: number, prodiId: string) => {
  try {
    await prisma.semester.create({ data: { semesterNumber, prodiId } });
    updateTag("semester");
    return { success: "Data berhasil disimpan" };
  } catch {
    return { error: "Data gagal disimpan, coba dengan data yang berbeda" };
  }
};

export const addCourseClass = async (courseId: string, name: string) => {
  try {
    const classData = await prisma.class.create({
      data: { name: name.toLocaleUpperCase(), courseId: courseId },
    });
    updateTag("prodi");
    updateTag("course");
    updateTag(`course-${courseId}`);

    return {
      success: "Data berhasil disimpan",
      id: classData.id,
      name: classData.name,
    };
  } catch {
    return { error: "Data gagal disimpan, coba dengan data yang berbeda" };
  }
};

// ------------------------ READ FUNCTION ------------------------

export const getProdis = async () => {
  try {
    const prodi = await prisma.prodi.findMany({
      include: {
        semester: {
          include: {
            courses: {
              include: {
                class: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return prodi;
  } catch {
    return null;
  }
};

export const getSemesters = async () => {
  try {
    const semester = await prisma.semester.findMany({
      orderBy: { semesterNumber: "asc" },
    });
    return semester;
  } catch {
    return null;
  }
};

export const getSemestersByProdiId = async (prodiId: string) => {
  try {
    const semester = await prisma.semester.findMany({
      orderBy: { semesterNumber: "asc" },
      where: { prodiId },
    });
    return semester;
  } catch {
    return null;
  }
};

export const getSemesterByNumber = async (number: number) => {
  return await prisma.semester.findFirst({ where: { semesterNumber: number } });
};

export const getCourses = async () => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        semester: {
          include: {
            prodi: true,
          },
        },
        courseApplication: true,
      },
      orderBy: [
        {
          semester: {
            prodi: {
              name: "asc",
            },
          },
        },
        {
          semester: {
            semesterNumber: "asc",
          },
        },
        {
          name: "asc",
        },
      ],
    });

    return courses;
  } catch (error) {
    console.error("Error in getCourses:", error);
    return null;
  }
};

export const getCourse = async (id: string) => {
  try {
    const course = await prisma.course.findUnique({
      include: {
        semester: {
          include: {
            prodi: true,
          },
        },
        class: {
          include: {
            course: true,
            classAsdos: true,
          },
        },
      },
      where: { id },
    });

    return course;
  } catch (error) {
    console.error("Error in getCourses:", error);
    return null;
  }
};

// ------------------------ UPDATE FUNCTION ------------------------

export const updateCourse = async (
  id: string,
  prodiId: string,
  data: FormDataUpdateMatkul
) => {
  try {
    const prodi = await prisma.prodi.findUnique({
      where: { id: prodiId },
      include: {
        semester: {
          include: {
            courses: true,
          },
        },
      },
    });
    if (!prodi) return { error: "Prodi tidak ditemukan" };
    const semesterId = prodi?.semester.find(
      (semester) => semester.semesterNumber === Number(data.semesterNumber)
    )?.id;

    if (!semesterId) return { error: "Semester tidak ditemukan" };
    const course = await prisma.course.update({
      where: { id },
      data: {
        code: data.code,
        name: data.name,
        sks: Number(data.sks),
        kuota: Number(data.kuota),
        status: data.status,
        semesterId: semesterId,
      },
    });
    if (!course) return { error: "Data gagal diupdate" };
    updateTag("course");
    updateTag(`course-${id}`);
    updateTag(`class`);
    return { success: "Data berhasil diupdate" };
  } catch {
    return { error: "Data gagal diupdate" };
  }
};

// ------------------------ DELETE FUNCTION ------------------------

export const deleteCourse = async (id: string) => {
  try {
    await prisma.course.delete({ where: { id } });
    updateTag("course");
    updateTag(`course-${id}`);
    return { success: "Data berhasil dihapus" };
  } catch {
    return { error: "Data gagal dihapus" };
  }
};
