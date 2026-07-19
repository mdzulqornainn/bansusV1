"use client";

import { theme } from "@/lib/theme";
import { BarChart3, Camera, Clock, Cloud, Shield, Users, Zap } from "lucide-react";
import Link from "next/link";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { StatCard } from "@/components/ui/StatCard";
import { HeroSection } from "@/components/ui/HeroSection";


const LandingBansusPage = () => {
  const features = [
    { icon: <Users className="w-6 h-6" />, title: "Multi-User Management", description: "Kelola 80+ asdos dengan mudah dalam satu platform terintegrasi" },
    { icon: <Clock className="w-6 h-6" />, title: "Real-time Tracking", description: "Pantau kehadiran secara real-time dengan notifikasi otomatis" },
    { icon: <Camera className="w-6 h-6" />, title: "Photo Verification", description: "Bukti kehadiran dengan foto yang otomatis dikompresi dan disimpan" },
    { icon: <Cloud className="w-6 h-6" />, title: "Cloud Integration", description: "Integrasi seamless dengan Google Drive untuk penyimpanan aman" },
    { icon: <BarChart3 className="w-6 h-6" />, title: "Smart Analytics", description: "Dashboard analitik lengkap dengan laporan otomatis" },
    { icon: <Shield className="w-6 h-6" />, title: "Secure & Reliable", description: "Keamanan tingkat enterprise dengan audit trail lengkap" },
  ];

  const dataProgja = [
    { progja: "Oprec Asdos", label: "On Going", color: "bg-blue-500" },
    { progja: "Hincar TIK", label: "Done", color: "bg-green-500" },
    { progja: "Fosi Asdos", label: "1 / 2", color: "bg-blue-500" },
    { progja: "Pelatihan Asdos", label: "Coming Soon", color: "bg-amber-500" },
  ];

  return (
    <div className={`min-h-screen relative isolate overflow-x-hidden ${theme.root_background} pb-24`}>
      <BackgroundEffects />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <HeroSection
            badgeText="Sistem Digitalisasi Badan Khusus"
            title={
              <>
                Sistem <span className={theme.text_gradient}>Management</span><br />
                Badan <span className={theme.text_gradient}>Khusus</span>
              </>
            }
            description="Sistem Management Badan Khusus, yang efisien, aman, dan terintegrasi."
          />

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
            {dataProgja.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-4">
              Fitur <span className="bg-gradient-to-r from-[#0B5EA8] to-cyan-600 bg-clip-text text-transparent">Unggulan</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg border border-white/60 rounded-3xl p-10 md:p-12 text-center shadow-[0_12px_40px_rgba(11,94,168,0.05)] relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-200/20 rounded-full filter blur-2xl pointer-events-none"></div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-4 max-w-2xl mx-auto leading-tight">
              Punya pertanyaan atau saran pengembangan?
            </h2>
            <p className="text-slate-500 text-base md:text-lg mb-8 max-w-xl mx-auto font-medium">
              Mari bersama-sama membangun ekosistem digital asisten laboratorium yang lebih modern dan terstruktur.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
              <Link
                href="/kontak"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#0B5EA8] hover:bg-[#094d8a] text-white font-bold rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] text-sm tracking-wide"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingBansusPage;
