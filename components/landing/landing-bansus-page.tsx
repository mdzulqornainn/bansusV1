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
} from "lucide-react";
import Link from "next/link";

const LandingBansusPage = () => {
  const features = [
    {
      icon: <Users className={`w-8 h-8 ${theme.text_title}`} />,
      title: "Multi-User Management",
      description:
        "Kelola 80+ asdos dengan mudah dalam satu platform terintegrasi",
    },
    {
      icon: <Clock className={`w-8 h-8 ${theme.text_title}`} />,
      title: "Real-time Tracking",
      description:
        "Pantau kehadiran secara real-time dengan notifikasi otomatis",
    },
    {
      icon: <Camera className={`w-8 h-8 ${theme.text_title}`} />,
      title: "Photo Verification",
      description:
        "Bukti kehadiran dengan foto yang otomatis dikompresi dan disimpan",
    },
    {
      icon: <Cloud className={`w-8 h-8 ${theme.text_title}`} />,
      title: "Cloud Integration",
      description:
        "Integrasi seamless dengan Google Drive untuk penyimpanan aman",
    },
    {
      icon: <BarChart3 className={`w-8 h-8 ${theme.text_title}`} />,
      title: "Smart Analytics",
      description: "Dashboard analitik lengkap dengan laporan otomatis",
    },
    {
      icon: <Shield className={`w-8 h-8 ${theme.text_title}`} />,
      title: "Secure & Reliable",
      description: "Keamanan tingkat enterprise dengan audit trail lengkap",
    },
  ];

  const dataProgja = [
    { progja: "Oprec Asdos", label: "On Going" },
    { progja: "Peer Group", label: "Coming Soon" },
    { progja: "Fosi Asdos", label: "1/2" },
    { progja: "Pelatihan Asdos", label: "Coming Soon" },
  ];

  return (
    <div className={`min-h-screen relative isolate overflow-x-hidden ${theme.root_background}`}>
      <style>{`
        .unila-dot-matrix {
          background-image: radial-gradient(rgba(11, 94, 168, 0.18) 2px, transparent 2px);
          background-size: 2.5rem 2.5rem;
        }
        .neon-glow-1 {
          background-image: radial-gradient(circle, rgba(11, 94, 168, 0.35) 100%, transparent 100%);
          filter: blur(100px);
        }
        .neon-glow-2 {
          background-image: radial-gradient(circle, rgba(6, 182, 212, 0.3) 100%, transparent 100%);
          filter: blur(120px);
        }
      `}</style>
    
      <div className="absolute inset-0 unila-dot-matrix pointer-events-none z-[-1]"></div>
      <div className="absolute top-[-5%] left-[-5%] w-[650px] h-[650px] neon-glow-1 opacity-60 pointer-events-none z-[-1] animate-pulse [animation-duration:12s]"></div>
      <div className="absolute top-[35%] right-[-10%] w-[650px] h-[650px] neon-glow-2 opacity-50 pointer-events-none z-[-1] animate-pulse [animation-duration:16s]"></div>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center bg-white/10 border ${theme.hover_glow_light} rounded-full px-6 py-2 mb-8 backdrop-blur`}>
              <Zap className={`w-4 h-4 ${theme.text_title} mr-2`} />
              <span className={`${theme.text_title} text-sm`}>
                Sistem Digitalisasi Badan Khusus {new Date().getFullYear()}
              </span>
            </div>

            <h1
              className={`text-5xl md:text-7xl font-bold ${theme.text_gradasi_cyan_sky} mb-8 leading-tight`}
            >
              Sistem{" "}
              <span className={`${theme.text_gradasi_cyan_sky}`}>
                Management
              </span>
              <br />
              Badan{" "}
              <span className={`${theme.text_gradasi_cyan_sky}`}>Khusus</span>
            </h1>

            <p
              className={`text-xl mb-12 max-w-3xl mx-auto leading-relaxed ${theme.text_default}`}
            >
              Sistem Management Badan Khusus, yang efisien, aman, dan
              terintegrasi. Masih dalam tahap pengembangan
            </p>
          </div>

          {/* dataProgja */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {dataProgja.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className={`text-2xl md:text-3xl font-semibold ${theme.text_default} mb-2`}
                >
                  {stat.progja}
                </div>
                <div className={theme.text_title}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${theme.text_gradasi_cyan_sky} mb-6`}>
              Fitur{" "}
              <span className="">
                Canggih
              </span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${theme.text_default}`}>
              Dilengkapi teknologi terdepan untuk memastikan sistem absensi yang
              efisien dan reliable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group ${theme.hover_glow_light} ${theme.card_shadow} backdrop-blur-sm border rounded-2xl p-8 ${theme.hover_default}`}
              >
                <div
                  className={`${theme.text_title} mb-6 group-hover:scale-100 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3
                  className={`${theme.text_title} text-xl font-semibold mb-4`}
                >
                  {index + 1}. {feature.title}
                </h3>
                <p className={`${theme.text_default} leading-relaxed`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className={`border ${theme.hover_glow_light} rounded-2xl backdrop-blur-lg p-12 text-center ${theme.card_shadow}`}>
            <h2 className={`text-3xl md:text-4xl font-bold ${theme.text_gradasi_cyan_sky} mb-6`}>
              Jika ada pertanyaan atau saran, kami siap membantu
            </h2>
            <p
              className={`${theme.text_default} text-xl mb-8 max-w-2xl mx-auto`}
            >
              Bergabung dengan sistem yang modern dan terstruktur secara digital
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontak" className={theme.button_pressed_blue}>
                Hubungi Kami
              </Link>
              <Link href="#"
                className={`${theme.hover_glow_light} px-8 py-4 text-lg rounded-full ${theme.table_highlight}
                  `}>
                {/* "border border-white/30 text-white px-8 py-4 rounded-full text-lg hover:bg-white/10 transition-all duration-300", 
                    "border border-blue-300 transition-all duration-300",
                */}
                <p className={`font-bold ${theme.text_gradasi_cyan_sky}`}>
                  Pelajari Lebih Lanjut
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingBansusPage;
