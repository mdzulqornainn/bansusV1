"use client";

import { theme } from "@/lib/theme";
import {
  CalendarDays,
  Clock,
  MapPin,
  Monitor,
  Lightbulb,
  Mic,
  Info
} from "lucide-react";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { StatCard } from "@/components/ui/StatCard";

const PeerPage = () => {
  // Data untuk Info Section (menggunakan StatCard)
  const infoData = [
    { progja: "Jadwal", label: "20 Sep, 27 Sep, 11 Okt", color: "bg-blue-500" },
    { progja: "Waktu", label: "09.00 & 13.00 WIB", color: "bg-sky-500" },
    { progja: "Lokasi", label: "Lab L3, RPL, Zoom", color: "bg-emerald-500" },
  ];

  // Data untuk Materi (menggunakan FeatureCard)
  const materiData = [
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Hari Pertama",
      description: "Pengenalan VSCode, instalasi C++, dan konfigurasi GitHub."
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Hari Kedua",
      description: "Materi hasil survei, pendalaman Hackerrank, dan tugas mini project kelompok."
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Hari Ketiga",
      description: "Presentasi kelompok dan evaluasi akhir."
    },
  ];

  return (
    <div className={`min-h-screen relative isolate overflow-x-hidden ${theme.root_background} pb-24`}>
      <BackgroundEffects />

      {/* Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-4xl md:text-5xl font-extrabold mb-6 tracking-tight ${theme.text_title}`}>
            Peer Group 2025
          </h1>
          <p className={`text-xl md:text-2xl italic ${theme.text_default} mb-12 max-w-3xl mx-auto`}>
            &quot;Berkarya, Berkembang, dan Berkolaborasi Bersama&quot;
          </p>

          {/* Info Section (Menggunakan StatCard) */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {infoData.map((stat, index) => (
              <div key={index} className="w-full sm:w-[220px]">
                <StatCard {...stat} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Informasi Umum Section */}
      <section className="px-4 mb-16 flex justify-center">
        <div className={`${theme.card_default} max-w-4xl w-full`}>
          <h3 className={`font-bold text-2xl mb-6 ${theme.text_title} flex items-center gap-2`}>
            <Info className="w-6 h-6" /> Informasi Umum
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
      </section>

      {/* Materi Section */}
      <section id="materi" className="py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className={`font-bold text-3xl ${theme.text_title}`}>
              📂 Materi Peer Group
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {materiData.map((item, index) => (
              <FeatureCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Sertifikat */}
      <section className="px-4 mb-16 flex justify-center">
        <div className={`${theme.status_accepted} border border-green-300 p-6 rounded-2xl ${theme.card_shadow} max-w-4xl`}>
          🎓 Peserta yang mengikuti seluruh rangkaian acara dan mengerjakan tugas dengan baik akan mendapatkan sertifikat yang dapat digunakan untuk konversi nilai DDP sebesar 10-15%.
        </div>
      </section>

      {/* Footer */}
      <footer className={`text-center pt-10 relative z-10 ${theme.text_default}`}>
        <p>Terima kasih atas perhatian dan partisipasinya.</p>
      </footer>
    </div>
  );
};

export default PeerPage;
