"use client";

import { useState } from "react";
import {
  Search,
  Image,
  FileText,
  Video,
  Music,
  Table2,
  Package,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileStack,
  ExternalLink,
  User,
} from "lucide-react";
import { TGetRepositoriDatas } from "@/lib/types";
import { theme } from "@/lib/theme";

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
  const startIndex = (page - 1) * perPage;
  const paginatedData = filteredData?.slice(startIndex, startIndex + perPage);
  const totalPage = Math.ceil((filteredData?.length || 0) / perPage);

  // Reset page when filter changes
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setPage(1);
  };

  // Warna badge berdasarkan jenis dataset
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Gambar":
        return "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 border-blue-200";
      case "Text":
        return "bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 border-emerald-200";
      case "Video":
        return "bg-gradient-to-br from-rose-50 to-rose-100 text-rose-700 border-rose-200";
      case "Suara":
        return "bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 border-purple-200";
      case "Table":
        return "bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Type icon component
  const TypeIcon = ({ type, size = 24 }: { type: string; size?: number }) => {
    const iconProps = { size, strokeWidth: 2 };
    switch (type) {
      case "Gambar":
        return <Image {...iconProps} />;
      case "Text":
        return <FileText {...iconProps} />;
      case "Video":
        return <Video {...iconProps} />;
      case "Suara":
        return <Music {...iconProps} />;
      case "Table":
        return <Table2 {...iconProps} />;
      default:
        return <Package {...iconProps} />;
    }
  };

  return (
    <main
      className={`min-h-screen ${theme.root_background} bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 sm:px-6 lg:px-8 py-16`}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-100 shadow-sm">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600">
              {filteredData?.length || 0} Dataset Tersedia
            </span>
          </div>

          <h1
            className={`text-5xl sm:text-6xl font-bold ${theme.text_default_blue}`}
          >
            Repositori Dataset
          </h1>

          <p
            className={`text-lg ${theme.text_default} max-w-3xl mx-auto leading-relaxed`}
          >
            Jelajahi koleksi dataset berkualitas untuk penelitian, skripsi, dan
            proyek machine learning Anda. Semua data telah dipublikasikan dan
            siap digunakan.
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl p-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari berdasarkan nama dataset, deskripsi, atau pemilik..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {datasetTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                  selectedType === type
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {type !== "all" && <TypeIcon type={type} size={16} />}
                {type === "all" ? "Semua Dataset" : type}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {(!paginatedData || paginatedData.length === 0) && (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-300 p-16 text-center">
            <Package className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h3 className="text-2xl font-bold text-gray-700 mb-3">
              {searchTerm || selectedType !== "all"
                ? "Dataset Tidak Ditemukan"
                : "Belum Ada Dataset"}
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              {searchTerm || selectedType !== "all"
                ? "Coba gunakan kata kunci lain atau pilih kategori berbeda untuk menemukan dataset yang Anda cari"
                : "Dataset akan muncul di sini setelah ditambahkan ke repositori"}
            </p>
            {(searchTerm || selectedType !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedType("all");
                  setPage(1);
                }}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                Reset Filter
              </button>
            )}
          </div>
        )}

        {/* Grid Cards */}
        {paginatedData && paginatedData.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedData.map((data) => (
                <div
                  key={data.id}
                  className={`group bg-white rounded-2xl border border-gray-200 shadow-md ${theme.hover_default} overflow-hidden flex flex-col`}
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {data.thumbnail ? (
                      <>
                        <img
                          src={data.thumbnail}
                          alt={data.namaDataset}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const fallback = e.currentTarget
                              .nextElementSibling as HTMLElement;
                            if (fallback) fallback.classList.remove("hidden");
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
                          <div className="text-center">
                            <TypeIcon type={data.jenisDataset} size={48} />
                            <p className="text-sm font-medium text-gray-500 mt-2">
                              {data.jenisDataset}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
                        <div className="text-center">
                          <TypeIcon type={data.jenisDataset} size={48} />
                          <p className="text-sm font-medium text-gray-500 mt-2">
                            {data.jenisDataset}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Badge Overlay */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border backdrop-blur-sm flex items-center gap-1 ${getTypeColor(
                          data.jenisDataset
                        )} shadow-lg`}
                      >
                        <TypeIcon type={data.jenisDataset} size={14} />
                        {data.jenisDataset}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-tight">
                      {data.namaDataset}
                    </h2>

                    {/* Owner Info */}
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                        {data.namaPemilik.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          {data.namaPemilik}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <User size={12} />
                          Kontributor
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className={`text-sm ${theme.text_default} line-clamp-3 mb-4 flex-1 leading-relaxed`}
                    >
                      {data.deskripsiDataset ||
                        "Tidak ada deskripsi tersedia untuk dataset ini."}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                      <a
                        href={data.linkPublikasi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm group/link"
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
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPage > 1 && (
              <div className="flex items-center justify-center gap-4 pt-8">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="flex items-center gap-2 px-5 py-3 bg-white text-gray-700 rounded-xl border-2 border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-indigo-300 transition-all font-medium shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Sebelumnya
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPage }, (_, i) => i + 1).map(
                    (pageNum) => {
                      if (
                        pageNum === 1 ||
                        pageNum === totalPage ||
                        Math.abs(pageNum - page) <= 1
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`w-12 h-12 rounded-xl font-bold transition-all ${
                              page === pageNum
                                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200 scale-110"
                                : "bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (pageNum === page - 2 || pageNum === page + 2) {
                        return (
                          <span
                            key={pageNum}
                            className="text-gray-400 font-bold"
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
                  className="flex items-center gap-2 px-5 py-3 bg-white text-gray-700 rounded-xl border-2 border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-indigo-300 transition-all font-medium shadow-sm"
                >
                  Berikutnya
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
