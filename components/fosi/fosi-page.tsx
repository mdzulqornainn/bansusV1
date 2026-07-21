"use client";

import { theme } from "@/lib/theme";
import { Zap } from "lucide-react";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import { HeroSection } from "@/components/ui/HeroSection";
import { StatCard } from "@/components/ui/StatCard";
import { FeatureCard } from "@/components/ui/FeatureCard";

const FosiPage = () => {
  const infoData = [
    { progja: "Hari/Tanggal", label: "14 Agustus 2025", color: "bg-blue-500" },
    { progja: "Waktu", label: "13:00 WIB", color: "bg-sky-500" },
    { progja: "Lokasi", label: "Auditorium GIK", color: "bg-emerald-500" },
    { progja: "Agenda", label: "Refleksi & Kolaborasi", color: "bg-purple-500" },
  ];

  const fosiFeatures = [
    { title: "Evaluasi Kinerja", description: "Refleksi pencapaian tugas asisten dosen semester lalu." },
    { title: "Penguatan Kompetensi", description: "Peningkatan kualitas metode pengajaran interaktif." },
    { title: "Diskusi Kolaboratif", description: "Sesi tanya jawab dan pemecahan masalah di laboratorium." },
  ];

  return (
    <div className={`min-h-screen relative isolate overflow-x-hidden ${theme.root_background}`}>
      <BackgroundEffects />

      {/* Hero Section dengan Stat Card Terintegrasi */}
      <HeroSection
        badgeText="Sistem Digitalisasi Badan Khusus"
        badgeIcon={<Zap className="w-4 h-4 text-white" />}
        title={
          <>
            ✨ FoSi 2 <span className={theme.text_gradient}>Asisten Dosen</span> ✨
          </>
        }
        description="Refleksi dan Kolaborasi Asisten Dosen Menuju Penguatan Kompetensi dan Pendidikan Unggul"
        showScrollDown={true}
        scrollTargetId="konten-fosi"
      >
        <div className="flex flex-wrap justify-center gap-3">
          {infoData.map((stat, index) => (
            <div key={index} className="w-[175px] sm:w-[185px]">
              <StatCard {...stat} />
            </div>
          ))}
        </div>
      </HeroSection>

      {/* Konten Section */}
      <section id="konten-fosi" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className={theme.container_wrapper}>
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${theme.text_fmipa} mb-6`}>
              Agenda <span className={theme.text_gradient}>Utama</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {fosiFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FosiPage;
