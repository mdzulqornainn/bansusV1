"use client";

import { theme } from "@/lib/theme";
import { BookOpen, FileText, MapPin, Zap } from "lucide-react";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { StatCard } from "@/components/ui/StatCard";
import { HeroSection } from "@/components/ui/HeroSection";


const PadPage = () => {
  const infoData = [
    { progja: "Hari/Tanggal", label: "13 Agustus 2025", color: "bg-blue-500" },
    { progja: "Waktu", label: "08:30 WIB", color: "bg-sky-500" },
    { progja: "Lokasi", label: "Ruang GIK L1 C", color: "bg-emerald-500" },
    { progja: "Dresscode", label: "Kemeja Rapih", color: "bg-amber-500" },
  ];

  // Ikon disederhanakan tanpa hardcoded color agar mengikuti theme.ts
  const materiData = [
    {
      icon: <FileText size={24} />,
      title: "Tutorial Vclass",
      description: "Panduan lengkap penggunaan Vclass untuk menunjang kegiatan asistensi.",
      href: "https://www.aryadzar.my.id/blog/tutorial-vclass-untuk-asisten-8335523070470254305"
    },
    {
      icon: <BookOpen size={24} />,
      title: "Ngasdos itu Sulit gak ya?",
      description: "Materi utama mengenai tugas, tanggung jawab, dan tips menjadi asisten dosen.",
      href: "/files/materi-pelasdos-2025.pdf"
    },
    {
      icon: <MapPin size={24} />,
      title: "Peraturan Lab",
      description: "Informasi penting seputar peraturan lab dan skema konversi nilai asistensi.",
      href: "/files/materi-bansus.pdf"
    },
  ];

  return (
    <div className={`min-h-screen relative isolate overflow-x-hidden ${theme.root_background} pb-24`}>
      <BackgroundEffects />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <HeroSection
            badgeText="Sistem Pelatihan Digital"
            badgeIcon={<Zap className="w-4 h-4" />}
            title={
              <>
                Pelatihan <br />
                <span className={theme.text_gradient}>Asisten Dosen</span>
              </>
            }
            description="Membangun Profesionalisme dan Kompetensi Asisten Dosen dalam mendukung Kualitas Pembelajaran yang Aktif dan Kolaboratif"
          />

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
          <p><strong>WAJIB</strong> hadir bagi seluruh Asisten Dosen Semester Ganjil 2025/2026 yang belum pernah menjadi asisten sebelumnya.</p>
        </div>
      </section>

      {/* Materi Pelatihan Section */}
      <section id="materi" className="py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className={`font-bold text-3xl ${theme.text_title}`}>
              📂 Materi Pelatihan
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {materiData.map((item, index) => (
              <FeatureCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      <footer className={`text-center pt-10 relative z-10 ${theme.text_default}`}>
        <p>Terima kasih atas perhatian dan partisipasinya.</p>
      </footer>
    </div>
  );
};

export default PadPage;
