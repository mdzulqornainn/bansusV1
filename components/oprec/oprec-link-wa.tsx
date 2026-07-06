"use client";

import { theme } from "@/lib/theme";
import { AlertCircle, ArrowRight, CheckCircle, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LinkWaPage = () => {
  return (
    <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-3xl p-8 sm:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.03)] my-24 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-3">
          Pendaftaran Berhasil!
        </h1>

        <p className="text-sm sm:text-base text-slate-500 font-medium max-w-md mx-auto leading-relaxed mb-8">
          Berhasil daftar! Silakan lakukan verifikasi akun melalui kotak masuk email Anda sebelum masuk ke aplikasi.
        </p>

        <div className="w-full text-left p-4 bg-amber-50/60 border border-amber-200 rounded-xl flex gap-3 items-center mb-8 max-w-lg mx-auto">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <p className="text-xs font-bold text-amber-800 leading-normal">
            Note : Silahkan verifikasi akun melalui email terlebih dahulu.
          </p>
        </div>

        <Link
          href="https://chat.whatsapp.com/E77z0ghb43uJQvOxY58DLI?s=cl&p=a&mlu=0"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] text-sm tracking-wide mb-8"
        >
          Gabung Grup WhatsApp
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Link>
        
        <p className="text-xs font-bold text-slate-400 tracking-wide uppercase mb-4">
          Atau Scan QR Code di Bawah Ini
        </p>
        
        <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-inner inline-block mb-10">
          <Image
            src="/qr/qr-link-wa.png"
            alt="QR Code WhatsApp"
            width={160}
            height={160}
            className="rounded-xl"
          />
        </div>
        <div className="w-full border-t border-slate-100 pt-6">
          <Link
            href="/"
            className={`inline-flex items-center text-xs font-bold text-slate-500 hover:${theme.text_fmipa} transition-colors`}
          >
            <Home className="w-3.5 h-3.5 mr-1.5" />
            Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LinkWaPage;