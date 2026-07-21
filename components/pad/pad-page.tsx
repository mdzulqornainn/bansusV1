"use client";

import { theme } from "@/lib/theme";
import { Zap, FileText, HelpCircle, Shield } from "lucide-react";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import { HeroSection } from "@/components/ui/HeroSection";
import { StatCard } from "@/components/ui/StatCard";
import { FeatureCard } from "@/components/ui/FeatureCard";

const PadPage = () => {
  const infoData = [
    { progja: "Hari/Tanggal", label: "13 Agustus 2025", color: "bg-blue-500" },
    { progja: "Waktu", label: "08:30 WIB", color: "bg-sky-500" },
    { progja: "Lokasi", label: "Ruang GIK L1 C", color: "bg-emerald-500" },
    { progja: "Dresscode", label: "Kemeja Rapih", color: "bg-amber-500" },
  ];

  const materiData = [
    {
      icon: <FileText className="w-6 h-6 text-blue-500" />,
      title: "Tutorial Vclass",
      description: "Panduan lengkap penggunaan Vclass."
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-sky-500" />,
      title: "Ngasdos itu Sulit gak ya?",
      description: "Materi utama mengenai tugas asisten dosen."
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-500" />,
      title: "Peraturan Lab",
      description: "Informasi seputar peraturan lab."
    },
  ];

  return (
    <div className={`min-h-screen relative isolate overflow-x-hidden ${theme.root_background}`}>
      <BackgroundEffects />

      {/* Hero Section yang Memuat Stat Card di dalamnya */}
      <HeroSection
        badgeText="Sistem Pelatihan Digital"
        badgeIcon={<Zap className="w-4 h-4 text-white" />}
        title={
          <>
            Pelatihan <br />
            <span className={theme.text_gradient}>Asisten Dosen</span>
          </>
        }
        description="Membangun Profesionalisme dan Kompetensi Asisten Dosen dalam mendukung Kualitas Pembelajaran yang Aktif dan Kolaboratif"
        showScrollDown={true}
        scrollTargetId="materi"
      >
        {/* Stat Card dimasukkan ke dalam Hero Section */}
        <div className="flex flex-wrap justify-center gap-3">
          {infoData.map((stat, index) => (
            <div key={index} className="w-[170px] sm:w-[190px]">
              <StatCard {...stat} />
            </div>
          ))}
        </div>
      </HeroSection>

      {/* Warning Section */}
      <section className={`${theme.container_wrapper} my-12 flex justify-center`}>
        <div className={`${theme.status_warning} w-full max-w-3xl flex items-center gap-3`}>
          <span>⚠</span>
          <p><strong>WAJIB</strong> hadir bagi seluruh Asisten Dosen Semester Ganjil...</p>
        </div>
      </section>

      {/* Materi Section */}
      <section id="materi" className="py-12">
        <div className={theme.container_wrapper}>
          <div className="text-center mb-12">
            <h3 className={`font-bold text-3xl ${theme.text_title}`}>📂 Materi Pelatihan</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {materiData.map((item, index) => (
              <FeatureCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PadPage;
