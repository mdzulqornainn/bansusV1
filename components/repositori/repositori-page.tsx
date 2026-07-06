"use client";

import { useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  FileStack,
  ExternalLink,
  User,
} from "lucide-react";
import { TGetRepositoriDatas } from "@/lib/types";
import { theme } from "@/lib/theme";

import { 
  Image as ImageIcon, 
  FileText, 
  Video, 
  Music, 
  Table2, 
  Package 
} from "lucide-react";

interface TypeIconProps {
  type: string;
  size?: number;
}

const TypeIcon = ({ type, size = 24 }: TypeIconProps) => {
  const lowerType = type.toLowerCase();
  if (lowerType.includes("image") || lowerType.includes("png") || lowerType.includes("jpg"))
    return <ImageIcon size={size} className={`${theme.text_fmipa}`} />;
  if (lowerType.includes("pdf") || lowerType.includes("doc") || lowerType.includes("text"))
    return <FileText size={size} className={`${theme.text_fmipa}`} />;
  if (lowerType.includes("video") || lowerType.includes("mp4"))
    return <Video size={size} className={`${theme.text_fmipa}`} />;
  if (lowerType.includes("audio") || lowerType.includes("mp3"))
    return <Music size={size} className={`${theme.text_fmipa}`} />;
  if (lowerType.includes("csv") || lowerType.includes("excel") || lowerType.includes("xls") || lowerType.includes("sheet"))
    return <Table2 size={size} className={`${theme.text_fmipa}`} />;
  return <Package size={size} className={`${theme.text_fmipa}`} />;
};

interface RepositoriPageProps {
  dataRepositori: TGetRepositoriDatas;
}

