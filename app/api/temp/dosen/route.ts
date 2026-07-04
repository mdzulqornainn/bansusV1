import { prisma } from "@/lib/prisma";
import { dosenSchema } from "@/lib/zod";
import { Role } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { updateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validasi input menggunakan Zod
    const validation = dosenSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 }
      );
    }
    const AUTH_SECRET = process.env.AUTH_SECRET;
    const authHeader = req.headers.get("authorization");

    if (!authHeader || authHeader !== `${AUTH_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, email, password, nip } = validation.data;

    // Cek apakah email sudah terdaftar
    const existingAdmin = await prisma.user.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { error: "Email sudah digunakan" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerified: new Date(),
        role: Role.DOSEN,
      },
    });

    const newDosen = await prisma.dosen.create({
      data: {
        nip,
        user: {
          connect: {
            id: newUser.id,
          },
        },
        namaDosen: name,
      },
    });

    updateTag("user");
    updateTag("dosen");
    updateTag(`dosen-${nip}`);

    return NextResponse.json(
      { message: "Akun dosen berhasil dibuat", user: newUser, dosen: newDosen },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
