import { theme } from "@/lib/theme";
import {
  CheckCircle,
  Home,
  Hourglass,
  MessageCircle,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PengumumanCalonAsdosPageProps {
  status: string;
}

export default function PengumumanCalonAsdosPage({
  status,
}: PengumumanCalonAsdosPageProps) {
  if (status === "rejected") {
    // di tolak ) rejected
    return (
      <section className="lg:ml-64 min-h-screen flex items-center justify-center p-4 bg-transparent backdrop-blur-none">
        <div className="max-w-xl mx-auto p-8 rounded-2xl border-2 shadow-2xl backdrop-blur-sm transition-all duration-300 transform scale-100 hover:scale-[1.01] bg-gradient-to-br from-red-700/40 to-red-900/40 border-red-600/50 text-red-200 animate-fadeIn">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-6">
              <XCircle className="w-16 h-16 text-red-700 animate-shake" />
            </div>
            <h2 className="text-3xl md:text-4xl text-red-700 font-bold mb-3">
              Mohon Maaf, Anda Belum Lolos
            </h2>
            <p className="mt-2 text-lg text-red-700 leading-relaxed">
              Terima kasih telah berpartisipasi. Kami mengapresiasi waktu dan
              usaha Anda, namun Anda belum lolos seleksi kali ini. Tetap
              semangat!
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href="/dashboard"
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
            >
              <Home className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
              Kembali ke Beranda
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Link>
          </div>
        </div>
      </section>
    );
  } else if (status === "processing") {
    // sedang dalam proses ) processing
    return (
      <section className="lg:ml-64 min-h-screen flex items-center justify-center p-4 bg-transparent backdrop-blur-none">
        <div className={`max-w-xl mx-auto ${theme.card_blue}`}>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-6">
              <Hourglass className={`w-16 h-16 ${theme.text_title} animate-flip-and-pause`} />
            </div>
            <h2 className={`text-3xl md:text-4xl ${theme.text_title} font-bold mb-3`}>
              Lamaran Sedang Dalam Proses Seleksi
            </h2>
            <p className={`mt-2 text-lg ${theme.text_default_light} leading-relaxed`}>
              Mohon bersabar. Tim kami sedang meninjau data Anda dengan seksama.
              Pengumuman resmi akan segera diberikan setelah proses selesai.
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href="/dashboard"
              className={`group relative inline-flex items-center px-8 py-4 text-white ${theme.card_small_blue} font-semibold rounded-full transition-all duration-300 transform hover:scale-105`}
            >
              <Home className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
              Kembali ke Beranda
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Link>
          </div>
        </div>
      </section>
    );
  } else if (status === "accepted") {
    // di terima ) accepted - kurang inormatif
    return (
      <section className="lg:ml-64 min-h-screen flex items-center justify-center p-4 bg-transparent backdrop-blur-none">
        <div className="max-w-xl mx-auto p-8 rounded-2xl border-2 shadow-2xl backdrop-blur-sm transition-all duration-300 transform scale-100 hover:scale-[1.01] bg-gradient-to-br from-green-700/40 to-green-900/40 border-green-600/50 text-green-200 animate-fadeIn">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-400 animate-bounceSlow" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Selamat! Anda Diterima
            </h2>
            <p className="mt-2 text-lg leading-relaxed">
              Kami dengan senang hati menginformasikan bahwa Anda telah berhasil
              melalui proses seleksi dan di terima sebagai bagian dari asisten
              dosen.
            </p>
          </div>
          {/* BAGIAN BARU: Langkah Selanjutnya & Tombol Grup */}
          <div className="mt-8 pt-6 border-t border-yellow-600/30 text-center">
            <p className="text-sm text-green-400 mb-2 ">
              Silakan bergabung ke grup WhatsApp atau scan QR di bawah.
            </p>
            <div className="flex flex-col items-center">
              <Image
                src="/bansus.png"
                width={40}
                height={40}
                alt="QR Code WhatsApp"
                className="w-32 h-32 rounded-lg border-2 border-green-500 shadow"
              />
            </div>
            <Link
              href="https://chat.whatsapp.com/Bc16QcQUOID08ZuToa3jfg" // <-- GANTI DENGAN LINK GRUP WHATSAPP ANDA
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-400/25"
            >
              <MessageCircle className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
              Gabung Grup WhatsApp
            </Link>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="lg:ml-64 min-h-screen flex items-center justify-center text-center p-4">
        <div className="text-xl text-gray-500">Status tidak dikenal.</div>
      </section>
    );
  }
}