export default function RepositoriPage({
  dataRepositori,
}: RepositoriPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedType, setSelectedType] = useState<string>("all");

  const perPage = 9;

  // Get unique dataset types
  const datasetTypes = [
    "all",
    ...new Set(dataRepositori?.map((item) => item.jenisDataset) || []),
  ];

  // Filter sesuai pencarian dan tipe
  const filteredData = dataRepositori?.filter((item) => {
    const matchesSearch =
      item.namaDataset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item?.deskripsiDataset &&
        item?.deskripsiDataset
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      item.namaPemilik.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === "all" || item.jenisDataset === selectedType;

    return matchesSearch && matchesType;
  });

  // Pagination
  const totalPage = Math.ceil((filteredData?.length || 0) / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedData = filteredData?.slice(start, end);

  return (
    <main className="min-h-screen relative isolate overflow-x-hidden py-24 px-4 sm:px-6 lg:px-8 relative z-10 selection:bg-[#0b5ea8]/30">
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
    <div className="absolute top-[-5%] left-[-5%] w-[650px] h-[650px] neon-glow opacity-50 pointer-events-none z-[-1] animate-pulse [animation-duration:12s]"></div>
    <div className="absolute top-[25%] right-[-10%] w-[650px] h-[650px] neon-glow opacity-50 pointer-events-none z-[-1] animate-pulse [animation-duration:12s]"></div>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0b5ea8]/10 border border-[#0b5ea8]/20 rounded-full text-xs font-semibold text-[#0b5ea8] backdrop-blur-md shadow-xs">
            <FileStack className="w-3.5 h-3.5" />
            <span>Pusat Data & Riset Akademik FMIPA</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight leading-tight">
            Repository{" "}
            <span className="bg-gradient-to-r from-[#0B5EA8] to-cyan-600 bg-clip-text text-transparent">
              Dataset
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 font-medium leading-relaxed">
            Akses dan unduh kumpulan data penelitian sivitas akademika untuk
            mendukung pengembangan riset sains dan teknologi terintegrasi.
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-[0_8px_30px_rgba(11,94,168,0.02)] space-y-6">
          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-[#0b5ea8] transition-colors duration-200" />
            </div>
            <input
              type="text"
              placeholder="Cari judul dataset, deskripsi, atau nama peneliti..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full pl-11 pr-4 py-3.5 bg-white/60 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#0b5ea8]/10 focus:border-[#0b5ea8] transition-all duration-200 font-medium text-sm shadow-xs"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100/80">
            {datasetTypes.map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedType(type);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 capitalize tracking-wide cursor-pointer shadow-xs ${
                  selectedType === type
                    ? "bg-[#0b5ea8] text-white shadow-md shadow-[#0b5ea8]/20 scale-[1.02]"
                    : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300"
                }`}
              >
                {type === "all" ? "Semua Kategori" : type}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {!paginatedData || paginatedData.length === 0 ? (
          <div className="text-center py-20 bg-white/50 backdrop-blur-md border border-dashed border-slate-200 rounded-2xl max-w-md mx-auto shadow-xs">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 text-slate-400 rounded-xl mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-700 mb-1">
              Dataset Tidak Ditemukan
            </h3>
            <p className="text-xs font-medium text-slate-400 max-w-xs mx-auto">
              Tidak ada data yang cocok dengan kriteria pencarian Anda saat ini.
            </p>
          </div>
        ) : (
          <>
            {/* Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedData.map((data) => (
                <div
                  key={data.id}
                  className={`group bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_16px_35px_rgba(11,94,168,0.08)] hover:border-[#0b5ea8]/30 hover:bg-white/95 transition-all duration-300 overflow-hidden flex flex-col`}
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-100 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0b5ea8_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

                    {data.thumbnail ? (
                      <>
                        <img
                          src={data.thumbnail}
                          alt={data.namaDataset}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 relative z-10"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const fallback = e.currentTarget
                              .nextElementSibling as HTMLElement;
                            if (fallback) fallback.classList.remove("hidden");
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0b5ea8]/5 to-indigo-500/10 hidden">
                          <div className="text-center p-4">
                            <div className="inline-flex p-3 bg-white border border-slate-100 rounded-2xl shadow-xs text-[#0b5ea8] transform group-hover:scale-105 transition-transform duration-300">
                              <TypeIcon type={data.jenisDataset} size={40} />
                            </div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-3">
                              {data.jenisDataset}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0b5ea8]/5 to-indigo-500/10">
                        <div className="text-center p-4">
                          <div className="inline-flex p-3 bg-white border border-slate-100 rounded-2xl shadow-xs text-[#0b5ea8] transform group-hover:scale-105 transition-transform duration-300">
                            <TypeIcon type={data.jenisDataset} size={40} />
                          </div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-3">
                            {data.jenisDataset}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center">
                        <span className="px-2.5 py-1 bg-slate-100 border border-slate-200/50 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          {data.jenisDataset}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-800 tracking-tight group-hover:text-[#0b5ea8] transition-colors duration-200 line-clamp-2 leading-snug">
                        {data.namaDataset}
                      </h3>
                      <p className="text-xs font-medium text-slate-400 line-clamp-3 text-justify leading-relaxed">
                        {data.deskripsiDataset ||
                          "Tidak ada deskripsi tambahan yang disematkan untuk berkas penelitian repositori ini."}
                      </p>
                    </div>

                    <div className="border-t border-slate-100/80 pt-4 mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 max-w-[65%]">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{data.namaPemilik}</span>
                      </div>

                      <a
                        href={data.linkPublikasi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b5ea8] hover:text-white bg-[#0b5ea8]/5 hover:bg-[#0b5ea8] px-3 py-1.5 rounded-lg transition-all duration-200 shadow-xs cursor-pointer"
                      >
                        <FileStack className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                        Jurnal
                      </a>
                      <a
                        href={data.linkRepositori}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-medium text-sm shadow-lg shadow-indigo-200 group/link"
                      >
                        <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                        Akses
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPage > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100 pt-6">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white text-xs font-bold text-slate-600 rounded-xl border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 hover:text-slate-800 transition-all duration-150 shadow-xs cursor-pointer w-full sm:w-auto justify-center"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Sebelumnya
                </button>

                <div className="flex items-center gap-1.5 flex-wrap justify-center">
                  {Array.from({ length: totalPage }, (_, i) => i + 1).map(
                    (pageNum) => {
                      if (
                        pageNum === 1 ||
                        pageNum === totalPage ||
                        (pageNum >= page - 1 && pageNum <= page + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all duration-150 cursor-pointer ${
                              page === pageNum
                                ? "bg-[#0b5ea8] text-white shadow-sm shadow-[#0b5ea8]/20 scale-105"
                                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (pageNum === page - 2 || pageNum === page + 2) {
                        return (
                          <span
                            key={pageNum}
                            className="text-slate-400 font-bold px-0.5 text-xs"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    }
                  )}
                </div>

                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPage))
                  }
                  disabled={page === totalPage}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white text-xs font-bold text-slate-600 rounded-xl border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 hover:text-slate-800 transition-all duration-150 shadow-xs cursor-pointer w-full sm:w-auto justify-center"
                >
                  Berikutnya
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}