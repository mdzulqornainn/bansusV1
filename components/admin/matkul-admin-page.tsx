"use client";

import ButtonIcon from "@/components/ui/button-icon";
import { FormMessage } from "@/components/ui/form/message";
import { deleteCourse } from "@/data/courses";
import { theme } from "@/lib/theme";
import { TGetCourses, TGetProdis } from "@/lib/types";
import {
  Filter,
  Info,
  Pen,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import ModalConfirm from "../ui/modal-confirm";

interface MatkulAdminPageProps {
  dataCourses: TGetCourses;
  dataProdis: TGetProdis;
}

const MatkulAdminPage = ({ dataCourses, dataProdis }: MatkulAdminPageProps) => {
  const [message, setMessage] = useState<string>("");
  const [selectedProdi, setSelectedProdi] = useState(
    dataProdis && dataProdis.length > 0 ? dataProdis[0] : null
  );
  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);
  const [selectedField, setSelectedField] = useState({
    id: "",
    prodi: "",
    code: "",
    name: "",
    sks: 0,
    semester: 0,
    kuota: 0,
    status: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [daftarMatkul, setDaftarMatkul] = useState(
    dataCourses?.map((item) => ({
      id: item.id,
      prodi: item.semester.prodi.name,
      code: item.code,
      name: item.name,
      sks: item.sks,
      semester: item.semester.semesterNumber,
      kuota: item.kuota,
      status: item.status,
      pelamar: item.courseApplication.length,
    })) || []
  );

  // State untuk filter dan search
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("semua");
  const [semesterFilter, setSemesterFilter] = useState<string>("semua");
  const [sksFilter, setSksFilter] = useState<string>("semua");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Fungsi untuk reset semua filter
  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("semua");
    setSemesterFilter("semua");
    setSksFilter("semua");
  };

  // Fungsi untuk filter dan search data
  const filteredMatkul = useMemo(() => {
    let filtered = daftarMatkul.filter(
      (matkul) => matkul.prodi === selectedProdi?.name
    );

    // Filter berdasarkan search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (matkul) =>
          matkul.code.toLowerCase().includes(query) ||
          matkul.name.toLowerCase().includes(query)
      );
    }

    // Filter berdasarkan status
    if (statusFilter !== "semua") {
      filtered = filtered.filter((matkul) => matkul.status === statusFilter);
    }

    // Filter berdasarkan semester
    if (semesterFilter !== "semua") {
      filtered = filtered.filter(
        (matkul) => matkul.semester.toString() === semesterFilter
      );
    }

    // Filter berdasarkan SKS
    if (sksFilter !== "semua") {
      filtered = filtered.filter(
        (matkul) => matkul.sks?.toString() === sksFilter
      );
    }

    return filtered;
  }, [
    daftarMatkul,
    selectedProdi,
    searchQuery,
    statusFilter,
    semesterFilter,
    sksFilter,
  ]);

  // Get unique values untuk filter options
  const uniqueSemesters = useMemo(() => {
    const semesters = daftarMatkul
      .filter((matkul) => matkul.prodi === selectedProdi?.name)
      .map((matkul) => matkul.semester);
    return [...new Set(semesters)].sort((a, b) => a - b);
  }, [daftarMatkul, selectedProdi]);

  const uniqueSks = useMemo(() => {
    const sks = daftarMatkul
      .filter((matkul) => matkul.prodi === selectedProdi?.name)
      .map((matkul) => matkul.sks);
    return [...new Set(sks)].sort((a, b) => (a || 0) - (b || 0));
  }, [daftarMatkul, selectedProdi]);

  const handleDeleteMatkul = async (id: string) => {
    setLoading(true);
    await deleteCourse(id)
      .then((res) => {
        if (res.error) {
          setMessage(res.error);
        } else if (res.success) {
          setMessage(res.success);
          setDaftarMatkul(daftarMatkul.filter((item) => item.id !== id));
        }
      })
      .catch((err) => {
        setMessage(err.message);
      })
      .finally(() => {
        setModalDeleteOpen(false);
        setLoading(false);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });
  };

  return (
    <div className="lg:ml-64">
      <div className="p-6">
        <div className="mb-6">
          <h1 className={`text-2xl font-bold ${theme.text_title} mb-2`}>
            Data Mata Kuliah - {selectedProdi?.name}
          </h1>
          <p className={`${theme.text_default_light} text-sm`}>
            Pilih prodi untuk melihat daftar mata kuliah berdasarkan program
            studi.
          </p>
        </div>

        {/* Prodi Tabs & Add Button */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-3">
            {dataProdis?.map((prodi) => (
              <button
                key={prodi.id}
                onClick={() => {
                  setSelectedProdi(prodi);
                  resetFilters(); // Reset filters saat ganti prodi
                }}
                className={`cursor-pointer px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                  selectedProdi === prodi
                    ? `${theme.button_selection}`
                    : `bg-gray-800/30 ${theme.text_default} hover:bg-gray-700/30`
                }`}
              >
                {prodi.name}
              </button>
            ))}
          </div>

          <Link href="/admin/matakuliah/add" className={`${theme.button_add}`}>
            <span>Tambah</span>
            <Plus className="w-5 h-5" />
          </Link>
        </div>

        {/* Search dan Filter Section */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className={`${theme.icon_search}`} />
            </div>
            <input
              type="text"
              placeholder="Cari berdasarkan kode atau nama mata kuliah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`${theme.highlight_search}`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={`absolute inset-y-0 right-0 pr-3 flex items-center ${theme.text_default} hover:text-white`}
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Filter Toggle Button */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center ${theme.button_filter}`}
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
              {(statusFilter !== "semua" ||
                semesterFilter !== "semua" ||
                sksFilter !== "semua") && (
                <span
                  className={`${theme.button_selection} text-xs px-2 py-1 rounded-full`}
                >
                  Aktif
                </span>
              )}
            </button>

            {/* Reset Filter Button */}
            {(searchQuery ||
              statusFilter !== "semua" ||
              semesterFilter !== "semua" ||
              sksFilter !== "semua") && (
              <button
                onClick={resetFilters}
                className={`${theme.button_reset}`}
              >
                <RefreshCw size={16} />
                Reset
              </button>
            )}
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Status Filter */}
              <div>
                <label
                  className={`block text-sm font-medium ${theme.text_default} mb-2`}
                >
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`${theme.highlight_filter}`}
                >
                  <option value="semua">Semua Status</option>
                  <option value="aktif">Aktif</option>
                  <option value="tidak aktif">Tidak Aktif</option>
                </select>
              </div>

              {/* Semester Filter */}
              <div>
                <label
                  className={`block text-sm font-medium ${theme.text_default} mb-2`}
                >
                  Semester
                </label>
                <select
                  value={semesterFilter}
                  onChange={(e) => setSemesterFilter(e.target.value)}
                  className={`${theme.highlight_filter}`}
                >
                  <option value="semua">Semua Semester</option>
                  {uniqueSemesters.map((semester) => (
                    <option key={semester} value={semester.toString()}>
                      Semester {semester}
                    </option>
                  ))}
                </select>
              </div>

              {/* SKS Filter */}
              <div>
                <label
                  className={`block text-sm font-medium ${theme.text_default} mb-2`}
                >
                  SKS
                </label>
                <select
                  value={sksFilter}
                  onChange={(e) => setSksFilter(e.target.value)}
                  className={`${theme.highlight_filter}`}
                >
                  <option value="semua">Semua SKS</option>
                  {uniqueSks.map((sks) => (
                    <option key={sks} value={sks?.toString()}>
                      {sks} SKS
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className={`text-sm ${theme.text_default}`}>
            Menampilkan {filteredMatkul.length} dari{" "}
            {daftarMatkul.filter((m) => m.prodi === selectedProdi?.name).length}{" "}
            mata kuliah
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow-lg">
          {message && (
            <FormMessage message={message} className="mb-4" type="warning" />
          )}
          <table
            className={`w-full table-auto text-sm text-center ${theme.text_default}`}
          >
            <thead className={`${theme.table_header} text-white`}>
              <tr>
                <th className="px-6 py-4">Code & Nama Matkul</th>
                <th className="px-6 py-4">SKS</th>
                <th className="px-6 py-4">Semester</th>
                <th className="px-6 py-4">Kuota</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Pelamar</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredMatkul && filteredMatkul.length > 0 ? (
                filteredMatkul.map((matkul) => (
                  <tr
                    key={matkul.id}
                    className={`border-b ${theme.border_table_default} ${theme.table_highlight}`}
                  >
                    <td className={`px-6 py-4 font-medium ${theme.text_default} text-left`}>
                      <div>{matkul.code}</div>
                      <div
                        className={`text-sm ${theme.text_default_light} text-left`}
                      >
                        {matkul.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">{matkul.sks}</td>
                    <td className="px-6 py-4">{matkul.semester}</td>
                    <td className="px-6 py-4">{matkul.kuota}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-semibold ${
                          matkul.status === "aktif"
                            ? `${theme.status_accepted}`
                            : `${theme.status_rejected}`
                        }`}
                      >
                        {matkul.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{matkul.pelamar}</td>
                    <td className="px-6 py-4">
                      <div
                        className={`flex items-center justify-center ${theme.text_default} gap-6`}
                      >
                        <Link href={`/admin/matakuliah/detail/${matkul.id}`}>
                          <ButtonIcon
                            title="Detail"
                            className="hover:text-yellow-400"
                            icon={<Info size={18} />}
                          />
                        </Link>
                        <Link href={`/admin/matakuliah/edit/${matkul.id}`}>
                          <ButtonIcon
                            title="Edit"
                            className="hover:text-blue-400"
                            icon={<Pen size={18} />}
                          />
                        </Link>
                        <ButtonIcon
                          title="Hapus"
                          className="hover:text-red-500"
                          onClick={() => {
                            setModalDeleteOpen(true);
                            setSelectedField(matkul as any); // eslint-disable-line @typescript-eslint/no-explicit-any
                          }}
                          icon={<Trash2 size={18} />}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center">
                    <div
                      className={`flex flex-col items-center justify-center ${theme.text_default}`}
                    >
                      <Search className="h-12 w-12 mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">
                        Tidak ada data ditemukan
                      </p>
                      <p className="text-sm">
                        {searchQuery ||
                        statusFilter !== "semua" ||
                        semesterFilter !== "semua" ||
                        sksFilter !== "semua"
                          ? "Coba ubah kriteria pencarian atau filter Anda"
                          : "Tidak ada mata kuliah untuk prodi ini"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ModalConfirm
        handleClose={() => setModalDeleteOpen(false)}
        handleConfirm={() => handleDeleteMatkul(selectedField.id)}
        isOpen={modalDeleteOpen}
        loading={loading}
        title="Hapus matakuliah ini?"
        message={`Apakah Anda yakin ingin menghapus ${selectedField.name}?`}
      />
    </div>
  );
};

export default MatkulAdminPage;
