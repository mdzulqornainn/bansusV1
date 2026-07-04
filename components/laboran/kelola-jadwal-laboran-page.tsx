"use client";

import { TGetClasses } from "@/lib/types";
import {
  RefreshCw,
  Search,
  Filter,
  Users,
  BookOpen,
  GraduationCap,
  Eye,
  Info,
  Pen,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import ButtonIcon from "../ui/button-icon";
import { theme } from "@/lib/theme";

// Tipe untuk data yang sudah dikelompokkan
interface GroupedClass {
  class: {
    id: string;
    name: string;
    jadwal: {
      id: string;
      hari: string;
      mulai: string;
      selesai: string;
      ruangan: string;
    };
    course: {
      id: string;
      name: string;
      code: string;
      semester: {
        id: string;
        semesterNumber: number;
        prodi: {
          id: string;
          name: string;
        };
      };
    };
  };
  asdos: Array<{
    npm: string;
    name: string;
  }>;
  dosen: Array<{
    nip: string;
    name: string;
  }>;
}

interface KelolaJadwalLaboranPageProps {
  dataClasses: TGetClasses;
}

const KelolaJadwalLaboranPage = ({
  dataClasses,
}: KelolaJadwalLaboranPageProps) => {
  // States
  const [selectedProdi, setSelectedProdi] = useState("Semua");
  const [selectedMatkul, setSelectedMatkul] = useState("Semua");
  const [selectedSemester, setSelectedSemester] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Fungsi untuk mengelompokkan data berdasarkan kelas
  const groupByClass = (data: TGetClasses): GroupedClass[] => {
    if (!data || data.length === 0) return [];

    return data.map((classItem) => ({
      class: {
        id: classItem.id,
        name: classItem.name,
        jadwal: {
          id: classItem?.jadwalPraktikum?.id || "",
          hari: classItem?.jadwalPraktikum?.hari || "",
          mulai: classItem?.jadwalPraktikum?.mulai || "",
          selesai: classItem?.jadwalPraktikum?.selesai || "",
          ruangan: classItem?.jadwalPraktikum?.ruangan || "",
        },
        course: {
          id: classItem?.course?.id || "",
          name: classItem?.course?.name || "Mata Kuliah Tidak Tersedia",
          code: classItem.course?.code || "Kode Mata Kuliah Tidak Tersedia",
          semester: {
            id: classItem?.course?.semester?.id || "",
            semesterNumber: classItem?.course?.semester?.semesterNumber || 0,
            prodi: {
              id: classItem?.course?.semester?.prodi.id || "",
              name:
                classItem?.course?.semester?.prodi.name ||
                "Prodi Tidak Tersedia",
            },
          },
        },
      },
      asdos:
        classItem.classAsdos?.map((classAsdos) => ({
          npm: classAsdos.asdos.npm,
          name: classAsdos.asdos.user.name || "Nama tidak tersedia",
        })) || [],
      dosen:
        classItem.classDosen?.map((classDosen) => ({
          nip: classDosen.dosen.nip,
          name: classDosen.dosen.namaDosen || "Nama tidak tersedia",
        })) || [],
    }));
  };

  const groupedKelas = useMemo(() => groupByClass(dataClasses), [dataClasses]);

  // Generate unique options for filters
  const filterOptions = useMemo(() => {
    const prodi = [
      ...new Set(groupedKelas.map((k) => k.class.course.semester.prodi.name)),
    ].filter(Boolean);
    const matkul = [
      ...new Set(groupedKelas.map((k) => k.class.course.name)),
    ].filter(Boolean);
    const semester = [
      ...new Set(
        groupedKelas.map((k) =>
          k.class.course.semester.semesterNumber.toString()
        )
      ),
    ].filter(Boolean);

    return {
      prodi: ["Semua", ...prodi.sort()],
      matkul: ["Semua", ...matkul.sort()],
      semester: [
        "Semua",
        ...semester.sort((a, b) => parseInt(a) - parseInt(b)),
      ],
    };
  }, [groupedKelas]);

  // Improved filtering logic
  const filteredKelas = useMemo(() => {
    return groupedKelas.filter((k) => {
      // Filter checks
      const matchesProdi =
        selectedProdi === "Semua" ||
        k.class.course.semester.prodi.name === selectedProdi;
      const matchesMatkul =
        selectedMatkul === "Semua" || k.class.course.name === selectedMatkul;
      const matchesSemester =
        selectedSemester === "Semua" ||
        k.class.course.semester.semesterNumber.toString() === selectedSemester;

      // Enhanced search functionality
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        searchTerm === "" ||
        [
          // Search in class info
          k.class.name,
          k.class.course.name,
          k.class.course.semester.prodi.name,
          k.class.course.semester.semesterNumber.toString(),
          // Search in asdos
          ...k.asdos.map((asdos) => `${asdos.name} ${asdos.npm}`),
          // Search in dosen
          ...k.dosen.map((dosen) => `${dosen.name} ${dosen.nip}`),
        ].some((field) => field.toLowerCase().includes(searchLower));

      return matchesProdi && matchesMatkul && matchesSemester && matchesSearch;
    });
  }, [
    groupedKelas,
    selectedProdi,
    selectedMatkul,
    selectedSemester,
    searchTerm,
  ]);

  const handleReset = () => {
    setSelectedProdi("Semua");
    setSelectedMatkul("Semua");
    setSelectedSemester("Semua");
    setSearchTerm("");
  };

  // Statistics
  const stats = useMemo(() => {
    const totalAsdos = groupedKelas.reduce((sum, k) => sum + k.asdos.length, 0);
    const totalDosen = groupedKelas.reduce((sum, k) => sum + k.dosen.length, 0);
    const kelasWithoutAsdos = groupedKelas.filter(
      (k) => k.asdos.length === 0
    ).length;

    return { totalAsdos, totalDosen, kelasWithoutAsdos };
  }, [groupedKelas]);

  return (
    <div className="min-h-screen p-6 lg:ml-64">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <GraduationCap className={`h-8 w-8 ${theme.text_title}`} />
          <h1 className={`text-3xl font-bold ${theme.text_title}`}>
            Data Jadwal Praktikum
          </h1>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`${theme.card_small_blue}`}>
            <div className="flex items-center gap-3">
              <BookOpen className={`h-6 w-6 ${theme.text_title}`} />
              <div>
                <p className={`${theme.text_title} text-sm`}>Total Kelas</p>
                <p className={`text-2xl font-bold ${theme.text_title}`}>
                  {groupedKelas.length}
                </p>
              </div>
            </div>
          </div>

          <div className={`${theme.card_small_green}`}>
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-green-400" />
              <div>
                <p className="text-green-400 text-sm">Total Asdos</p>
                <p className="text-2xl font-bold text-green-500">
                  {stats.totalAsdos}
                </p>
              </div>
            </div>
          </div>

          <div className={`${theme.card_small_purple}`}>
            <div className="flex items-center gap-3">
              <GraduationCap className="h-6 w-6 text-purple-500" />
              <div>
                <p className="text-purple-500 text-sm">Total Dosen</p>
                <p className="text-2xl font-bold text-purple-500">
                  {stats.totalDosen}
                </p>
              </div>
            </div>
          </div>

          <div className={`${theme.card_small_red}`}>
            <div className="flex items-center gap-3">
              <Eye className="h-6 w-6 text-red-500" />
              <div>
                <p className="text-red-500 text-sm">Ditampilkan</p>
                <p className="text-2xl font-bold text-red-500">
                  {filteredKelas.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={`${theme.icon_search}`} />
          </div>
          <input
            type="text"
            placeholder="Cari berdasarkan nama kelas, mata kuliah, prodi, NPM, nama asdos/dosen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${theme.highlight_search}`}
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center ${theme.button_filter}`}
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Sembunyikan Filter" : "Tampilkan Filter"}
          </button>

          <button onClick={handleReset} className={`${theme.button_reset}`}>
            <RefreshCw size={16} />
            Reset
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Prodi */}
            <div>
              <label className={`block text-sm font-medium ${theme.text_default} mb-2`}>
                Program Studi
              </label>
              <select
                value={selectedProdi}
                onChange={(e) => setSelectedProdi(e.target.value)}
                className={`${theme.highlight_filter}`}
              >
                {filterOptions.prodi.map((prodi, i) => (
                  <option
                    key={i}
                    value={prodi}
                    className="bg-slate-800 text-white"
                  >
                    {prodi}
                  </option>
                ))}
              </select>
            </div>

            {/* Mata Kuliah */}
            <div>
              <label className={`block text-sm font-medium ${theme.text_default} mb-2`}>
                Mata Kuliah
              </label>
              <select
                value={selectedMatkul}
                onChange={(e) => setSelectedMatkul(e.target.value)}
                className={`${theme.highlight_filter}`}
              >
                {filterOptions.matkul.map((matkul, i) => (
                  <option
                    key={i}
                    value={matkul}
                    className="bg-slate-800 text-white"
                  >
                    {matkul}
                  </option>
                ))}
              </select>
            </div>

            {/* Semester */}
            <div>
              <label className={`block text-sm font-medium ${theme.text_default} mb-2`}>
                Semester
              </label>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className={`${theme.highlight_filter}`}
              >
                {filterOptions.semester.map((smt, i) => (
                  <option
                    key={i}
                    value={smt}
                    className="bg-slate-800 text-white"
                  >
                    {smt === "Semua" ? "Semua Semester" : `Semester ${smt}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table
          className={`w-full table-auto text-sm text-center ${theme.text_default}`}
        >
          <thead className={`${theme.table_header} text-white`}>
            <tr>
              <th className="px-4 py-4 text-center">No</th>
              <th className="px-4 py-4">Nama Kelas</th>
              <th className="px-4 py-4">Program Studi</th>
              <th className="px-4 py-4">Mata Kuliah</th>
              <th className="px-4 py-4">Asisten Dosen</th>
              <th className="px-4 py-4">Dosen Pengampu</th>
              <th className="px-4 py-4">Jadwal</th>
              <th className="px-4 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredKelas.map((classData, idx) => (
              <tr
                key={classData.class.id}
                className={`border-b ${theme.border_table_default} ${theme.table_highlight}`}
              >
                <td className="px-4 py-4 text-center">{idx + 1}</td>
                <td className="px-4 py-4">
                  <div>{classData.class.name}</div>
                  <div className={`text-xs ${theme.text_default_light}`}>
                    ID: {classData.class.id}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>{classData.class.course.semester.prodi.name}</div>
                  <div className={`text-xs ${theme.text_default_light}`}>
                    Semester: {classData.class.course.semester.semesterNumber}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>{classData.class.course.name}</div>
                  <div className={`text-xs ${theme.text_default_light}`}>
                    {classData.class.course.code}
                  </div>
                </td>
                <td className="px-4 py-4">
                  {classData.asdos.length > 0 ? (
                    <ul className="ml-4">
                      {classData.asdos.map((asdos, i) => (
                        <li key={`${asdos.npm}-${i}`} className="mb-1">
                          <span>{asdos.name}</span>{" "}
                          <span className={`${theme.text_default_light}`}>
                            {asdos.npm}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className={`${theme.text_default_light} italic ml-4`}>
                      Belum ada asdos
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  {classData.dosen.length > 0 ? (
                    <ul className="ml-4">
                      {classData.dosen.map((dosen, i) => (
                        <li key={`${dosen.nip}-${i}`} className="mb-1">
                          <span>{dosen.name}</span> -{" "}
                          <span className={`${theme.text_default_light}`}>
                            {dosen.nip}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className={`${theme.text_default_light} italic ml-4`}>
                      Belum ada dosen
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  {classData.class.jadwal.hari ? (
                    <div>
                      <div>
                        Hari{" "}
                        {classData.class.jadwal.hari.charAt(0).toUpperCase() +
                          classData.class.jadwal.hari.slice(1)}
                      </div>
                      <div className={`text-xs ${theme.text_default_light}`}>
                        Jam: {classData.class.jadwal.mulai} -{" "}
                        {classData.class.jadwal.selesai}
                      </div>
                      <div className={`text-xs ${theme.text_default_light}`}>
                        Ruangan: {classData.class.jadwal.ruangan}
                      </div>
                    </div>
                  ) : (
                    <span className={`${theme.text_default_light} italic ml-4`}>
                      Belum ada jadwal
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className={`flex items-center justify-center ${theme.text_default} gap-6`}>
                    <Link href={`/laboran/kelola-jadwal/detail/${classData.class.id}`}>
                      <ButtonIcon title="Detail" className="hover:text-yellow-400" icon={<Info size={18} />} />
                    </Link>
                    <Link href={`/laboran/kelola-jadwal/edit/${classData.class.id}`}>
                      <ButtonIcon title="Edit Jadwal" className="hover:text-blue-400" icon={<Pen size={18} />} />
                    </Link>
                    <ButtonIcon
                      title="Hapus Jadwal"
                      className="hover:text-red-500"
                      onClick={() => console.log("Hapus kelas", classData.class.jadwal.id)}
                      icon={<Trash2 size={18} />}
                    />
                  </div>
                </td>
              </tr>
            ))}

            {filteredKelas.length === 0 && (
              <tr>
                <td colSpan={8} className={`text-center py-8 ${theme.text_default_light}`}>
                  {searchTerm ||
                    selectedProdi !== "Semua" ||
                    selectedMatkul !== "Semua" ||
                    selectedSemester !== "Semua"
                    ? "Tidak ada data yang cocok dengan kriteria pencarian/filter."
                    : "Tidak ada data kelas yang tersedia."}
                  {(searchTerm ||
                    selectedProdi !== "Semua" ||
                    selectedMatkul !== "Semua" ||
                    selectedSemester !== "Semua") && (
                      <div className="flex flex-col items-center gap-4 mt-4">
                        <button onClick={handleReset} className={`${theme.button_reset}`}>
                          <RefreshCw size={16} />
                          Reset
                        </button>
                      </div>
                    )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary Info */}
      {filteredKelas.length > 0 && (
        <div className={`mt-6 text-center ${theme.text_default}`}>
          Menampilkan {filteredKelas.length} dari {groupedKelas.length} kelas total
          {stats.kelasWithoutAsdos > 0 && (
            <span className={`ml-4 ${theme.text_title}`}>
              • {stats.kelasWithoutAsdos} kelas masih membutuhkan asdos
            </span>
          )}
        </div>
      )}
    </div>
  );

};

export default KelolaJadwalLaboranPage;
