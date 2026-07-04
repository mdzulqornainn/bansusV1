import * as z from "zod";

export const signUpAsdosSchema = z
  .object({
    name: z.string().min(1, "Nama wajib diisi"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string().min(8, "Password minimal 8 karakter"),
    npm: z
      .string()
      .min(1, "NPM wajib diisi")
      .regex(/^\d{10}$/, "NPM harus berupa 10 digit angka"),
    whatsapp: z
      .string()
      .min(1, "Nomor WhatsApp wajib diisi")
      .regex(/^08\d{8,13}$/, "Format nomor WhatsApp tidak valid"),
    domisili: z.string().min(5, "Domisili wajib diisi"),
    matkul1: z.string().min(1, "Mata kuliah pilihan 1 wajib dipilih"),
    matkul2: z.string().min(1, "Mata kuliah pilihan 2 wajib dipilih"),
    wawancara: z.enum(["online", "offline"]),
    alasanOnline: z
      .string()
      .max(1000, "Alasan maksimal 1000 karakter")
      .optional(),
    alasan: z
      .string()
      .min(50, "Alasan minimal 50 karakter")
      .max(1000, "Alasan maksimal 1000 karakter"),
    bersediaDuaMatkul: z.boolean(),
    pengalamanAsdos: z.boolean(),
    bersediaDitempatkanLain: z.boolean(),
    suratPernyataan: z
      .instanceof(File)
      .refine(
        (file) => file.size <= 1024 * 1024 * 5,
        "Ukuran file maksimal 5MB"
      )
      .refine(
        (file) =>
          ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
        "Format file harus PDF, JPG, atau PNG"
      )
      .nullable(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    if (!data.npm.startsWith("23") && data.wawancara === "online") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Wawancara online hanya dapat dilakukan oleh mahasiswa angkatan 2023",
        path: ["wawancara"],
      });
    }
  });

export const signUpSchema = z
  .object({
    name: z.string().min(1, "Nama wajib diisi"),
    email: z
      .string({ required_error: "Email Wajib di isi" })
      .min(1, "Email Wajib di isi")
      .email("Email Tidak Valid"),
    password: z
      .string({ required_error: "Password Wajib di isi" })
      .min(1, "Password Wajib di isi"),
    confirmPassword: z.string().min(8, "Password minimal 8 karakter"),
    npm: z.string().optional(),
    nip: z.string().optional(),
    role: z.enum(
      ["ADMIN", "ASDOS", "CALON_ASDOS", "LABORAN", "DOSEN", "GUEST"],
      {
        required_error: "Role wajib diisi",
      }
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email Wajib di isi" })
    .min(1, "Email Wajib di isi")
    .email("Email Tidak Valid"),
  password: z
    .string({ required_error: "Password Wajib di isi" })
    .min(1, "Password Wajib di isi"),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
});

export const resetPasswordSchema = z.object({
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password is required"),
});

export const adminSchema = z.object({
  name: z.string().min(3, "Nama harus memiliki minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password harus memiliki minimal 8 karakter"),
});

export const userSchema = z.object({
  name: z.string().min(3, "Nama harus memiliki minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password harus memiliki minimal 8 karakter"),
  role: z.enum(["ADMIN", "ASDOS", "CALON_ASDOS", "LABORAN", "DOSEN", "GUEST"]),
  uniqueRelation: z.string().optional(),
});

export const dosenSchema = z.object({
  name: z.string().min(3, "Nama harus memiliki minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password harus memiliki minimal 8 karakter"),
  nip: z.string().min(3, "NIP harus memiliki minimal 3 karakter"),
});

export const addMatkulSchema = z.object({
  prodiId: z.string(),
  prodiName: z.string().min(1, "Prodi wajib diisi"),
  semesterNumber: z.number().min(1, "Semester wajib diisi"),
  semesterId: z.string(),
  code: z.string().min(1, "Kode wajib diisi"),
  nameCourse: z.string().min(1, "Mata kuliah wajib diisi"),
  sks: z.number().min(1, "SKS wajib diisi"),
  kuota: z.number().min(1, "Kuota wajib diisi"),
  status: z.string().min(1, "Status wajib diisi"),
});
