"use client";

import { theme } from "@/lib/theme";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { StatCard } from "@/components/ui/StatCard";
import { Zap } from "lucide-react";
import Image from "next/image";
import { HeroSection } from "@/components/ui/HeroSection";


export default function FosiPage() {
  const infoData = [
    { progja: "Hari/Tanggal", label: "19 Oktober 2025", color: "bg-blue-500" },
    { progja: "Waktu", label: "13:30 WIB", color: "bg-sky-500" },
    { progja: "Lokasi", label: "GIK Lantai 2", color: "bg-emerald-500" },
    { progja: "Dresscode", label: "Bebas Sopan", color: "bg-amber-500" },
  ];

  const tujuanData = [
    {
      icon: <span className="text-3xl">🤝</span>,
      title: "Mempererat Hubungan",
      description: "Meningkatkan keakraban antara Asisten Dosen dan Badan Khusus."
    },
    {
      icon: <span className="text-3xl">💡</span>,
      title: "Refleksi",
      description: "Melakukan evaluasi diri untuk peningkatan kualitas mengajar dan mendampingi mahasiswa."
    },
    {
      icon: <span className="text-3xl">📚</span>,
      title: "Penguatan Kompetensi",
      description: "Membekali asisten dengan keterampilan tambahan untuk mendukung pendidikan unggul."
    },
  ];

  return (
    <main className={`min-h-screen relative isolate overflow-x-hidden ${theme.root_background} pb-24`}>
      <BackgroundEffects />

      {/* Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <HeroSection
            badgeText="Sistem Digitalisasi Badan Khusus"
            badgeIcon={<Zap className="w-4 h-4" />}
            title={
              <>
                FoSi 2 <span className={theme.text_gradient}>Asisten Dosen</span>
              </>
            }
            description="Refleksi dan Kolaborasi Asisten Dosen Menuju Penguatan Kompetensi dan Pendidikan Unggul"
          />

          {/* Info Section */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {infoData.map((stat, index) => (
              <div key={index} className="w-full sm:w-[220px]">
                <StatCard {...stat} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="px-4 mb-16 flex justify-center">
        <div className={`${theme.status_warning} max-w-3xl flex items-center gap-3`}>
          <span>⚠</span>
          <p><strong>WAJIB</strong> bagi seluruh Asisten Dosen Semester Ganjil 2025 untuk hadir dan mengikuti kegiatan ini sebagai syarat mendapatkan sertifikat.</p>
        </div>
      </section>

      {/* Tujuan Kegiatan */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className={`font-bold text-3xl ${theme.text_title}`}>🎯 Tujuan Kegiatan</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tujuanData.map((item, index) => (
              <FeatureCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Rundown */}
      <section className="px-4 py-12 flex justify-center relative z-10">
        <div className={`${theme.card_default} max-w-4xl w-full`}>
          <h3 className={`font-bold text-3xl mb-8 ${theme.text_title}`}>📋 Rundown Acara</h3>
          <ul className={`text-left space-y-4 ${theme.text_default} font-medium`}>
            {[
              "13.30 - 13.45 → Registrasi Peserta",
              "13.45 - 14.00 → Pembukaan & Sambutan",
              "14.00 - 15.00 → Sesi Refleksi & Sharing",
              "15.00 - 16.00 → Games & Ice Breaking",
              "16.00 - 16.30 → Penyusunan Rencana Kolaborasi",
              "16.30 - Selesai → Penutup & Dokumentasi",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Dokumentasi */}
      <section className="px-4 py-12 max-w-6xl mx-auto relative z-10">
        <h3 className={`font-bold text-3xl mb-8 text-center ${theme.text_title}`}>📸 Dokumentasi Kegiatan</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {["imgfosi1.jpg", "imgfosi2.jpg", "imgfosi3.jpg", "imgfosi4.jpg"].map((src, i) => (
            <div key={i} className={`${theme.card_shadow} w-full h-48 relative rounded-xl overflow-hidden hover:scale-105 transition-transform`}>
              <Image src={`/${src}`} alt={`Dokumentasi ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
        <div className="text-center">
            <a href="https://drive.google.com/drive/folders/1zXkJzC0rZQ6zijPR1zZrHhb5gHuY5lRL" target="_blank" rel="noopener noreferrer" className={`${theme.text_title} hover:underline font-medium`}>
            📂 Lihat Semua Dokumentasi di Google Drive
            </a>
        </div>
      </section>

      <footer className={`text-center pt-10 relative z-10 ${theme.text_default}`}>
        <p>Terima kasih atas perhatian dan partisipasinya. Sampai jumpa di FoSi 2! 🙌</p>
      </footer>
    </main>
  );
}
