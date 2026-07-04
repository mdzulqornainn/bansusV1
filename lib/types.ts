import { getActiveAbsensi } from "@/data/absensi";
import { getAsdos, getAsdosByUserId, getAsdoss } from "@/data/asdos";
import { getAsdosApplication, getAsdosApplications } from "@/data/calon-asdos";
import { getClass, getClasses } from "@/data/class";
import {
  getCourse,
  getCourses,
  getProdis,
  getSemesters,
  getSemestersByProdiId,
} from "@/data/courses";
import { getDosen, getDosens } from "@/data/dosen";
import { getJadwalWawancaras } from "@/data/jadwal-wawancara";
import {
  getRepositoriDataById,
  getRepositoriDatas,
  getRepositoriDatasByDosenNip,
} from "@/data/repositori";
import { getUserById, getUsers } from "@/data/user";
import { currentUser } from "@/lib/authenticate";
import {
  addMatkulSchema,
  adminSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpAsdosSchema,
  signUpSchema,
} from "@/lib/zod";
import { Prisma } from "@prisma/client";
import * as z from "zod";

// Type Untuk Zod
export type TSignUpAsdosSchema = z.infer<typeof signUpAsdosSchema>;
export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type TSignInSchema = z.infer<typeof signInSchema>;
export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type TAdminSchema = z.infer<typeof adminSchema>;
export type TAddMatkulSchema = z.infer<typeof addMatkulSchema>;

// Type Untuk Fungsi
export type TCurrentUser = Prisma.PromiseReturnType<typeof currentUser>;
export type TGetUserById = Prisma.PromiseReturnType<typeof getUserById>;
export type TGetProdis = Prisma.PromiseReturnType<typeof getProdis>;
export type TGetSemesters = Prisma.PromiseReturnType<typeof getSemesters>;
export type TGetSemestersByProdiId = Prisma.PromiseReturnType<
  typeof getSemestersByProdiId
>;
export type TGetCourses = Prisma.PromiseReturnType<typeof getCourses>;
export type TGetAsdosApplications = Prisma.PromiseReturnType<
  typeof getAsdosApplications
>;
export type TGetAsdosApplication = Prisma.PromiseReturnType<
  typeof getAsdosApplication
>;
export type TGetUsers = Prisma.PromiseReturnType<typeof getUsers>;
export type TGetAsdoss = Prisma.PromiseReturnType<typeof getAsdoss>;
export type TGetAsdos = Prisma.PromiseReturnType<typeof getAsdos>;
export type TGetDosens = Prisma.PromiseReturnType<typeof getDosens>;
export type TGetDosen = Prisma.PromiseReturnType<typeof getDosen>;
export type TGetJadwalWawancaras = Prisma.PromiseReturnType<
  typeof getJadwalWawancaras
>;
export type TGetCourse = Prisma.PromiseReturnType<typeof getCourse>;
export type TGetClass = Prisma.PromiseReturnType<typeof getClass>;
export type TGetClasses = Prisma.PromiseReturnType<typeof getClasses>;
export type TGetAsdosByUserId = Prisma.PromiseReturnType<
  typeof getAsdosByUserId
>;
export type TGetActiveAbsensi = Prisma.PromiseReturnType<
  typeof getActiveAbsensi
>;
export type TgetRepositoriDatasByDosenNip = Prisma.PromiseReturnType<
  typeof getRepositoriDatasByDosenNip
>;
export type TGetRepositoriDataById = Prisma.PromiseReturnType<
  typeof getRepositoriDataById
>;

export type TGetRepositoriDatas = Prisma.PromiseReturnType<
  typeof getRepositoriDatas
>;
