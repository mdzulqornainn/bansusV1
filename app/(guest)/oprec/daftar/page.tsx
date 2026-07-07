// File: src/app/(guest)/oprec/daftar/page.tsx
import OprecDaftarAsdosPage from "@/components/oprec/oprec-daftar-asdos-page";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth"; // 💡 Sesuai dengan library/helper autentikasi yang Anda pasang (misal NextAuth v5)

export default async function Page() {
  // 1. Ambil seluruh data mata kuliah aktif langsung dari database beserta relasinya
  const dataCourses = await prisma.course.findMany({
    where: {
      status: "aktif",
    },
    include: {
      semester: {
        include: {
          prodi: true,
        },
      },
    },
  });

  // 2. Ambil sesi user yang sedang aktif di server side
  const session = await auth();
  let currentUser = null;

  if (session?.user?.email) {
    // Ambil data profil dasar dari database berdasarkan email di sesi
    currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  return (
    // bg-[#F0F4F8] selaras dengan warna theme.root_background Anda
    <div className="min-h-screen pt-28 pb-12 bg-[#F0F4F8]">
      <div className="max-w-4xl mx-auto px-4">
        {/* 3. Render komponen client dan pasok datanya */}
        {/* Note: Menggunakan properti 'dataCoures' agar cocok dengan penamaan di komponen Anda */}
        <OprecDaftarAsdosPage
          dataCoures={dataCourses}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}
