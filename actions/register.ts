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

export async function signUpAsdos(data: TSignUpAsdosSchema) {
  const validatedFields = signUpAsdosSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Mohon isi form dengan benar!" };
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

  if (!suratPernyataan) {
    return { error: "File surat pernyataan tidak ditemukan." };
  }

  if (!npm.startsWith("23") && wawancara === "online") {
    return {
      error:
        "Wawancara online hanya untuk mahasiswa angkatan 2023!, silahkan isi wawancara offline",
    };
  }

  if (password !== confirmPassword) {
    return { error: "Password tidak sama, silahkan coba lagi!" };
  }

  try {
    const emailExists = await getUserByEmail(email);
    if (emailExists) {
      return { error: "Email sudah terdaftar" };
    }

    const aplicantExists = await prisma.asdosApplication.findFirst({
      where: { npm },
    });

    if (aplicantExists) {
      return { error: "NPM sudah terdaftar" };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "CALON_ASDOS",
      },
    });

    if (!user) {
      return { error: "Gagal membuat akun" };
    }

    const fileName = `${npm}_${name.split(" ").join("_").toLowerCase()}.pdf`;
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_SURAT_PERNYATAAN_ID;

    if (!folderId) {
      return { error: "Folder surat pernyataan tidak ditemukan" };
    }

    const responseUpload = await uploadFileToDrive(
      suratPernyataan,
      fileName,
      folderId
    );

    if (responseUpload.error || !responseUpload.data?.id) {
      await prisma.user.delete({ where: { id: user.id } });
      return { error: "Gagal upload file" };
    }

    const application = await prisma.asdosApplication.create({
      data: {
        fileId: responseUpload.data.id,
        userId: user.id,
        npm,
        whatsapp,
        domisili,
        wawancara,
        alasanOnline,
        alasan,
        bersediaDuaMatkul,
        pengalamanAsdos,
        bersediaDitempatkanLain,
      },
    });

    if (!application) {
      await prisma.user.delete({ where: { id: user.id } });
      return { error: "Gagal membuat pendaftaran" };
    }

    await prisma.courseApplication.create({
      data: {
        asdosApplicationId: application.id,
        courseId: matkul1,
      },
    });

    await prisma.courseApplication.create({
      data: {
        asdosApplicationId: application.id,
        courseId: matkul2,
      },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      success:
        "Berhasil daftar!, jika ingin login ke aplikasi silahkan verifikasi email anda terlebih dahulu.",
      role: "CALON_ASDOS",
    };
  } catch (error) {
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
          namaDosen: name, // INI BAKALAN DI HAPUS KEDEPANNYA
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
