import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { adminSchema } from "@/lib/zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validasi input menggunakan Zod
    const validation = adminSchema.safeParse(body);
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

    const { name, email, password } = validation.data;

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

    const newAdmin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerified: new Date(),
        role: Role.ADMIN,
      },
    });

    return NextResponse.json(
      { message: "Akun admin berhasil dibuat", admin: newAdmin },
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
