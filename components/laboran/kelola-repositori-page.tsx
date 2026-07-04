"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Database, FileText, Users, CheckCircle, Eye, Search, Filter, RefreshCw, HardDrive, MoreVertical, Download
} from 'lucide-react';
import { theme } from '@/lib/theme';

// --- TIPE DATA ---
type DatasetStatus = 'pending' | 'approved' | 'rejected';

type Dataset = {
  id: number;
  title: string;
  owner: string;
  category: "Text" | "Gambar" | "Video" | "Suara" | "Table" | "Lainnya";
  year: string;
  uploadDate: string;
  status: DatasetStatus;
  description: string;
  pubLink: string;
  repoLink: string;
};

// --- DUMMY DATA LENGKAP ---
const initialData: Dataset[] = [
  {
    id: 101, title: "Dataset Wajah Orang Indonesia", owner: "New User 1", category: "Gambar", year: "2024", uploadDate: "2024-01-20", status: "pending",
    description: "Kumpulan 1000 foto wajah untuk training model.", pubLink: "#", repoLink: "#"
  },
  {
    id: 1, title: "Deteksi Penyakit Kopi", owner: "Budi Santoso", category: "Gambar", year: "2024", uploadDate: "2023-12-10", status: "approved",
    description: "Dataset penyakit daun kopi robusta.", pubLink: "#", repoLink: "#"
  },
  {
    id: 2, title: "Sentiment Analysis Pemilu", owner: "Siti Aminah", category: "Text", year: "2024", uploadDate: "2023-12-11", status: "approved",
    description: "Tweet sentiment analysis pilkada.", pubLink: "#", repoLink: "#"
  },
  {
    id: 3, title: "Data Cuaca Jakarta", owner: "BMKG Open", category: "Table", year: "2023", uploadDate: "2023-10-05", status: "approved",
    description: "Data curah hujan harian.", pubLink: "#", repoLink: "#"
  },
  {
    id: 103, title: "Data Spam Judi Online", owner: "Anonim", category: "Lainnya", year: "2024", uploadDate: "2024-01-18", status: "rejected",
    description: "Dataset berisi link berbahaya.", pubLink: "#", repoLink: "#"
  },
  {
    id: 4, title: "Suara Burung Endemik", owner: "Bio Lab", category: "Suara", year: "2023", uploadDate: "2023-08-20", status: "approved",
    description: "Rekaman suara di hutan.", pubLink: "#", repoLink: "#"
  },
];

