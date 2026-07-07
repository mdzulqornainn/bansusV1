"use server";

import { getUserByEmail } from "@/data/user";
import { uploadFileToDrive } from "@/lib/drives";
import { sendVerificationEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/tokens";
import { TSignUpAsdosSchema, TSignUpSchema } from "@/lib/types";
import { signUpAsdosSchema, signUpSchema } from "@/lib/zod";
import bcryptjs from "bcryptjs";
import { updateTag } from "next/cache";
import { auth, signOut } from "@/auth"; // 💡 PERBAIKAN 1: Tambahkan import signOut

export async function signUpAsdos(data: TSignUpAsdosSchema) {
  const validatedFields = signUpAsdosSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Mohon isi form dengan benar!" };
  }

  // 1. Cek Periode Pendaftaran Aktif
  const now = new Date();
  const activePeriod = await prisma.oprecDetails.findFirst({
    where: {
      status: true,
      OR: [
        {
          recStart: { lte: now },
          recEnd: { gte: now },
        },
        {
          recExStart: { lte: now },
          recExEnd: { gte: now },
        },
      ],
    },
  });

  if (!activePeriod) {
    return { error: "Pendaftaran saat ini sedang ditutup!" };
  }

  const {
    name,
    email,
    password,
    confirmPassword,
    npm,
    whatsapp,
    domisili,
    matkul1,
    matkul2,
    wawancara,
    alasanOnline,
    alasan,
    bersediaDuaMatkul,
    pengalamanAsdos,
    bersediaDitempatkanLain,
    suratPernyataan,
  } = data;

  if (!suratPernyataan)
    return { error: "File surat pernyataan tidak ditemukan." };

  // Validasi opsi wawancara angkatan dinamis
  if (!npm.startsWith(activePeriod.angkatanOnline) && wawancara === "online") {
    return {
      error: `Wawancara online hanya diizinkan untuk angkatan ${activePeriod.angkatanOnline}!`,
    };
  }

  if (password !== confirmPassword) {
    return { error: "Password tidak sama!" };
  }

  try {
    let userId = "";
    let isNewUser = false;
    let shouldVerifyEmail = false;

    // Ambil data session server & pastikan kecocokan email
    const session = await auth();
    const isSessionUser = session?.user?.email === email;

    // 2. Cek apakah Email sudah terdaftar di sistem (User Lama)
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      // ALUR DAFTAR ULANG (KONDISIONAL)
      if (!isSessionUser) {
        const isPasswordMatch = await bcryptjs.compare(
          password,
          existingUser.password,
        );
        if (!isPasswordMatch) {
          return {
            error:
              "Email sudah terdaftar dengan password berbeda. Silakan masukkan password akun Anda dengan benar atau gunakan menu Masuk.",
          };
        }
      }

      userId = existingUser.id;

      // Otomatis naikkan role menjadi CALON_ASDOS jika akun lama bukan ADMIN/DOSEN
      if (existingUser.role !== "ADMIN" && existingUser.role !== "DOSEN") {
        await prisma.user.update({
          where: { id: existingUser.id },
          data: { role: "CALON_ASDOS" },
        });
        updateTag("user");
      }

      // Jika akun lama ternyata belum pernah diverifikasi emailnya, tandai untuk verifikasi ulang
      if (!existingUser.emailVerified) {
        shouldVerifyEmail = true;
      }
    } else {
      // ALUR USER BARU: Daftarkan User baru ke database
      const hashedPassword = await bcryptjs.hash(password, 10);
      const newUser = await prisma.user.create({
        data: { name, email, password: hashedPassword, role: "CALON_ASDOS" },
      });

      userId = newUser.id;
      isNewUser = true;
      shouldVerifyEmail = true;
    }

    // 3. Upload File Ke Google Drive
    const fileName = `${npm}_${name.split(" ").join("_").toLowerCase()}.pdf`;
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_SURAT_PERNYATAAN_ID;

    if (!folderId) {
      if (isNewUser) await prisma.user.delete({ where: { id: userId } });
      return { error: "Folder penyimpanan tidak ditemukan" };
    }

    const responseUpload = await uploadFileToDrive(
      suratPernyataan,
      fileName,
      folderId,
    );
    if (responseUpload.error || !responseUpload.data?.id) {
      if (isNewUser) await prisma.user.delete({ where: { id: userId } });
      return { error: "Gagal upload file" };
    }

    // 4. Buat Record Aplikasi Pendaftaran Baru (AsdosApplication)
    const application = await prisma.asdosApplication.create({
      data: {
        fileId: responseUpload.data.id,
        userId: userId,
        npm,
        email,
        whatsapp,
        domisili,
        wawancara,
        alasanOnline,
        alasan,
        bersediaDuaMatkul,
        pengalamanAsdos,
        bersediaDitempatkanLain,
        oprecDetailsId: activePeriod.id,
      },
    });

    // 5. Hubungkan pilihan mata kuliah pendaftar (Aman untuk 1 atau 2 matkul)
    const courseSelections = [
      { asdosApplicationId: application.id, courseId: matkul1 },
    ];
    if (matkul2) {
      courseSelections.push({
        asdosApplicationId: application.id,
        courseId: matkul2,
      });
    }

    await prisma.courseApplication.createMany({
      data: courseSelections,
    });

    // 💡 PERBAIKAN 2: Hancurkan sesi login di browser pendaftar agar kembali menjadi guest bersih
    await signOut({ redirect: false });

    // 6. Tangani Sistem Verifikasi Email Berdasarkan Tipe Pendaftar
    if (shouldVerifyEmail) {
      const verificationToken = await generateVerificationToken(email);
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      );
      return { success: "Berhasil daftar! Silakan verifikasi email Anda." };
    }

    return {
      success:
        "Pendaftaran ulang berhasil disimpan! Data lamaran baru Anda telah dicatat.",
    };
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error:
          "Anda sudah mengirimkan pendaftaran untuk periode oprec aktif ini.",
      };
    }

    const errorMessage = error instanceof Error ? error.message : String(error);
    return { error: errorMessage };
  }
}

export async function signUp(data: TSignUpSchema) {
  const validatedFields = signUpSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Mohon isi form dengan benar!" };
  }

  const { email, password, name, npm, nip, confirmPassword, role } = data;

  if (password !== confirmPassword) {
    return { error: "Password tidak sama, silahkan coba lagi!" };
  }

  try {
    const emailExists = await getUserByEmail(email);
    if (emailExists) {
      return { error: "Email sudah terdaftar" };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        emailVerified: new Date(),
      },
    });

    if (!user) {
      return { error: "Gagal membuat akun" };
    }

    updateTag("user");

    if (npm) {
      const asdosExists = await prisma.asdos.findFirst({
        where: { npm },
      });

      if (asdosExists) {
        return { error: "NPM sudah terdaftar" };
      }

      await prisma.asdos.create({
        data: {
          npm,
          userId: user.id,
        },
      });

      updateTag("asdos");
      updateTag(`asdos-${npm}`);
    }

    if (nip) {
      const dosenExists = await prisma.dosen.findFirst({
        where: { nip },
      });

      if (dosenExists) {
        return { error: "NIP sudah terdaftar" };
      }

      await prisma.dosen.create({
        data: {
          nip,
          userId: user.id,
          namaDosen: name,
        },
      });
      updateTag("dosen");
      updateTag("user");
    }

    return {
      success: "Berhasil mendaftarkan akun!",
      role,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { error: errorMessage };
  }
}
