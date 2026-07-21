"use client";

import { theme } from "@/lib/theme";
import {
  Monitor,
  Lightbulb,
  Mic,
  Info,
  Users
} from "lucide-react";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import { HeroSection } from "@/components/ui/HeroSection";
import { StatCard } from "@/components/ui/StatCard";
import { FeatureCard } from "@/components/ui/FeatureCard";

const PeerPage = () => {
  // Data untuk Stat Card (lebar & tinggi presisi seragam)
  const infoData = [
    { progja: "Jadwal", label: "20 Sep, 27 Sep, 11 Okt", color: "bg-blue-500" },
    { progja: "Waktu", label: "09.00 & 13.00 WIB", color: "bg-sky-500" },
    { progja: "Lokasi", label: "Lab L3, RPL, Zoom", color: "bg-emerald-500" },
  ];

  // Data untuk Materi (menggunakan FeatureCard dengan ikon)
  const materiData = [
    {
      icon: <Monitor className="w-6 h-6 text-blue-500" />,
      title: "Hari Pertama",
      description: "Pengenalan VSCode, instalasi C++, dan konfigurasi GitHub."
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-sky-500" />,
      title: "Hari Kedua",
      description: "Materi hasil survei, pendalaman Hackerrank, dan tugas mini project kelompok."
    },
    {
      icon: <Mic className="w-6 h-6 text-emerald-500" />,
      title: "Hari Ketiga",
      description: "Presentasi kelompok dan evaluasi akhir."
    },
  ];

  return (
    <div className={`min-h-screen relative isolate overflow-x-hidden ${theme.root_background}`}>
      <BackgroundEffects />

      {/* --- HERO SECTION UTAMA DENGAN STAT CARD & SCROLL DOWN --- */}
      <HeroSection
        badgeText="Program Peer Group 2025"
        badgeIcon={<Users className="w-4 h-4 text-white" />}
        title={
          <>
            Peer Group <br />
            <span className={theme.text_gradient}>2025</span>
          </>
        }
        description="&quot;Berkarya, Berkembang, dan Berkolaborasi Bersama&quot;"
        showScrollDown={true}
        scrollTargetId="informasi-umum"
      >
        {/* Stat Cards dengan Lebar & Tinggi Seragam */}
        <div className="flex flex-wrap justify-center gap-3">
          {infoData.map((stat, index) => (
            <div key={index} className="w-[175px] sm:w-[190px]">
              <StatCard {...stat} />
            </div>
          ))}
        </div>
      </HeroSection>

      {/* --- INFORMASI UMUM SECTION --- */}
      <section id="informasi-umum" className="py-12 px-4 flex justify-center">
        <div className={`${theme.container_wrapper} w-full flex justify-center`}>
          <div className={`${theme.card_default} max-w-4xl w-full p-8 rounded-2xl`}>
            <h3 className={`font-bold text-2xl mb-6 ${theme.text_title} flex items-center gap-2`}>
              <Info className="w-6 h-6 text-[#0B5EA8]" /> Informasi Umum
            </h3>
            <ul className="space-y-3 text-left text-slate-600">
              <li>💡 <strong>Durasi:</strong> 3 pertemuan, 1 minggu jeda untuk mengerjakan project.</li>
              <li>💻 <strong>Fasilitas:</strong> Peserta tanpa laptop akan diprioritaskan di lab.</li>
              <li>📩 <strong>Reminder:</strong> Peserta akan diingatkan setiap malam sebelum acara, beserta gambaran materi.</li>
              <li>📹 <strong>Tugas Pengganti:</strong> Berupa video untuk peserta yang berhalangan hadir.</li>
              <li>🏆 <strong>Apresiasi:</strong> Nilai + untuk peserta aktif di mata kuliah DDP.</li>
              <li>📝 <strong>Evaluasi:</strong> Survei kritik dan saran setiap pertemuan.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- MATERI SECTION --- */}
      <section id="materi" className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={theme.container_wrapper}>
          <div className="text-center mb-12">
            <h3 className={`font-bold text-3xl ${theme.text_title}`}>
              📂 Materi Peer Group
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {materiData.map((item, index) => (
              <FeatureCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* --- SERTIFIKAT SECTION --- */}
      <section className="px-4 mb-16 flex justify-center">
        <div className={`${theme.container_wrapper} w-full flex justify-center`}>
          <div className={`${theme.status_accepted} border border-green-300 p-6 rounded-2xl ${theme.card_shadow} max-w-4xl w-full text-slate-700 font-medium`}>
            🎓 Peserta yang mengikuti seluruh rangkaian acara dan mengerjakan tugas dengan baik akan mendapatkan sertifikat yang dapat digunakan untuk konversi nilai DDP sebesar 10-15%.
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className={`text-center pb-12 pt-6 relative z-10 ${theme.container_wrapper} ${theme.text_default}`}>
        <p>Terima kasih atas perhatian dan partisipasinya.</p>
      </footer>
    </div>
  );
};

export default PeerPage;
