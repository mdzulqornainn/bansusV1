"use client";

import { theme } from "@/lib/theme";
import { BookOpen, Calendar, Clock, Database, Users } from "lucide-react";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { HeroSection } from "@/components/ui/HeroSection";

const LabkomLanding = () => {
  const mainFeatures = [
    { icon: <Calendar size={24} />, title: "Modul Jadwal Praktikum", description: "Pembuatan dan pengelolaan jadwal praktikum (CRUD), pencarian jadwal by dosen/mata kuliah, dan open recruitment asisten dosen" },
    { icon: <Database size={24} />, title: "Dataset Research Collection", description: "Upload data penelitian, organisasi dan kategorisasi data, pencarian dataset by topik/jenis/nama, serta unduh/akses data" },
    { icon: <Users size={24} />, title: "Modul Layanan Lab", description: "Contact person, reservasi ruangan lab (pelatihan, etc.), peminjaman alat/perangkat, dan post berita/blog/modul" },
  ];

  return (
    <div className={`min-h-screen relative isolate overflow-x-hidden ${theme.root_background}`}>
      <BackgroundEffects />

      {/* Hero Section dengan Komponen Konsisten */}
      <HeroSection
        badgeText="Sistem Praktikum Digital"
        badgeIcon={<BookOpen className="w-4 h-4" />}
        title={
          <>
            Web Labkom <br />
            <span className={theme.text_gradient}>Praktikum</span>
          </>
        }
        description="Platform terintegrasi untuk pengelolaan praktikum Jurusan Ilmu Komputer. Jadwal, dataset research, dan layanan laboratorium dalam satu sistem."
      />

      {/* Scroll Down Arrow (Khas Halaman ini) */}
      <div className="flex flex-col items-center justify-center pointer-events-none select-none animate-bounce [animation-duration:1.5s] mb-12">
        <div className="w-6 h-10 border-2 border-[#0B5EA8]/30 rounded-full flex justify-center p-1 bg-white/60 backdrop-blur-sm shadow-[0_4px_12px_rgba(11,94,168,0.04)]">
          <div className="w-1.5 h-2 bg-[#0B5EA8]/70 rounded-full mt-1"></div>
        </div>
        <span className="mt-2 text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 bg-linear-to-r from-[#0B5EA8] to-cyan-600 bg-clip-text opacity-80">
          Scroll Down
        </span>
      </div>

      {/* Main Features Section */}
      <section id="modules" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${theme.text_fmipa} mb-6`}>
              Modul <span className="">Utama</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 max-w-6xl mx-auto">
            {mainFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Development Status */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className={`${theme.card_modal} ${theme.card_shadow} border border-slate-700/50 rounded-2xl p-12 text-center`}>
            <div className={`inline-flex items-center justify-center w-16 h-16 ${theme.card_background} rounded-full mb-6`}>
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold ${theme.text_fmipa} mb-6`}>
              Dalam Tahap Pengembangan
            </h2>
            <p className={`${theme.text_default} text-xl mb-8 max-w-2xl mx-auto`}>
              *untuk pengembangan selanjutnya - Sistem ini sedang dikembangkan untuk memenuhi kebutuhan praktikum yang lebih efisien dan terintegrasi
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabkomLanding;
