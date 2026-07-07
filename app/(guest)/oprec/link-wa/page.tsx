import { theme } from "@/lib/theme";
import { CheckCircle2, Mail, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pendaftaran Berhasil | OPREC",
};

export default function LinkWaPage() {
  // Ganti dengan link grup WhatsApp koordinasi asdos Anda yang asli
  const WHATSAPP_GROUP_LINK =
    "https://chat.whatsapp.com/GrupKoordinasiAsdosAsli";

  return (
    <div
      className={`min-h-screen ${theme.root_background} flex items-center justify-center p-4 pt-24 pb-12`}
    >
      <div className="max-w-xl w-full bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl text-center relative overflow-hidden">
        {/* Dekorasi Aksen Elegan di Latar Belakang */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0B5EA8]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl" />

        {/* 1. Ikon Sukses Besar */}
        <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md border border-emerald-100 animate-bounce">
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
        </div>

        {/* 2. Judul Utama */}
        <h1
          className={`text-3xl font-black ${theme.text_title} tracking-tight mb-3`}
        >
          Pendaftaran Berhasil!
        </h1>
        <p
          className={`text-base ${theme.text_default} font-medium max-w-sm mx-auto mb-8`}
        >
          Data berkas lamaran Anda telah aman tersimpan di dalam sistem
          laboratorium.
        </p>

        {/* 3. Kotak Alur Langkah Berikutnya (Email & WA) */}
        <div className="space-y-4 text-left mb-10">
          <h3 className="text-sm font-bold text-slate-800 tracking-wider uppercase mb-2">
            Langkah Penting Berikutnya:
          </h3>

          {/* Langkah Verifikasi Email */}
          <div className="flex gap-4 p-4 bg-amber-50/60 border border-amber-200 rounded-2xl shadow-inner">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-700 h-fit shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                1. Verifikasi Email Anda
              </h4>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                Sistem telah mengirimkan tautan verifikasi ke email yang Anda
                daftarkan. Mohon **periksa kotak masuk (atau folder spam)** dan
                klik tombol verifikasi untuk mengaktifkan akun pendaftaran Anda.
              </p>
            </div>
          </div>

          {/* Langkah Masuk Grup WA */}
          <div className="flex gap-4 p-4 bg-blue-50/60 border border-blue-200 rounded-2xl shadow-inner">
            <div className="p-2 bg-blue-500/10 rounded-xl text-[#0B5EA8] h-fit shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`text-sm font-bold ${theme.text_title}`}>
                2. Gabung Grup Koordinasi WhatsApp
              </h4>
              <p
                className={`text-xs ${theme.text_default} mt-1 leading-relaxed`}
              >
                Seluruh pengumuman penting, pembagian jadwal wawancara, dan
                instruksi teknis lanjutan akan disampaikan langsung melalui grup
                koordinasi resmi di bawah ini.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Tombol Utama (CTA - Join WhatsApp) */}
        <div className="space-y-4">
          <a
            href={WHATSAPP_GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold px-8 py-4 rounded-xl text-md transition-all duration-300 shadow-lg hover:shadow-green-500/20 transform hover:-translate-y-0.5"
          >
            <MessageSquare className="w-5 h-5" />
            GABUNG GRUP WHATSAPP
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Tombol Cadangan Kembali ke Beranda */}
          <Link
            href="/oprec"
            className={`w-full inline-flex items-center justify-center text-sm font-semibold ${theme.text_default} hover:${theme.text_title} py-2 transition-colors`}
          >
            Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
