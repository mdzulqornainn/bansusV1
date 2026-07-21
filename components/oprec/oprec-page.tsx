import { getOprecDetails } from "@/data/oprec";
import { benefits, requirements } from "@/data/static-data";
import {
  isOprecOpen,
  mapDBToHeroInfo,
  mapDBToTimeline,
} from "@/lib/oprec-utils";
import { TGetProdis } from "@/lib/types";
import {
  ChevronRight,
  Download,
  Sparkles,
  Zap,
  XCircle,
  CheckCircle2,
} from "lucide-react";

import { HeroSection } from "@/components/ui/HeroSection";
import { StatCard } from "@/components/ui/StatCard";
import BackgroundEffects from "@/components/ui/BackgroundEffects"; // <--- Import BackgroundEffects
import { RequirementsSection } from "@/components/oprec/requirement";
import { MatkulSection } from "@/components/oprec/subject";
import { TimelineSection } from "@/components/oprec/timeline";
import { theme } from "@/lib/theme";

interface OprecPageProps {
  dataProdis: TGetProdis;
}

const OprecPage = async ({ dataProdis }: OprecPageProps) => {
  // 1. DATA FETCHING (Langsung berjalan di Server Side)
  const dbData = await getOprecDetails();

  // Tampilan fallback jika data konfigurasi di database belum diset oleh admin
  if (!dbData) {
    return (
      <div className="min-h-screen pt-32 text-center px-4 flex flex-col items-center justify-center bg-slate-50">
        <Sparkles className="h-12 w-12 text-gray-300 mb-4 animate-pulse" />
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
          Menunggu Konfigurasi Jadwal
        </h2>
        <p className="text-gray-500 mt-2 text-sm max-w-xs mx-auto">
          Administrator laboratorium belum mengatur linimasa periode Open
          Recruitment ini.
        </p>
      </div>
    );
  }

  // 2. DATA MAPPING & LOGIC VIA UTILS
  const dynamicTimeline = mapDBToTimeline(dbData);
  const dynamicHeroInfo = mapDBToHeroInfo(dbData);
  const isOpen = isOprecOpen(dbData);

  // 3. KALKULASI STATISTIK MATA KULIAH AKTIF
  const count_matkul =
    dataProdis?.reduce((total, prodi) => {
      return (
        total +
        prodi.semester.reduce((semesterTotal, semester) => {
          return semesterTotal + semester.courses.length;
        }, 0)
      );
    }, 0) || 0;

  // 4. KONFIGURASI ITEM HERO (Statistik Card di dalam Hero)
  const informationHero = [
    {
      progja: `${count_matkul * 2}+ Posisi`,
      label: "Tersedia",
      color: "bg-blue-500",
    },
    {
      progja: `${count_matkul} Mata Kuliah`,
      label: "Aktif",
      color: "bg-emerald-500",
    },
    {
      progja: "16 Pertemuan",
      label: "Per Semester",
      color: "bg-purple-500",
    },
    {
      progja: `Tahun ${dbData.tahunAjaran.split("/")[0] || new Date().getFullYear()}`,
      label: "Periode Asdos",
      color: "bg-amber-500",
    },
  ];

  return (
    <div className={`min-h-screen relative isolate overflow-x-hidden ${theme.root_background}`}>
      {/* --- BACKGROUND EFFECTS KONSISTEN --- */}
      <BackgroundEffects />

      {/* --- HERO SECTION UTAMA DENGAN STAT CARD & SCROLL DOWN --- */}
      <HeroSection
        badgeText={`Periode Pendaftaran: ${dynamicHeroInfo.startLabel} - ${dynamicHeroInfo.endLabel}`}
        badgeIcon={<Zap className="w-4 h-4 text-white" />}
        title={
          <>
            Open Recruitment <br />
            <span className={theme.text_gradient}>Asisten Dosen</span>
          </>
        }
        description="Bergabunglah sebagai Asisten Dosen! Kembangkan skill mengajar, dapatkan gaji kompetitif, dan pengalaman lab."
        showScrollDown={true}
        scrollTargetId="konten-oprec"
      >
        {/* Tombol CTA (Daftar & Download Surat) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          {isOpen ? (
            <>
              <a
                href="/oprec/daftar"
                className="group relative overflow-hidden bg-linear-to-r from-[#21379D] to-[#2d4bc7] hover:from-[#2d4bc7] hover:to-[#3d5fd1] text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-white" />
                <span className="relative z-10 text-base">Daftar Sekarang</span>
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="/files/surat-pernyataan.docx"
                download
                className="group relative overflow-hidden bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 font-bold px-8 py-4 rounded-2xl border-2 border-gray-200 hover:border-[#21379D] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-linear-to-br from-[#21379D] to-[#2d4bc7] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Download className="w-4 h-4 text-white" />
                </div>
                <span className="relative z-10 text-base">Download Surat Pernyataan</span>
              </a>
            </>
          ) : (
            <button
              disabled
              className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl border-2 border-red-400/50 opacity-90 cursor-not-allowed flex items-center gap-3 select-none"
            >
              <XCircle className="w-5 h-5 text-white" />
              <span className="relative z-10 text-base">Pendaftaran Ditutup</span>
            </button>
          )}
        </div>

        {/* Stat Cards dengan Lebar & Tinggi Seragam */}
        <div className="flex flex-wrap justify-center gap-3">
          {informationHero.map((stat, index) => (
            <div key={index} className="w-[175px] sm:w-[190px]">
              <StatCard {...stat} />
            </div>
          ))}
        </div>
      </HeroSection>

      {/* --- SUB-SECTION TIMELINE & PERSYARATAN --- */}
      <div id="konten-oprec">
        <TimelineSection timeline={dynamicTimeline} />
        <RequirementsSection requirements={requirements} benefits={benefits} />
        <MatkulSection dataProdis={dataProdis} />
      </div>
    </div>
  );
};

export default OprecPage;
