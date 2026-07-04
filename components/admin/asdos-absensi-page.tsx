"use client";
import ModalConfirm from "@/components/ui/modal-confirm";
import { upsertActiveAbsensi } from "@/data/absensi";
import { theme } from "@/lib/theme";
import { TGetActiveAbsensi, TGetAsdoss } from "@/lib/types";
import { saveAs } from "file-saver";
import {
  AlertCircle,
  CheckCircle,
  Info,
  RefreshCw,
  Save,
  Search,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

interface AsdosData {
  npm: string;
  nama: string;
  prodi: string;
  matkul: string;
  semester: string;
  kelas: string[];
  pertemuan: Record<number, boolean>;
}

interface AsdosAbsensiPageProps {
  dataAsdoss: TGetAsdoss;
  dataAbsensiActive: TGetActiveAbsensi;
}

interface AbsensiRecord {
  pertemuanKe: number | null;
  waktuKehadiran: string | Date | null | undefined;
}

// Toast notification component
const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-500/20 border-green-500 text-green-100";
      case "error":
        return "bg-red-500/20 border-red-500 text-red-100";
      case "info":
        return "bg-blue-500/20 border-blue-500 text-blue-100";
      default:
        return "bg-gray-500/20 border-gray-500 text-gray-100";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={20} />;
      case "error":
        return <AlertCircle size={20} />;
      case "info":
        return <Info size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg border backdrop-blur-lg ${getToastStyles()} animate-in slide-in-from-top-5 duration-300`}
    >
      <div className="flex items-center gap-3">
        {getIcon()}
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 hover:opacity-70 transition-opacity"
        >
          <XCircle size={16} />
        </button>
      </div>
    </div>
  );
};

const AsdosAbsensiPage = ({
  dataAsdoss,
  dataAbsensiActive,
}: AsdosAbsensiPageProps) => {
  // Multi-selection state management
  const [savedPertemuan, setSavedPertemuan] = useState<number[]>(
    dataAbsensiActive?.pertemuanActive || []
  );
  const [tempPertemuan, setTempPertemuan] = useState<number[]>(
    dataAbsensiActive?.pertemuanActive || []
  );

  // Common states
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    prodi: "Semua",
    matkul: "Semua",
    semester: "Semua",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  // Check if there are unsaved changes
  const hasChanges =
    JSON.stringify([...savedPertemuan].sort()) !==
    JSON.stringify([...tempPertemuan].sort());

  // Multi-selection handlers
  const handlePertemuanClick = (pertemuan: number) => {
    setTempPertemuan((prev) => {
      if (prev.includes(pertemuan)) {
        return prev.filter((p) => p !== pertemuan);
      } else {
        return [...prev, pertemuan];
      }
    });
  };

  // Select/Deselect All handler
  const handleSelectAll = () => {
    if (tempPertemuan.length === 16) {
      setTempPertemuan([]);
    } else {
      setTempPertemuan(Array.from({ length: 16 }, (_, i) => i + 1));
    }
  };

  const handleCancel = () => {
    setTempPertemuan(savedPertemuan);
  };

  const handleSave = () => {
    setModalOpen(true);
  };

  const handleConfirmSave = async () => {
    setIsLoading(true);
    try {
      const result = await upsertActiveAbsensi(tempPertemuan);

      if (result?.success) {
        setSavedPertemuan(tempPertemuan);
        setToast({
          message: "Perubahan berhasil disimpan!",
          type: "success",
        });
      } else {
        setToast({
          message: result?.error || "Gagal menyimpan perubahan",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error saving pertemuan:", error);
      setToast({
        message: "Terjadi kesalahan saat menyimpan data",
        type: "error",
      });
    } finally {
      setIsLoading(false);
      setModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    if (!isLoading) {
      setModalOpen(false);
    }
  };

  // Helper function to convert absensi records to pertemuan format
  const convertAbsensiToPertemuan = (
    absensiRecords: AbsensiRecord[]
  ): Record<number, boolean> => {
    const pertemuan: Record<number, boolean> = {};

    // Initialize all 16 pertemuan as false
    for (let i = 1; i <= 16; i++) {
      pertemuan[i] = false;
    }

    // Mark attended pertemuan as true
    absensiRecords.forEach((absensi) => {
      if (absensi.pertemuanKe && absensi.waktuKehadiran) {
        pertemuan[absensi.pertemuanKe] = true;
      }
    });

    return pertemuan;
  };

  const handleDownloadExcel = () => {
    const header = [
      "NAMA ASISTEN",
      "MATA KULIAH",
      "NPM",
      ...Array.from({ length: 16 }, (_, i) => `Pertemuan ${i + 1}`),
      "TOTAL HADIR",
      "PERSENTASE",
      "KETERANGAN",
    ];

    const rows = flattenedData.map((item) => {
      const hadir = Object.values(item.pertemuan).filter((v) => v).length;
      const persentase = ((hadir / 16) * 100).toFixed(0) + "%";

      return [
        item.nama,
        `${item.prodi} - ${item.matkul} - Semester ${item.semester}`,
        item.npm,
        ...Array.from({ length: 16 }, (_, i) =>
          item.pertemuan[i + 1] ? "✔" : "-"
        ),
        hadir,
        persentase,
        hadir === 16 ? "LENGKAP" : hadir === 0 ? "TIDAK HADIR" : "",
      ];
    });

    const worksheet = XLSX.utils.aoa_to_sheet([header, ...rows]);

    // Auto column width
    const colWidths = header.map(() => ({ wch: 15 }));
    worksheet["!cols"] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Absensi Asdos");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "Rekap Absensi Asdos.xlsx");
  };

  // Render buttons for pertemuan selection
  const renderButtons = () =>
    Array.from({ length: 16 }, (_, i) => (
      <button
        key={i}
        onClick={() => handlePertemuanClick(i + 1)}
        className={`cursor-pointer px-3 py-1 rounded text-sm transition-all duration-150 ${
          tempPertemuan.includes(i + 1)
            ? `${theme.button_default_small}`
            : `${theme.button_default_small_reversed}`
        }`}
      >
        {i + 1}
      </button>
    ));

  // Helper function to group consecutive numbers into ranges
  function groupToRanges(numbers: number[]): string[] {
    if (numbers.length === 0) return [];
    const sorted = [...numbers].sort((a, b) => a - b);
    const ranges: string[] = [];
    let start = sorted[0];
    let end = sorted[0];

    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] === end + 1) {
        end = sorted[i];
      } else {
        ranges.push(start === end ? `${start}` : `${start}-${end}`);
        start = end = sorted[i];
      }
    }
    ranges.push(start === end ? `${start}` : `${start}-${end}`);
    return ranges;
  }

  // Render attendance status
  const renderAbsensi = (pertemuan: Record<number, boolean>) => {
    const totalPertemuan = 16;
    const hadir = Object.entries(pertemuan)
      .filter((entry) => entry[1])
      .map((entry) => Number(entry[0]));

    if (hadir.length === 0) return "Belum Ada";
    if (hadir.length === totalPertemuan) return "Lengkap";

    const rentang = groupToRanges(hadir);
    return rentang.join(", ");
  };

  // Transform data - FLATTEN per mata kuliah
  const flattenedData: AsdosData[] =
    dataAsdoss?.flatMap((item) => {
      const results: AsdosData[] = [];

      // Group classAsdos by mata kuliah
      const matkulGroups = new Map<string, typeof item.classAsdos>();

      item.classAsdos.forEach((ca) => {
        const matkulName = ca.class?.course?.name || "-";
        if (!matkulGroups.has(matkulName)) {
          matkulGroups.set(matkulName, []);
        }
        matkulGroups.get(matkulName)!.push(ca);
      });

      // Create one entry per mata kuliah
      matkulGroups.forEach((classAsdosGroup, matkulName) => {
        const prodi =
          classAsdosGroup[0]?.class?.course?.semester?.prodi?.name || "-";
        const semester =
          classAsdosGroup[0]?.class?.course?.semester?.semesterNumber?.toString() ||
          "-";

        const kelas = [
          ...new Set(
            classAsdosGroup.map((ca) => ca.class?.name).filter(Boolean)
          ),
        ] as string[];

        // Collect absensi for this mata kuliah only
        const allAbsensi: AbsensiRecord[] = classAsdosGroup.flatMap(
          (ca) =>
            ca.absensi?.map((abs) => ({
              pertemuanKe: abs.pertemuanKe,
              waktuKehadiran: abs.waktuKehadiran,
            })) || []
        );

        results.push({
          npm: item.npm,
          nama: item.user?.name || "-",
          prodi,
          matkul: matkulName,
          semester,
          kelas: kelas.length > 0 ? kelas : ["-"],
          pertemuan: convertAbsensiToPertemuan(allAbsensi),
        });
      });

      return results;
    }) || [];

  // Extract unique values for filter options
  const allProdi = [
    "Semua",
    ...new Set(
      flattenedData.map((item) => item.prodi).filter((p) => p !== "-")
    ),
  ];

  const allMatkul = [
    "Semua",
    ...new Set(
      flattenedData.map((item) => item.matkul).filter((m) => m !== "-")
    ),
  ];

  const allSemester = [
    "Semua",
    ...new Set(
      flattenedData.map((item) => item.semester).filter((s) => s !== "-")
    ),
  ];

  // Filter data based on search query and filters
  const filteredData = flattenedData.filter((item) => {
    const prodiMatch =
      filters.prodi === "Semua" || item.prodi === filters.prodi;
    const matkulMatch =
      filters.matkul === "Semua" || item.matkul === filters.matkul;
    const semesterMatch =
      filters.semester === "Semua" || item.semester === filters.semester;
    const searchMatch =
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.npm.toLowerCase().includes(searchQuery.toLowerCase());

    return prodiMatch && matkulMatch && semesterMatch && searchMatch;
  });

  const handleReset = () => {
    setFilters({ prodi: "Semua", matkul: "Semua", semester: "Semua" });
    setSearchQuery("");
  };

  const totalPertemuan = 16;
  const areAllSelected = tempPertemuan.length === totalPertemuan;

  // Helper function to render array values as badges
  const renderArrayAsBadges = (items: string[], colorClass: string) => {
    if (items.length === 1 && items[0] === "-") {
      return <span className={`${theme.text_default_light}`}>-</span>;
    }

    if (items.length <= 2) {
      return (
        <div className="flex flex-wrap gap-1">
          {items.map((item, idx) => (
            <span
              key={idx}
              className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}
            >
              {item}
            </span>
          ))}
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-1">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}
        >
          {items[0]}
        </span>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium bg-gray-500/20 ${theme.text_default}`}
        >
          +{items.length - 1} lainnya
        </span>
      </div>
    );
  };

  // Group data by NPM for rowspan calculation
  const groupedByNpm = filteredData.reduce(
    (acc, item) => {
      if (!acc[item.npm]) {
        acc[item.npm] = [];
      }
      acc[item.npm].push(item);
      return acc;
    },
    {} as Record<string, AsdosData[]>
  );

  return (
    <div className="min-h-screen text-white p-4 lg:p-6 lg:ml-64">
      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${theme.text_title}`}>
          Data Absensi Asisten Dosen
        </h1>
        <p className={`${theme.text_default} text-lg`}>
          Menampilkan {filteredData?.length || 0} baris data dari{" "}
          {Object.keys(groupedByNpm).length || 0} asdos
        </p>
      </div>

      {/* Pilih Pertemuan Aktif */}
      <div className="mb-6">
        <div className="mb-4">
          <h2 className={`text-xl font-semibold mb-3 ${theme.text_default}`}>
            Pilih Pertemuan Aktif
          </h2>

          {/* Select All / Deselect All button */}
          <div className="mb-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <button
              onClick={handleSelectAll}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                areAllSelected
                  ? `${theme.button_cancel}`
                  : `${theme.button_square_pressed_blue}`
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {areAllSelected ? "Batalkan Semua" : "Pilih Semua"}
            </button>

            <p
              className={`text-sm ${theme.text_default} ${theme.border_default}`}
            >
              {areAllSelected
                ? "✅ Semua pertemuan dipilih"
                : tempPertemuan.length > 0
                  ? `📍 ${tempPertemuan.length} pertemuan dipilih: ${[...tempPertemuan].sort((a, b) => a - b).join(", ")}`
                  : "📌 Belum ada pertemuan yang dipilih"}
            </p>
          </div>
        </div>

        {/* Mobile View: Collapsible */}
        <details className="lg:hidden group mb-4">
          <summary
            className={`${theme.highlight_filter} cursor-pointer list-none`}
          >
            <div className="flex items-center justify-between">
              <span>Tombol Pertemuan</span>
              <div className="group-open:rotate-180 transition-transform duration-200">
                ▼
              </div>
            </div>
          </summary>
          <div className="mt-4 rounded-lg border border-white/20 bg-black/20 p-4">
            <div className="grid grid-cols-4 gap-3">{renderButtons()}</div>
          </div>
        </details>

        {/* Desktop View: Always visible */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-8 xl:grid-cols-16 gap-3">
            {renderButtons()}
          </div>
        </div>
      </div>

      {/* Save/Cancel buttons */}
      {hasChanges && (
        <div
          className={`mb-6 flex flex-col items-center gap-4 rounded-xl border p-6 lg:flex-row ${theme.hover_glow_light} shadow-md`}
        >
          <div className="flex items-center gap-3 flex-grow">
            <AlertCircle className={`${theme.text_title}`} size={24} />
            <div>
              <p className={`font-semibold ${theme.text_default}`}>
                Perubahan Belum Disimpan
              </p>
              <p
                className={`text-sm ${theme.text_default} ${theme.border_default}`}
              >
                Anda memiliki{" "}
                {Math.abs(tempPertemuan.length - savedPertemuan.length)}{" "}
                perubahan yang belum disimpan
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className={`${theme.button_cancel} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <XCircle size={18} />
              Batal
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className={`${theme.button_save} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Save size={18} />
              {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      )}

      {/* Filter Section */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={`${theme.icon_search}`} />
          </div>
          <input
            type="text"
            placeholder="Cari berdasarkan NPM atau nama..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`${theme.highlight_search}`}
          />
        </div>

        <div
          className={`${theme.text_default} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 `}
        >
          <div>
            <label
              className={`block text-sm font-medium ${theme.border_default} mb-2`}
            >
              Filter Prodi
            </label>
            <select
              value={filters.prodi}
              onChange={(e) =>
                setFilters({ ...filters, prodi: e.target.value })
              }
              className={`${theme.highlight_filter}`}
            >
              {allProdi.map((prodi, i) => (
                <option key={i} value={prodi}>
                  {prodi}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${theme.border_default} mb-2`}
            >
              Filter Mata Kuliah
            </label>
            <select
              value={filters.matkul}
              onChange={(e) =>
                setFilters({ ...filters, matkul: e.target.value })
              }
              className={`${theme.highlight_filter}`}
            >
              {allMatkul.map((matkul, i) => (
                <option key={i} value={matkul}>
                  {matkul}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${theme.border_default} mb-2`}
            >
              Filter Semester
            </label>
            <select
              value={filters.semester}
              onChange={(e) =>
                setFilters({ ...filters, semester: e.target.value })
              }
              className={`${theme.highlight_filter}`}
            >
              {allSemester.map((smt, i) => (
                <option key={i} value={smt}>
                  {smt}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-3">
            <button
              onClick={handleReset}
              className={`${theme.button_reset} justify-center`}
            >
              <RefreshCw size={16} />
              Reset
            </button>
            <button
              onClick={handleDownloadExcel}
              className={`${theme.button_save} flex items-center gap-2`}
            >
              Generate Excel
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table
          className={`min-w-full table-auto text-sm ${theme.border_default}`}
        >
          <thead className={`${theme.table_header} text-white`}>
            <tr>
              <th className="px-4 py-4 text-left font-semibold">NPM</th>
              <th className="px-4 py-4 text-left font-semibold">Nama</th>
              <th className="px-4 py-4 text-left font-semibold">Prodi</th>
              <th className="px-4 py-4 text-left font-semibold">Mata Kuliah</th>
              <th className="px-4 py-4 text-center font-semibold">Semester</th>
              <th className="px-4 py-4 text-center font-semibold">Kelas</th>
              <th className="px-4 py-4 text-left font-semibold">
                Pertemuan Hadir
              </th>
              <th className="px-4 py-4 text-center font-semibold">Detail</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedByNpm).map(([npm, items]) =>
              items.map((item, idx) => (
                <tr
                  key={`${npm}-${idx}`}
                  className={`border-b ${theme.text_default} ${theme.border_table_default} ${theme.table_highlight} hover:bg-white/5 transition-colors duration-200`}
                >
                  {idx === 0 && (
                    <>
                      <td className="px-4 py-4" rowSpan={items.length}>
                        {item.npm}
                      </td>
                      <td
                        className="px-4 py-4 font-medium"
                        rowSpan={items.length}
                      >
                        {item.nama}
                      </td>
                    </>
                  )}
                  <td className="px-4 py-4">{item.prodi}</td>
                  <td className="px-4 py-4">{item.matkul}</td>
                  <td className="px-4 py-4 text-center">{item.semester}</td>
                  <td className="px-4 py-4 min-w-28">
                    <div className="flex flex-wrap justify-center gap-1">
                      {renderArrayAsBadges(item.kelas, "")}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          renderAbsensi(item.pertemuan) === "Lengkap"
                            ? `${theme.status_accepted}`
                            : renderAbsensi(item.pertemuan) === "Belum Ada"
                              ? `${theme.status_rejected}`
                              : `${theme.text_default}`
                        }`}
                      >
                        {renderAbsensi(item.pertemuan)}
                      </span>
                    </div>
                  </td>
                  {idx === 0 && (
                    <td
                      className="px-4 py-4 text-center"
                      rowSpan={items.length}
                    >
                      <Link
                        href={`/admin/asdos/absensi/detail/${item.npm}`}
                        className={`inline-flex items-center gap-1 ${theme.text_default_blue} hover:underline font-medium`}
                      >
                        Lihat Detail
                      </Link>
                    </td>
                  )}
                </tr>
              ))
            )}
            {filteredData.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className={`text-center py-8 ${theme.border_default}`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Search className={`${theme.text_title}`} size={48} />
                    <p className={`text-lg font-medium ${theme.text_default}`}>
                      Tidak ada data yang cocok
                    </p>
                    <p className="text-sm text-gray-400">
                      Coba ubah kriteria pencarian Anda
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ModalConfirm
        isOpen={modalOpen}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmSave}
        title="Konfirmasi Simpan Perubahan"
        message={`Apakah Anda yakin ingin menyimpan ${tempPertemuan.length} pertemuan aktif yang telah dipilih?`}
        loading={isLoading}
      />
    </div>
  );
};

export default AsdosAbsensiPage;
