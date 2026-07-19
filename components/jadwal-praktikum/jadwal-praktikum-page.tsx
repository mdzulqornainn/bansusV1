"use client";

import { theme } from "@/lib/theme";
import { TGetClasses } from "@/lib/types";
import {
  BookOpen,
  Calendar,
  Clock,
  FileSpreadsheet,
  Filter,
  GraduationCap,
  MapPin,
  RefreshCw,
  Search,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import * as XLSX from "xlsx";

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

interface JadwalPraktikumPageProps {
  dataClasses: TGetClasses;
}

const JadwalPraktikumPage = ({ dataClasses }: JadwalPraktikumPageProps) => {
  // States
  const [selectedProdi, setSelectedProdi] = useState("Semua");
  const [selectedMatkul, setSelectedMatkul] = useState("Semua");
  const [selectedSemester, setSelectedSemester] = useState("Semua");
  const [selectedHari, setSelectedHari] = useState("Semua");
  const [selectedDosen, setSelectedDosen] = useState("Semua");
  const [selectedAsdos, setSelectedAsdos] = useState("Semua");
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
  const dataJadwalPloting = dataClasses?.filter(
    (item) => item?.jadwalPraktikum
  );
  const groupedKelas = useMemo(
    () => groupByClass(dataJadwalPloting || []),
    [dataJadwalPloting]
  );

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
    const hari = [
      ...new Set(groupedKelas.map((k) => k.class.jadwal.hari)),
    ].filter(Boolean);
    const dosen = [
      ...new Set(groupedKelas.flatMap((k) => k.dosen.map((d) => d.name))),
    ].filter(Boolean);
    const asdos = [
      ...new Set(groupedKelas.flatMap((k) => k.asdos.map((a) => a.name))),
    ].filter(Boolean);

    return {
      prodi: ["Semua", ...prodi.sort()],
      matkul: ["Semua", ...matkul.sort()],
      semester: [
        "Semua",
        ...semester.sort((a, b) => parseInt(a) - parseInt(b)),
      ],
      hari: ["Semua", ...hari.sort()],
      dosen: ["Semua", ...dosen.sort()],
      asdos: ["Semua", ...asdos.sort()],
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
      const matchesHari =
        selectedHari === "Semua" || k.class.jadwal.hari === selectedHari;
      const matchesDosen =
        selectedDosen === "Semua" ||
        k.dosen.some((d) => d.name === selectedDosen);
      const matchesAsdos =
        selectedAsdos === "Semua" ||
        k.asdos.some((a) => a.name === selectedAsdos);

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
          k.class.jadwal.hari,
          k.class.jadwal.ruangan,
          // Search in asdos
          ...k.asdos.map((asdos) => `${asdos.name} ${asdos.npm}`),
          // Search in dosen
          ...k.dosen.map((dosen) => `${dosen.name} ${dosen.nip}`),
        ].some((field) => field.toLowerCase().includes(searchLower));

      return (
        matchesProdi &&
        matchesMatkul &&
        matchesSemester &&
        matchesHari &&
        matchesDosen &&
        matchesAsdos &&
        matchesSearch
      );
    });
  }, [
    groupedKelas,
    selectedProdi,
    selectedMatkul,
    selectedSemester,
    selectedHari,
    selectedDosen,
    selectedAsdos,
    searchTerm,
  ]);

  const handleReset = () => {
    setSelectedProdi("Semua");
    setSelectedMatkul("Semua");
    setSelectedSemester("Semua");
    setSelectedHari("Semua");
    setSelectedDosen("Semua");
    setSelectedAsdos("Semua");
    setSearchTerm("");
  };

  // Function to download Excel
  const downloadExcel = () => {
    if (filteredKelas.length === 0) {
      alert("Tidak ada data untuk diunduh");
      return;
    }

    const excelData = filteredKelas.map((classData, index) => ({
      Nomor: index + 1,
      "Nama Kelas": classData.class.name,
      "Program Studi": classData.class.course.semester.prodi.name,
      "Mata Kuliah": `${classData.class.course.name} (${classData.class.course.code})`,
      "Asisten Dosen":
        classData.asdos.length > 0
          ? classData.asdos
              .map((asdos) => `${asdos.name} - ${asdos.npm}`)
              .join("; ")
          : "Belum ada asdos",
      "Dosen Pengampu":
        classData.dosen.length > 0
          ? classData.dosen
              .map((dosen) => `${dosen.name} - ${dosen.nip}`)
              .join("; ")
          : "Belum ada dosen",
      Jadwal: classData.class.jadwal.hari
        ? `${classData.class.jadwal.hari}, ${classData.class.jadwal.mulai} - ${classData.class.jadwal.selesai}, ${classData.class.jadwal.ruangan}`
        : "Belum ada jadwal",
      Semester: `Semester ${classData.class.course.semester.semesterNumber}`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Jadwal Praktikum");

    // Set column widths
    const colWidths = [
      { wch: 8 }, // Nomor
      { wch: 20 }, // Nama Kelas
      { wch: 25 }, // Program Studi
      { wch: 30 }, // Mata Kuliah
      { wch: 40 }, // Asisten Dosen
      { wch: 40 }, // Dosen Pengampu
      { wch: 35 }, // Jadwal
      { wch: 12 }, // Semester
    ];
    worksheet["!cols"] = colWidths;

    const fileName = `Jadwal_Praktikum_${new Date().toISOString().split("T")[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  // Statistics
  const stats = useMemo(() => {
    const totalKelas = filteredKelas.length;
    const totalAsdos = filteredKelas.reduce(
      (sum, k) => sum + k.asdos.length,
      0
    );
    const totalDosen = filteredKelas.reduce(
      (sum, k) => sum + k.dosen.length,
      0
    );
    const kelasWithJadwal = filteredKelas.filter(
      (k) => k.class.jadwal.hari
    ).length;

    return { totalKelas, totalAsdos, totalDosen, kelasWithJadwal };
  }, [filteredKelas]);

  return (
    <div className="min-h-screen relative isolate overflow-x-hidden text-white px-6 pb-6 pt-20">
    <style>{`
      .unila-dot-matrix {
        background-image: radial-gradient(rgba(11, 94, 168, 0.18) 2px, transparent 2px);
        background-size: 2.5rem 2.5rem;
      }
    `}</style>
    <div className="absolute inset-0 unila-dot-matrix pointer-events-none z-[-1]"></div>

      {/* Header Section */}
      <div className="mb-8 mt-4">
        <div className="flex items-center gap-3 mb-4">
          <Search className={`h-8 w-8 ${theme.text_title}`} />
          <h1 className={`text-3xl font-bold ${theme.text_fmipa}`}>
            Cari Jadwal Praktikum
          </h1>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`${theme.card_default} rounded-xl `}>
            <div className="flex items-center gap-3">
              <BookOpen className={`h-6 w-6 ${theme.text_title}`} />
              <div>
                <p className={`${theme.text_title} text-sm`}>Total Kelas</p>
                <p className={`text-2xl font-bold ${theme.text_title}`}>
                  {stats.totalKelas}
                </p>
              </div>
            </div>
          </div>

          <div className={`${theme.card_default} rounded-xl`}>
            <div className="flex items-center gap-3">
              <Users className={`h-6 w-6 ${theme.text_title}`} />
              <div>
                <p className={`${theme.text_title} text-sm`}>Total Asdos</p>
                <p className={`text-2xl font-bold ${theme.text_title}`}>
                  {stats.totalAsdos}
                </p>
              </div>
            </div>
          </div>

          <div className={`${theme.card_default} rounded-xl`}>
            <div className="flex items-center gap-3">
              <GraduationCap className={`h-6 w-6 ${theme.text_title}`} />
              <div>
                <p className={`${theme.text_title} text-sm`}>Total Dosen</p>
                <p className={`text-2xl font-bold ${theme.text_title}`}>
                  {stats.totalDosen}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6">
        {/* Search Bar */}
        <div className="relative mb-6 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className={`${theme.icon_search}`} />
          </div>
          <input
            type="text"
            placeholder="Cari berdasarkan nama kelas, mata kuliah, prodi, dosen, asdos, ruangan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${theme.highlight_search}`}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex flex-wrap justify-between items-center mb-2 gap-4">
          {/* Left: Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`${theme.button_filter}`}
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Sembunyikan Filter" : "Tampilkan Filter"}
            </button>
          </div>

          {/* Right: Reset + Download */}
          <div className="flex flex-wrap gap-2">
            <button onClick={handleReset} className={`${theme.button_reset}`}>
              <RefreshCw size={16} />
              Reset Filter
            </button>

            <button
              onClick={downloadExcel}
              className={`flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200 shadow-sm`}
            >
              <FileSpreadsheet size={16} />
              Export Excel
            </button>
            <Link
              href="https://docs.google.com/spreadsheets/d/1kbHTKDCO3y-xckvk02Vu7Czx785qBk53SOiyIoBZr9Y/edit?usp=sharing"
              target="_blank"
              className={`flex cursor-pointer items-center gap-2 text-green-900 ${theme.card_small_green}`}
            >
              <FileSpreadsheet size={16} />
              Lihat Arsip
            </Link>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label
                className={`block text-sm font-medium ${theme.text_default} mb-2`}
              >
                Program Studi
              </label>
              <select
                value={selectedProdi}
                onChange={(e) => setSelectedProdi(e.target.value)}
                className={`${theme.highlight_filter}`}
              >
                {filterOptions.prodi.map((prodi, i) => (
                  <option key={i} value={prodi}>
                    {prodi}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className={`block text-sm font-medium ${theme.text_default} mb-2`}
              >
                Mata Kuliah
              </label>
              <select
                value={selectedMatkul}
                onChange={(e) => setSelectedMatkul(e.target.value)}
                className={`${theme.highlight_filter}`}
              >
                {filterOptions.matkul.map((matkul, i) => (
                  <option key={i} value={matkul}>
                    {matkul}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className={`block text-sm font-medium ${theme.text_default} mb-2`}
              >
                Semester
              </label>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className={`${theme.highlight_filter}`}
              >
                {filterOptions.semester.map((smt, i) => (
                  <option key={i} value={smt}>
                    {smt === "Semua" ? "Semua Semester" : `Semester ${smt}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className={`block text-sm font-medium ${theme.text_default} mb-2`}
              >
                Hari
              </label>
              <select
                value={selectedHari}
                onChange={(e) => setSelectedHari(e.target.value)}
                className={`${theme.highlight_filter}`}
              >
                {filterOptions.hari.map((hari, i) => (
                  <option key={i} value={hari}>
                    {hari === "Semua"
                      ? "Semua Hari"
                      : hari.charAt(0).toUpperCase() + hari.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className={`block text-sm font-medium ${theme.text_default} mb-2`}
              >
                Dosen Pengampu
              </label>
              <select
                value={selectedDosen}
                onChange={(e) => setSelectedDosen(e.target.value)}
                className={`${theme.highlight_filter}`}
              >
                {filterOptions.dosen.map((dosen, i) => (
                  <option key={i} value={dosen}>
                    {dosen}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className={`block text-sm font-medium ${theme.text_default} mb-2`}
              >
                Asisten Dosen
              </label>
              <select
                value={selectedAsdos}
                onChange={(e) => setSelectedAsdos(e.target.value)}
                className={`${theme.highlight_filter}`}
              >
                {filterOptions.asdos.map((asdos, i) => (
                  <option key={i} value={asdos}>
                    {asdos}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className={`min-w-full table-auto ${theme.text_default}`}>
            <thead className={`text-left text-white ${theme.table_header}`}>
              <tr>
                <th className="px-4 py-4 text-center">No</th>
                <th className="px-4 py-4">Nama Kelas</th>
                <th className="px-4 py-4">Program Studi</th>
                <th className="px-4 py-4">Mata Kuliah</th>
                <th className="px-4 py-4">Asisten Dosen</th>
                <th className="px-4 py-4">Dosen Pengampu</th>
                <th className="px-4 py-4">Jadwal Praktikum</th>
              </tr>
            </thead>
            <tbody>
              {filteredKelas.map((classData, idx) => (
                <tr
                  key={classData.class.id}
                  className={` transition border-b border-white/10 ${theme.table_highlight}`}
                >
                  <td className={`px-4 py-4 text-center ${theme.text_default}`}>
                    {idx + 1}
                  </td>

                  <td className="px-4 py-4">
                    <div className="font-medium">{classData.class.name}</div>
                    <div className={`text-xs ${theme.text_default_light}`}>
                      ID: {classData.class.id}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="">
                      {classData.class.course.semester.prodi.name}
                    </div>
                    <div className={`text-xs ${theme.text_default_light}`}>
                      Semester: {classData.class.course.semester.semesterNumber}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="">{classData.class.course.name}</div>
                    <div className={`text-xs ${theme.text_default_light}`}>
                      {classData.class.course.code}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    {classData.asdos.length > 0 ? (
                      <div className="space-y-1">
                        {classData.asdos.map((asdos, i) => (
                          <div
                            key={`${asdos.npm}-${i}`}
                            className="flex items-center gap-2"
                          >
                            <Users className="h-3 w-3 text-green-600" />
                            <span className="text-sm">{asdos.name}</span>
                            <span className="text-xs">({asdos.npm})</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span
                        className={`italic text-sm ${theme.text_default_light}`}
                      >
                        Belum ada asdos
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-4">
                    {classData.dosen.length > 0 ? (
                      <div className="space-y-1">
                        {classData.dosen.map((dosen, i) => (
                          <div
                            key={`${dosen.nip}-${i}`}
                            className="flex items-start gap-2"
                          >
                            <GraduationCap className="h-3 w-3 text-purple-600 mt-1" />
                            <div className="flex flex-col leading-tight">
                              <span className={`text-sm ${theme.text_default}`}>
                                {dosen.name}
                              </span>
                              <span
                                className={`text-xs ${theme.text_default_light}`}
                              >
                                ({dosen.nip})
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span
                        className={`italic text-sm ${theme.text_default_light}`}
                      >
                        Belum ada dosen
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-4">
                    {classData.class.jadwal.hari ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className={`h-3 w-3 ${theme.text_title}`} />
                          <span
                            className={`${theme.text_default_light} text-sm`}
                          >
                            {classData.class.jadwal.hari
                              .charAt(0)
                              .toUpperCase() +
                              classData.class.jadwal.hari.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-orange-600" />
                          <span
                            className={`${theme.text_default_light} text-sm`}
                          >
                            {classData.class.jadwal.mulai} -{" "}
                            {classData.class.jadwal.selesai}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-red-600" />
                          <span
                            className={`${theme.text_default_light} text-sm`}
                          >
                            {classData.class.jadwal.ruangan}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span
                        className={`${theme.text_default_light} italic text-sm`}
                      >
                        Belum ada jadwal
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {filteredKelas.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <div className="flex flex-col items-center gap-4">
                      <Search className={`h-12 w-12 ${theme.text_title}`} />
                      <div className={`${theme.text_default_light}`}>
                        {searchTerm ||
                        selectedProdi !== "Semua" ||
                        selectedMatkul !== "Semua" ||
                        selectedSemester !== "Semua" ||
                        selectedHari !== "Semua" ||
                        selectedDosen !== "Semua" ||
                        selectedAsdos !== "Semua"
                          ? "Tidak ada data yang cocok dengan kriteria pencarian."
                          : "Tidak ada data jadwal praktikum yang tersedia."}
                      </div>
                      {(searchTerm ||
                        selectedProdi !== "Semua" ||
                        selectedMatkul !== "Semua" ||
                        selectedSemester !== "Semua" ||
                        selectedHari !== "Semua" ||
                        selectedDosen !== "Semua" ||
                        selectedAsdos !== "Semua") && (
                        <button
                          onClick={handleReset}
                          className={`${theme.button_reset}`}
                        >
                          Reset Filter
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Info */}
      {filteredKelas.length > 0 && (
        <div className={`mt-6 text-center ${theme.text_default}`}>
          Menampilkan {filteredKelas.length} dari {groupedKelas.length} kelas
        </div>
      )}
    </div>
  );
};

export default JadwalPraktikumPage;

// const temp = () => {
//   return (

//   <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
//     {/* Results Info */}
//     <div className="mb-6 text-center">
//       <p className="text-gray-300">
//         Menampilkan {filteredKelas.length} kelas praktikum
//         {searchTerm && (
//           <span className="text-yellow-text-green-900 ml-1">
//             untuk &quot;{searchTerm}&quot;
//           </span>
//         )}
//       </p>
//     </div>

//     {/* Cards Grid */}
//     {filteredKelas.length > 0 ? (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredKelas.map((classData, idx) => (
//           <div
//             key={classData.class.id}
//             className="relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/10"
//           >
//             {/* Card Number Badge */}
//             <div className="absolute -top-2 -right-2 bg-blue-900/80 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
//               #{idx + 1}
//             </div>

//             {/* Class Name & ID */}
//             <div className="mb-4">
//               <h3 className="text-xl font-bold text-white mb-1">
//                 {classData.class.name}
//               </h3>
//               <p className="text-sm text-gray-text-green-900 font-mono">
//                 ID: {classData.class.id}
//               </p>
//             </div>

//             {/* Program Study & Semester */}
//             <div className="mb-4 space-y-2">
//               <div className="flex items-center gap-2 text-gray-300">
//                 <BookOpen className="h-4 w-4 text-blue-text-green-900" />
//                 <span className="font-medium">
//                   {classData.class.course.semester.prodi.name}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2 text-gray-text-green-900 text-sm">
//                 <svg
//                   className="w-4 h-4 text-yellow-300"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M6 2a1 1 0 00-1 1v1h10V3a1 1 0 00-1-1H6zM5 6v10a2 2 0 002 2h6a2 2 0 002-2V6H5z" />
//                 </svg>
//                 Semester {classData.class.course.semester.semesterNumber}
//               </div>
//             </div>

//             {/* Course Info */}
//             <div className="mb-4 p-3 bg-white/5 rounded-lg">
//               <h4 className="text-white font-medium mb-1">
//                 {classData.class.course.name}
//               </h4>
//               <p className="text-gray-text-green-900 text-sm font-mono">
//                 {classData.class.course.code}
//               </p>
//             </div>

//             {/* Schedule Info */}
//             <div className="mb-4">
//               <h5 className="text-gray-300 font-medium mb-2 text-sm">
//                 Jadwal Praktikum
//               </h5>
//               {classData.class.jadwal.hari ? (
//                 <div className="space-y-2 bg-white/5 p-3 rounded-lg">
//                   <div className="flex items-center gap-2">
//                     <Calendar className="h-4 w-4 text-blue-text-green-900" />
//                     <span className="text-white text-sm">
//                       {classData.class.jadwal.hari.charAt(0).toUpperCase() +
//                         classData.class.jadwal.hari.slice(1)}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Clock className="h-4 w-4 text-orange-text-green-900" />
//                     <span className="text-gray-300 text-sm">
//                       {classData.class.jadwal.mulai} -{" "}
//                       {classData.class.jadwal.selesai}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <MapPin className="h-4 w-4 text-red-text-green-900" />
//                     <span className="text-gray-300 text-sm">
//                       {classData.class.jadwal.ruangan}
//                     </span>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="bg-gray-700/30 p-3 rounded-lg">
//                   <span className="text-gray-text-green-900 italic text-sm">
//                     Belum ada jadwal
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* Teaching Staff */}
//             <div className="space-y-3">
//               {/* Dosen */}
//               <div>
//                 <h5 className="text-gray-300 font-medium mb-2 text-sm flex items-center gap-2">
//                   <GraduationCap className="h-4 w-4 text-purple-text-green-900" />
//                   Dosen Pengampu
//                 </h5>
//                 {classData.dosen.length > 0 ? (
//                   <div className="space-y-1">
//                     {classData.dosen.map((dosen, i) => (
//                       <div
//                         key={`${dosen.nip}-${i}`}
//                         className="bg-purple-900/10 p-2 rounded-md"
//                       >
//                         <span className="text-white text-sm font-medium">
//                           {dosen.name}
//                         </span>
//                         <span className="text-gray-text-green-900 text-xs ml-2">
//                           ({dosen.nip})
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="bg-gray-700/30 p-2 rounded-md">
//                     <span className="text-gray-text-green-900 italic text-sm">
//                       Belum ada dosen
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Asisten Dosen */}
//               <div>
//                 <h5 className="text-gray-300 font-medium mb-2 text-sm flex items-center gap-2">
//                   <Users className="h-4 w-4 text-green-900" />
//                   Asisten Dosen
//                 </h5>
//                 {classData.asdos.length > 0 ? (
//                   <div className="space-y-1">
//                     {classData.asdos.map((asdos, i) => (
//                       <div
//                         key={`${asdos.npm}-${i}`}
//                         className="bg-green-900/10 p-2 rounded-md"
//                       >
//                         <span className="text-white text-sm font-medium">
//                           {asdos.name}
//                         </span>
//                         <span className="text-gray-text-green-900 text-xs ml-2">
//                           ({asdos.npm})
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="bg-gray-700/30 p-2 rounded-md">
//                     <span className="text-gray-text-green-900 italic text-sm">
//                       Belum ada asdos
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     ) : (
//       <div className="text-center py-12">
//         <div className="flex flex-col items-center gap-4">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-700/50 rounded-full">
//             <Search className="h-12 w-12 text-gray-text-green-900" />
//           </div>
//           <h3 className="text-xl font-semibold text-white mb-2">
//             Tidak ada kelas praktikum ditemukan
//           </h3>
//           <div className="text-gray-text-green-900">
//             {searchTerm ||
//             selectedProdi !== "Semua" ||
//             selectedMatkul !== "Semua" ||
//             selectedSemester !== "Semua" ||
//             selectedHari !== "Semua" ||
//             selectedDosen !== "Semua" ||
//             selectedAsdos !== "Semua"
//               ? "Tidak ada data yang cocok dengan kriteria pencarian."
//               : "Tidak ada data jadwal praktikum yang tersedia."}
//           </div>
//           {(searchTerm ||
//             selectedProdi !== "Semua" ||
//             selectedMatkul !== "Semua" ||
//             selectedSemester !== "Semua" ||
//             selectedHari !== "Semua" ||
//             selectedDosen !== "Semua" ||
//             selectedAsdos !== "Semua") && (
//             <button
//               onClick={handleReset}
//               className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
//             >
//               Reset Filter
//             </button>
//           )}
//         </div>
//       </div>
//     )}
//   </div>
//   )
// };
