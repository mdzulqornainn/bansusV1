"use client";

import { theme } from "@/lib/theme";
import { AlertCircle, ArrowRight, CheckCircle, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LinkWaPage = () => {
  return (
    <div className={`backdrop-blur-sm ${theme.hover_glow_light} rounded-2xl p-8 sm:p-10 ${theme.card_shadow} shadow-yellow-sky/10 my-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8`}>
      <div className="flex flex-col items-center text-center">
        <div className={`p-3 rounded-full ${theme.logo_background} mb-5`}>
          <CheckCircle className="w-12 h-12 text-white" />
        </div>

        <h1 className={`text-3xl sm:text-4xl font-bold ${theme.text_title} mb-3`}>
          Pendaftaran Berhasil!
        </h1>

        <p className={`text-base sm:text-lg ${theme.text_default} max-w-xl mx-auto leading-relaxed mb-8`}>
          Berhasil daftar!, jika ingin login ke aplikasi silahkan verifikasi
          email anda terlebih dahulu.
        </p>

        <p className={`text-base sm:text-lg ${theme.text_default} max-w-xl mx-auto leading-relaxed mb-8 p-5 ${theme.hover_glow_light} bg-gray-300/90 flex gap-2 lg:items-center`}>
          <AlertCircle className="w-5 h-5" />
          Note : Silahkan verifikasi akun melalui email terlebih dahulu
        </p>

        <Link
          href={"https://chat.whatsapp.com/E77z0ghb43uJQvOxY58DLI?s=cl&p=a&mlu=0"}
          target="_blank"
          rel="noopener noreferrer"
          className={`${theme.button_square_pressed_blue} group inline-flex items-center justify-center w-full sm:w-auto font-bold rounded-lg transition-all duration-300 transform hover:scale-105 mb-6`}
        >
          Gabung Grup WhatsApp
          <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
        </Link>
        <p className={`text-base sm:text-lg ${theme.text_default_light} max-w-xl mx-auto leading-relaxed mb-8`}>
          Atau Scan QR Code dibawah
        </p>
        <Image
          src="/qr/qr-link-wa.png"
          alt="QR Code"
          width={200}
          height={200}
        />
        <Link
          href="/"
          className={`group inline-flex items-center text-sm font-medium ${theme.text_default_light} mt-4 hover:text-white transition-colors duration-300`}
        >
          <Home className="w-4 h-4 mr-2 transition-transform" />
          Kembali ke Halaman Utama
        </Link>
      </div>
    </div>
  );
};

export default LinkWaPage;