export default function DashboardRepositori() {
  // --- STATE ---
  const [data, setData] = useState<Dataset[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedYear, setSelectedYear] = useState("Semua");

  // State untuk Interaksi Tabel (Dropdown & Modal)
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);

  // Close dropdown saat click outside
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    if (openDropdownId) window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [openDropdownId]);

  // --- LOGIC FILTER ---
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.owner.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === "Semua" || item.category === selectedCategory;
      const matchYear = selectedYear === "Semua" || item.year === selectedYear;

      return matchSearch && matchCategory && matchYear;
    });
  }, [searchTerm, selectedCategory, selectedYear, data]);

  // --- LOGIC STATISTIK ---
  const stats = useMemo(() => {
    return {
      totalDatasets: data.length,
      totalContributors: new Set(data.map(d => d.owner)).size,
      // UBAH LOGIC: Menghitung jumlah yang statusnya 'approved'
      totalPublished: data.filter(d => d.status === 'approved').length,
      displayed: filteredData.length
    };
  }, [data, filteredData]);

  // --- LOGIC ADMIN ACTIONS ---
  const handleStatusChange = (id: number, newStatus: DatasetStatus) => {
    // Custom message confirmation
    let message = `Ubah status menjadi ${newStatus}?`;
    if (newStatus === 'pending') message = "Apakah Anda yakin ingin membatalkan status (kembali ke pending)?";

    if (confirm(message)) {
      setData(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Hapus permanen data ini?")) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("Semua");
    setSelectedYear("Semua");
  };

  // Helper Options
  const categories = ["Semua", ...Array.from(new Set(data.map(d => d.category)))];
  const years = ["Semua", ...Array.from(new Set(data.map(d => d.year))).sort().reverse()];

  // Helper Badge Color
  const getStatusBadge = (status: DatasetStatus) => {
    switch (status) {
      case 'approved': return <span className="px-3 py-1 text-xs font-bold text-green-700 bg-green-100 rounded-full border border-green-200">Published</span>;
      case 'rejected': return <span className="px-3 py-1 text-xs font-bold text-red-700 bg-red-100 rounded-full border border-red-200">Rejected</span>;
      default: return <span className="px-3 py-1 text-xs font-bold text-yellow-700 bg-yellow-100 rounded-full border border-yellow-200">Pending</span>;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Gambar": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Text": return "bg-green-100 text-green-700 border-green-200";
      case "Video": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen p-6 lg:ml-64">

      {/* 1. HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-black rounded-2xl shadow-lg">
          <Database className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className={`text-3xl font-extrabold ${theme.text_title} tracking-tight`}>
            Dashboard Repositori
          </h1>
          <p className="text-gray-500 text-sm mt-1">Kelola data, statistik, dan publikasi dalam satu tampilan.</p>
        </div>
      </div>

      {/* 2. STATISTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
        {/* Card 1 */}
        <div className={theme.card_small_blue}>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-blue-100">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-blue-600/80 text-sm font-semibold">Total Dataset</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDatasets}</p>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className={theme.card_small_green}>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-green-100">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-green-600/80 text-sm font-semibold">Kontributor</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalContributors}</p>
            </div>
          </div>
        </div>
        {/* Card 3 - CHANGED: Total Published */}
        <div className={theme.card_small_purple}>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-purple-100">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-purple-600/80 text-sm font-semibold">Total Published</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPublished}</p>
            </div>
          </div>
        </div>
        {/* Card 4 */}
        <div className={theme.card_small_red}>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-red-100">
              <Eye className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-red-600/80 text-sm font-semibold">Ditampilkan</p>
              <p className="text-2xl font-bold text-gray-900">{stats.displayed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SEARCH & FILTER SECTION */}
      <div className="mb-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={theme.icon_search} />
          </div>

          <input
            type="text"
            placeholder="Cari berdasarkan nama dataset, pemilik, kategori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={theme.highlight_search}
          />
        </div>

        {/* Filter Header */}
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 ${theme.button_filter}`}
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Sembunyikan Filter" : "Tampilkan Filter"}
          </button>

          <button onClick={handleReset} className={`flex items-center gap-2 ${theme.button_reset}`}>
            <RefreshCw size={16} />
            Reset
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Kategori
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={theme.highlight_filter}
                >
                  {categories.map((cat, i) => (
                    <option key={i} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Tahun Upload
              </label>
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className={theme.highlight_filter}
                >
                  {years.map((y, i) => (
                    <option key={i} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. MAIN TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-visible relative">
        <div className="overflow-x-auto rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/80 border-b border-gray-100">
              <tr>
                <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Judul Dataset</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Info</th>

                <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors group">

                    {/* Column 1: Title & Info */}
                    <td className="px-6 py-5">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => setSelectedDataset(item)}
                          className="mt-1 text-gray-400 hover:text-blue-600 transition-colors shrink-0"
                          title="Lihat Detail"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <div>
                          <div className="font-bold text-gray-900">{item.title}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getTypeColor(item.category)}`}>
                              {item.category}
                            </span>
                            <span className="text-xs text-gray-400">ID: #{item.id}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Owner & Year */}
                    <td className="px-6 py-5">
                      <div className="text-sm font-medium text-gray-900">{item.owner}</div>
                      <div className="text-xs text-gray-500">Upload: {item.uploadDate}</div>
                    </td>



                    {/* Column 4: Status Badge */}
                    <td className="px-6 py-5">
                      {getStatusBadge(item.status)}
                    </td>

                    {/* Column 5: Action Dropdown */}
                    <td className="px-6 py-5 text-right relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId(openDropdownId === item.id ? null : item.id);
                        }}
                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>

                      {/* Dropdown Content */}
                      {openDropdownId === item.id && (
                        <div className="absolute right-8 top-12 w-52 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden text-left animate-in fade-in zoom-in-95 origin-top-right">
                          <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase bg-gray-50 border-b border-gray-100">
                            Kelola Data
                          </div>

                          {/* CASE: Pending (Belum diproses) */}
                          {item.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(item.id, 'approved')}
                                className="w-full px-4 py-2.5 text-sm text-green-600 hover:bg-green-50 flex items-center gap-2"
                              >
                                <span>✓</span> Setujui Publikasi
                              </button>
                              <button
                                onClick={() => handleStatusChange(item.id, 'rejected')}
                                className="w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-b border-gray-100"
                              >
                                <span>✕</span> Tolak
                              </button>
                            </>
                          )}

                          {/* CASE: Approved (Sudah Publish) -> Bisa dibatalkan */}
                          {item.status === 'approved' && (
                            <button
                              onClick={() => handleStatusChange(item.id, 'pending')}
                              className="w-full px-4 py-2.5 text-sm text-yellow-600 hover:bg-yellow-50 flex items-center gap-2 border-b border-gray-100"
                            >
                              <span>↩️</span> Batalkan Publikasi
                            </button>
                          )}

                          {/* CASE: Rejected (Ditolak) -> Bisa ditinjau ulang */}
                          {item.status === 'rejected' && (
                            <button
                              onClick={() => handleStatusChange(item.id, 'pending')}
                              className="w-full px-4 py-2.5 text-sm text-yellow-600 hover:bg-yellow-50 flex items-center gap-2 border-b border-gray-100"
                            >
                              <span>↩️</span> Tinjau Ulang
                            </button>
                          )}

                          {/* General Actions */}
                          <button
                            onClick={() => setSelectedDataset(item)}
                            className="w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <span>ℹ️</span> Lihat Detail
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-gray-100"
                          >
                            <span>🗑️</span> Hapus Permanen
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <HardDrive className="h-10 w-10 mb-2 opacity-50" />
                      <p>Tidak ada data ditemukan untuk filter ini.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. MODAL DETAIL POPUP */}
      {selectedDataset && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden transform transition-all scale-100">
            {/* Header Modal */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Detail Repositori</h3>
              <button
                onClick={() => setSelectedDataset(null)}
                className="text-gray-400 hover:text-gray-900 bg-white hover:bg-gray-200 rounded-full p-1 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content Modal */}
            <div className="p-6 space-y-4">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Judul Dataset</span>
                <p className="text-gray-900 font-bold text-lg leading-tight mt-1">{selectedDataset.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pemilik</span>
                  <p className="text-gray-700 text-sm mt-0.5 font-medium">{selectedDataset.owner}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kategori</span>
                  <div className="mt-1">
                    <span className={`text-xs px-2 py-1 rounded border font-semibold ${getTypeColor(selectedDataset.category)}`}>
                      {selectedDataset.category}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Deskripsi</span>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                  {selectedDataset.description}
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Link href={selectedDataset.pubLink} className="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-xl text-sm font-bold text-center hover:bg-gray-50 transition shadow-sm">
                  📄 Lihat Jurnal
                </Link>
                <Link href={selectedDataset.repoLink} className="flex-1 bg-black text-white py-2.5 rounded-xl text-sm font-bold text-center hover:bg-gray-800 transition shadow-lg shadow-gray-200">
                  ☁️ Buka Repositori
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}