import { getOprecDetails } from "@/data/oprec";
import { benefits, requirements } from "@/data/static-data";
import {
  isOprecOpen,
  mapDBToHeroInfo,
  mapDBToTimeline,
} from "@/lib/oprec-utils";
import { TGetProdis } from "@/lib/types";
import {
  BookOpen,
  Calendar,
  ChevronRight,
  Download,
  Sparkles,
  Users,
  Zap,
  XCircle,
  CheckCircle2,
} from "lucide-react";

import { HeroSection } from "@/components/oprec/hero";
import { RequirementsSection } from "@/components/oprec/requirement";
import { MatkulSection } from "@/components/oprec/subject";
import { TimelineSection } from "@/components/oprec/timeline";

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

  // 4. KONFIGURASI ITEM HERO (Ikon & Warna Gradasi Mewah)
  const informationHero = [
    {
      value: `${count_matkul * 2}+`,
      description: "Posisi Tersedia",
      icon: <Users className="w-8 h-8" />,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      value: count_matkul.toString(),
      description: "Mata Kuliah",
      icon: <BookOpen className="w-8 h-8" />,
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      value: "16",
      description: "Pertemuan/Semester",
      icon: <Calendar className="w-8 h-8" />,
      gradient: "from-purple-500 to-violet-600",
    },
  ];

  return (
    <>
      <section className="pt-32 px-4 sm:px-6 lg:px-8 pb-20 overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto">
          {/* --- HERO HEADER SECTION --- */}
          <div className="text-center mb-16 relative">
            {/* Period Badge Dinamis */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#21379D] to-[#2d4bc7] rounded-full px-6 py-3 mb-8 backdrop-blur shadow-lg border border-white/20 animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-white text-sm font-bold tracking-wide">
                Periode Pendaftaran: {dynamicHeroInfo.startLabel} -{" "}
                {dynamicHeroInfo.endLabel}
              </span>
            </div>

            {/* Main Title Typography */}
            <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Sparkles className="h-10 w-10 text-[#21379D] animate-pulse hidden md:block" />
                <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-[#21379D] via-[#2d4bc7] to-[#3d5fd1] bg-clip-text text-transparent leading-tight pb-2">
                  Open Recruitment
                </h1>
                <Sparkles className="h-10 w-10 text-[#21379D] animate-pulse hidden md:block" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">
                Asisten Dosen{" "}
                {dbData.tahunAjaran.split("/")[0] || new Date().getFullYear()}
              </h2>
            </div>

            {/* Sub-description Text */}
            <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              Bergabunglah dengan tim asdos terbaik! Kesempatan emas untuk
              mengembangkan kemampuan mengajar sambil mendapat penghasilan yang
              kompetitif dan pengalaman mengelola kelas laboratorium.
            </p>

            {/* CTA Buttons Conditional Render */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
              {isOpen ? (
                // Tampilan Ketika Pendaftaran DIBUKA / EXTENDED
                <>
                  <a
                    href="/oprec/daftar"
                    className="group relative overflow-hidden bg-gradient-to-r from-[#21379D] to-[#2d4bc7] hover:from-[#2d4bc7] hover:to-[#3d5fd1] text-white font-bold px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 text-white" />
                    <span className="relative z-10 text-lg">
                      Daftar Sekarang
                    </span>
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </a>

                  <a
                    href="/files/surat-pernyataan.docx"
                    download
                    className="group relative overflow-hidden bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 font-bold px-10 py-5 rounded-2xl border-2 border-gray-200 hover:border-[#21379D] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#21379D] to-[#2d4bc7] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <span className="relative z-10 text-lg">
                      Download Surat Pernyataan
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#21379D]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </a>
                </>
              ) : (
                // Tampilan Ketika Pendaftaran DITUTUP / MATI
                <>
                  <button
                    disabled
                    className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white font-bold px-10 py-5 rounded-2xl shadow-xl border-2 border-red-400/50 opacity-90 cursor-not-allowed flex items-center gap-3 select-none"
                  >
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="relative z-10 text-lg">
                      Pendaftaran Ditutup
                    </span>
                    <div className="absolute inset-0 bg-white/10 animate-pulse" />
                  </button>
                  {isOpen ? (
                    <a
                      href="/files/surat-pernyataan.docx"
                      download
                      className="group relative overflow-hidden bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 font-bold px-10 py-5 rounded-2xl border-2 border-gray-200 hover:border-gray-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <span className="relative z-10 text-lg">
                        Download Surat Pernyataan
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </a>
                  ) : null}
                </>
              )}
            </div>

            {/* Teks Status Indikator Tambahan */}
            <div className="text-sm text-slate-400 mt-6 animate-in fade-in duration-700 delay-700">
              {isOpen ? (
                <span className="inline-flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  Pendaftaran sedang dibuka. Segera lengkapi berkas Anda!
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                  Gerbang pendaftaran ditutup atau belum dibuka oleh Admin.
                </span>
              )}
            </div>
          </div>

          {/* --- QUICK STATS CARDS GRID --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {informationHero.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-white/60 hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-in fade-in slide-in-from-bottom-4"
                style={{
                  animationDuration: "700ms",
                  animationDelay: `${700 + index * 150}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#21379D]/5 via-[#21379D]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#21379D]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

                <div className="relative text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg mb-4 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                  >
                    <span className="text-white">{item.icon}</span>
                  </div>
                  <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-[#21379D] to-[#2d4bc7] bg-clip-text text-transparent mb-3">
                    {item.value}
                  </div>
                  <div className="text-slate-700 font-bold text-lg">
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SUB-SECTION TIMELINE & PERSYARATAN --- */}
      <TimelineSection timeline={dynamicTimeline} />
      <RequirementsSection requirements={requirements} benefits={benefits} />
      <MatkulSection dataProdis={dataProdis} />
    </>
  );
};

export default OprecPage;
