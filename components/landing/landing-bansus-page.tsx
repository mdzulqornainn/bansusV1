"use client";

import { theme } from "@/lib/theme";
import { Zap, Users, Shield, Calendar, Clock } from "lucide-react";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import { HeroSection } from "@/components/ui/HeroSection";
import { StatCard } from "@/components/ui/StatCard";
import { FeatureCard } from "@/components/ui/FeatureCard";

const LandingBansusPage = () => {
  const statData = [
    { progja: "Total Asisten", label: "120+ Orang", color: "bg-blue-500" },
    { progja: "Praktikum Aktif", label: "15 Mata Kuliah", color: "bg-sky-500" },
    { progja: "Laboratorium", label: "3 Ruang Lab", color: "bg-emerald-500" },
    { progja: "Status Sistem", label: "Online / 24.7", color: "bg-amber-500" },
  ];

  const mainModules = [
    { icon: <Calendar className="w-8 h-8 text-blue-500" />, title: "Manajemen Jadwal", description: "Pengelolaan dan sinkronisasi jadwal praktikum secara real-time." },
    { icon: <Users className="w-8 h-8 text-sky-500" />, title: "Open Recruitment", description: "Pendaftaran dan seleksi asisten dosen transparan." },
    { icon: <Shield className="w-8 h-8 text-emerald-500" />, title: "Keamanan Akun", description: "Sistem verifikasi email dan enkripsi data terintegrasi." },
  ];

  return (
    <div className={`min-h-screen relative isolate overflow-x-hidden ${theme.root_background}`}>
      <BackgroundEffects />

      {/* Hero Section dengan Stat Card Seragam */}
      <HeroSection
        badgeText={`Sistem Digitalisasi Badan Khusus ${new Date().getFullYear()}`}
        badgeIcon={<Zap className="w-4 h-4 text-white" />}
        title={
          <>
            Sistem <span className={theme.text_gradient}>Management</span><br />
            Badan <span className={theme.text_gradient}>Khusus</span>
          </>
        }
        description="Sistem Management Badan Khusus, yang efisien, aman, dan terintegrasi."
        showScrollDown={true}
        scrollTargetId="fitur-bansus"
      >
        <div className="flex flex-wrap justify-center gap-3">
          {statData.map((stat, index) => (
            <div key={index} className="w-[175px] sm:w-[185px]">
              <StatCard {...stat} />
            </div>
          ))}
        </div>
      </HeroSection>

      {/* Fitur Section */}
      <section id="fitur-bansus" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className={theme.container_wrapper}>
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${theme.text_fmipa} mb-6`}>
              Modul <span className={theme.text_gradient}>Bansus</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {mainModules.map((module, index) => (
              <FeatureCard key={index} {...module} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingBansusPage;
