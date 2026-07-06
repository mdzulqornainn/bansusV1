"use client";

import { theme } from "@/lib/theme";
import {
  BarChart3,
  Camera,
  Clock,
  Cloud,
  Shield,
  Users,
  Zap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const LandingBansusPage = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6 text-[#0B5EA8] group-hover:text-white" />,
      title: "Multi-User Management",
      description:
        "Kelola 80+ asdos dengan mudah dalam satu platform terintegrasi",
    },
    {
      icon: <Clock className="w-6 h-6 text-[#0B5EA8] group-hover:text-white" />,
      title: "Real-time Tracking",
      description:
        "Pantau kehadiran secara real-time dengan notifikasi otomatis",
    },
    {
      icon: <Camera className="w-6 h-6 text-[#0B5EA8] group-hover:text-white" />,
      title: "Photo Verification",
      description:
        "Bukti kehadiran dengan foto yang otomatis dikompresi dan disimpan",
    },
    {
      icon: <Cloud className="w-6 h-6 text-[#0B5EA8] group-hover:text-white" />,
      title: "Cloud Integration",
      description:
        "Integrasi seamless dengan Google Drive untuk penyimpanan aman",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-[#0B5EA8] group-hover:text-white" />,
      title: "Smart Analytics",
      description: "Dashboard analitik lengkap dengan laporan otomatis",
    },
    {
      icon: <Shield className="w-6 h-6 text-[#0B5EA8] group-hover:text-white" />,
      title: "Secure & Reliable",
      description: "Keamanan tingkat enterprise dengan audit trail lengkap",
    },
  ];

  const dataProgja = [
    { progja: "Oprec Asdos", label: "On Going", color: "bg-blue-500" },
    { progja: "Hincar TIK", label: "Done", color: "bg-green-500" },
    { progja: "Fosi Asdos", label: "1 / 2", color: "bg-blue-500" },
    { progja: "Pelatihan Asdos", label: "Coming Soon", color: "bg-amber-500" },
  ];

  return (
    <div className={`min-h-screen relative isolate overflow-x-hidden ${theme.root_background} pb-24`}>
      <style>{`
        .unila-dot-matrix {
          background-image: radial-gradient(rgba(11, 94, 168, 0.18) 2px, transparent 2px);
          background-size: 2.5rem 2.5rem;
        }
        .neon-glow {
          background-image: radial-gradient(circle, rgba(11, 94, 168, 0.35) 100%, transparent 100%);
          filter: blur(100px);
        }
      `}</style>
    
      <div className="absolute inset-0 unila-dot-matrix pointer-events-none z-[-1]"></div>
      <div className="absolute top-[-5%] left-[-5%] w-[650px] h-[650px] neon-glow opacity-60 pointer-events-none z-[-1] animate-pulse [animation-duration:12s]"></div>
      <div className="absolute top-[25%] right-[-10%] w-[650px] h-[650px] neon-glow opacity-50 pointer-events-none z-[-1] animate-pulse [animation-duration:16s]"></div>
      <div className="absolute top-[60%] left-[-10%] w-[650px] h-[650px] neon-glow opacity-50 pointer-events-none z-[-1] animate-pulse [animation-duration:16s]"></div>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-between pt-65 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/80 border border-slate-200/80 rounded-full px-5 py-1.5 mb-8 backdrop-blur shadow-sm hover:border-[#0B5EA8]/30 transition-all">
              <Zap className={`w-4 h-4 ${theme.text_fmipa} mr-2`} />
              <span className="text-slate-700 font-semibold text-xs tracking-wide">
                Sistem Digitalisasi Badan Khusus {new Date().getFullYear()}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 tracking-tight mb-6 leading-[1.15]">
              Sistem <span className="bg-gradient-to-r from-[#0B5EA8] to-cyan-600 bg-clip-text text-transparent">Management</span>
              <br />
              Badan <span className="bg-gradient-to-r from-[#0B5EA8] to-cyan-600 bg-clip-text text-transparent">Khusus</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 mb-14 max-w-2xl mx-auto leading-relaxed font-medium">
              Sistem Management Badan Khusus, yang efisien, aman, dan terintegrasi.
            </p>
          </div>

          {/* dataProgja */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
            {dataProgja.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl p-5 shadow-[0_4px_20px_rgba(11,94,168,0.03)] flex flex-col justify-between items-center text-center group hover:border-[#0B5EA8]/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="text-sm font-bold text-slate-700 mb-3 group-hover:text-[#0B5EA8] transition-colors">
                  {stat.progja}
                </div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">
                  <span className={`w-1.5 h-1.5 rounded-full ${stat.color}`}></span>
                  <span>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pointer-events-none select-none animate-bounce [animation-duration:1.5s]">
          <div className="w-6 h-10 border-2 border-[#0B5EA8]/30 rounded-full flex justify-center p-1 bg-white/60 backdrop-blur-sm shadow-[0_4px_12px_rgba(11,94,168,0.04)]">
            <div className="w-1.5 h-2 bg-[#0B5EA8]/70 rounded-full mt-1"></div>
          </div>
          <span className="mt-2 text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 bg-linear-to-r from-[#0B5EA8] to-cyan-600 bg-clip-text  opacity-80">
            Scroll Down
          </span>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-4">
              Fitur <span className="bg-gradient-to-r from-[#0B5EA8] to-cyan-600 bg-clip-text text-transparent">Unggulan</span>
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto text-slate-500 font-medium">
              Dilengkapi teknologi terdepan untuk memastikan sistem presensi yang efisien dan reliable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(11,94,168,0.06)] hover:border-[#0B5EA8]/20 hover:bg-white/90 transform hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-[#0B5EA8]/5 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#0B5EA8] group-hover:text-white transition-all duration-300 shadow-inner">
                    <div className="group-hover:scale-110 transition-transform duration-300 text-[#0B5EA8] group-hover:text-white">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-800 mb-2 tracking-tight">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm text-slate-500 text-justify leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              </div>
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
              <Link 
                href="#"
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold rounded-xl transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] text-sm tracking-wide border border-slate-200/50"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingBansusPage;