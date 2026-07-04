"use client";
import { TGetAsdos } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { theme } from "@/lib/theme";
import Link from "next/link";

interface DetailAsdosAbsensiPageProps {
  dataAsdos: TGetAsdos;
}

const DetailAsdosAbsensiPage = ({ dataAsdos }: DetailAsdosAbsensiPageProps) => {
  const [selectedClassId, setSelectedClassId] = useState(
    dataAsdos?.classAsdos[0]?.id || ""
  );

  // Transform data from database to match expected format
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generatePertemuanData = (existingAbsensi: any[]) => {
    const pertemuanData = [];
    for (let i = 1; i <= 16; i++) {
      const existing = existingAbsensi.find((abs) => abs.pertemuanKe === i);
      if (existing) {
        pertemuanData.push({
          pertemuan: existing.pertemuanKe,
          waktu: existing.waktuKehadiran
            ? new Date(existing.waktuKehadiran).toLocaleString("id-ID", {
                dateStyle: "short",
                timeStyle: "short",
              })
            : "-",
          materi: existing.materi || "-",
          ruangan: existing.ruangan || "-",
          bukti: existing.buktiKehadiran?.linkView || null,
          status: "sudah",
        });
      } else {
        pertemuanData.push({
          pertemuan: i,
          waktu: "-",
          materi: "-",
          ruangan: "-",
          bukti: null,
          status: "belum",
        });
      }
    }
    return pertemuanData;
  };

  // Transform data from database to match expected format
  const daftarKelas =
    dataAsdos?.classAsdos?.map((classAsdos) => ({
      id: classAsdos.id,
      prodi: classAsdos?.class?.course?.semester?.prodi?.name || "-",
      matkul: classAsdos?.class?.course?.name || "-",
      semesterNumber: classAsdos?.class?.course?.semester?.semesterNumber || 0,
      kelas: classAsdos.class.name,
      absensi: generatePertemuanData(classAsdos.absensi || []),
    })) || [];

  const selectedClass = daftarKelas.find((k) => k.id === selectedClassId);

  // Handle case where no data is available
  if (!dataAsdos || !selectedClass) {
    return (
      <div className="min-h-screen p-6 lg:ml-48">
        <div className={`${theme.card_max_4} ${theme.card_default}`}>
          <h1
            className={`text-xl sm:text-2xl md:text-3xl font-bold ${theme.text_title} mb-6`}
          >
            Monitoring Absensi Asdos
          </h1>
          <div className={`${theme.text_default} text-center py-8`}>
            Tidak ada data absensi yang tersedia.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:ml-48">
      <div className={theme.card_max_4_fit}>
        {/* Back Button */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className={`group mb-6 inline-flex items-center gap-2 text-sm ${theme.text_title} hover:${theme.text_default_blue} transition-colors duration-300`}
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Kembali ke Detail Asdos</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-xl sm:text-2xl md:text-3xl font-bold ${theme.text_title} mb-2`}
          >
            Monitoring Absensi Asdos
          </h1>
          <p className={`${theme.text_default} text-sm sm:text-base`}>
            Pantau kehadiran dan dokumentasi perkuliahan asdos
          </p>
        </div>

        {/* Tab Navigation for Multiple Classes */}
        {daftarKelas.length > 1 && (
          <div className={`${theme.card_default} mb-6`}>
            <h3
              className={`${theme.text_default_blue} font-semibold mb-4 text-sm sm:text-base`}
            >
              Pilih Mata Kuliah
            </h3>
            <div className="flex flex-wrap gap-2">
              {daftarKelas.map((kelas) => (
                <button
                  key={kelas.id}
                  onClick={() => setSelectedClassId(kelas.id)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                    selectedClassId === kelas.id
                      ? theme.button_selection
                      : `${theme.button_default_small_reversed} border border-white/20`
                  }`}
                >
                  <div className="font-semibold">{kelas.matkul}</div>
                  <div className="text-xs opacity-75">
                    Kelas {kelas.kelas} • Semester {kelas.semesterNumber}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Asdos Information Card */}
        <div className={`${theme.card_default}`}>
          <h3
            className={`${theme.text_default_blue} font-semibold mb-4 text-sm sm:text-base`}
          >
            Informasi Asdos
          </h3>

          {/* Mobile View */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm md:hidden">
            <div className="space-y-3">
              <div>
                <span
                  className={`${theme.text_title} font-semibold block mb-1`}
                >
                  NPM
                </span>
                <span className={`${theme.text_default}`}>
                  {dataAsdos?.npm}
                </span>
              </div>
              <div>
                <span
                  className={`${theme.text_title} font-semibold block mb-1`}
                >
                  Nama Asdos
                </span>
                <span className={`${theme.text_default} leading-relaxed`}>
                  {dataAsdos?.user.name}
                </span>
              </div>
              <div>
                <span
                  className={`${theme.text_title} font-semibold block mb-1`}
                >
                  Program Studi
                </span>
                <span className={`${theme.text_default} leading-relaxed`}>
                  {selectedClass.prodi}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span
                  className={`${theme.text_title} font-semibold block mb-1`}
                >
                  Mata Kuliah
                </span>
                <span className={`${theme.text_default} leading-relaxed`}>
                  {selectedClass.matkul}
                </span>
              </div>
              <div>
                <span
                  className={`${theme.text_title} font-semibold block mb-1`}
                >
                  Semester
                </span>
                <span className={theme.text_default}>
                  {selectedClass.semesterNumber}
                </span>
              </div>
              <div>
                <span
                  className={`${theme.text_title} font-semibold block mb-1`}
                >
                  Kelas
                </span>
                <span className={theme.text_default}>
                  {selectedClass.kelas}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className={theme.text_title}>
                  <th className="py-3 px-4 font-semibold">NPM</th>
                  <th className="py-3 px-4 font-semibold">Nama Asdos</th>
                  <th className="py-3 px-4 font-semibold">Program Studi</th>
                  <th className="py-3 px-4 font-semibold">Mata Kuliah</th>
                  <th className="py-3 px-4 font-semibold">Semester</th>
                  <th className="py-3 px-4 font-semibold">Kelas</th>
                </tr>
              </thead>
              <tbody>
                <tr className={theme.table_highlight}>
                  <td className={`py-3 px-4 ${theme.text_default}`}>
                    {dataAsdos?.npm}
                  </td>
                  <td
                    className={`py-3 px-4 ${theme.text_default} leading-relaxed`}
                  >
                    {dataAsdos?.user.name}
                  </td>
                  <td
                    className={`py-3 px-4 ${theme.text_default} leading-relaxed`}
                  >
                    {selectedClass.prodi}
                  </td>
                  <td
                    className={`py-3 px-4 ${theme.text_default} leading-relaxed`}
                  >
                    {selectedClass.matkul}
                  </td>
                  <td className={`py-3 px-4 ${theme.text_default}`}>
                    {selectedClass.semesterNumber}
                  </td>
                  <td className={`py-3 px-4 ${theme.text_default}`}>
                    {selectedClass.kelas}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Attendance Progress */}
        <div className={`${theme.card_default}`}>
          <div className="flex items-center justify-between mb-4">
            <h3
              className={`${theme.text_default_blue} font-semibold text-sm sm:text-base`}
            >
              Progress Pertemuan
            </h3>
            <div className={`${theme.text_default} text-xs sm:text-sm`}>
              {selectedClass.absensi.filter((a) => a.status === "sudah").length}
              /16 Pertemuan
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-16 gap-2 mb-4">
            {selectedClass.absensi.map((data, i) => (
              <div
                key={i + 1}
                className={`aspect-square flex items-center justify-center rounded-lg text-xs font-bold transition-all duration-300 ${
                  data.status === "sudah"
                    ? "bg-green-500 text-white"
                    : "bg-white/10 text-gray-400"
                }`}
                title={`Pertemuan ${data.pertemuan} - ${
                  data.status === "sudah" ? "Selesai" : "Belum diisi"
                }`}
              >
                {data.pertemuan}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className={theme.text_default}>Selesai</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white/10 rounded"></div>
              <span className={theme.text_default}>Belum Diisi</span>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className={`${theme.card_default}`}>
          <h3
            className={`${theme.text_default_blue} font-semibold mb-4 text-sm sm:text-base`}
          >
            Daftar Absensi
          </h3>

          <div className="overflow-x-auto">
            <table
              className={`min-w-full ${theme.border_outside} text-xs sm:text-sm`}
            >
              <thead>
                <tr className={`${theme.table_header} text-white`}>
                  <th className="p-3 border border-white/20 font-semibold">
                    Pertemuan
                  </th>
                  <th className="p-3 border border-white/20 font-semibold">
                    Waktu Kehadiran
                  </th>
                  <th className="p-3 border border-white/20 font-semibold">
                    Materi
                  </th>
                  <th className="p-3 border border-white/20 font-semibold">
                    Ruangan
                  </th>
                  <th className="p-3 border border-white/20 font-semibold">
                    Bukti Kehadiran
                  </th>
                  <th className="p-3 border border-white/20 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedClass.absensi.map((data) => {
                  const rowBgClass =
                    data.status === "sudah" ? "bg-green-500/10" : "";

                  return (
                    <tr
                      key={data.pertemuan}
                      className={`${theme.text_default} border-t border-white/10 ${theme.table_highlight} ${rowBgClass}`}
                    >
                      <td className="p-3 text-center border border-white/20 font-medium">
                        Pertemuan {data.pertemuan}
                      </td>
                      <td className="p-3 border border-white/20">
                        {data.waktu}
                      </td>
                      <td className="p-3 border border-white/20">
                        <div className="max-w-xs">
                          {data.materi.length > 50 ? (
                            <span title={data.materi}>
                              {data.materi.substring(0, 50)}...
                            </span>
                          ) : (
                            data.materi
                          )}
                        </div>
                      </td>
                      <td className="p-3 border border-white/20">
                        {data.ruangan}
                      </td>
                      <td className="p-3 text-center border border-white/20">
                        {data.bukti ? (
                          <Link
                            href={data.bukti}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${theme.text_default_blue} underline hover:text-blue-400 transition-colors duration-300 text-xs`}
                          >
                            Lihat Bukti
                          </Link>
                        ) : (
                          <span className="text-gray-500 text-xs italic">
                            Tidak ada
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-center border border-white/20">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            data.status === "sudah"
                              ? theme.status_accepted
                              : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {data.status === "sudah" ? "Selesai" : "Belum Diisi"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Statistics Summary */}
        <div className={`${theme.card_default}`}>
          <h3
            className={`${theme.text_default_blue} font-semibold mb-4 text-sm sm:text-base`}
          >
            Ringkasan Statistik
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="text-2xl font-bold text-green-400">
                {
                  selectedClass.absensi.filter((a) => a.status === "sudah")
                    .length
                }
              </div>
              <div className={`${theme.text_default} text-xs`}>
                Pertemuan Selesai
              </div>
            </div>
            <div className="text-center p-4 bg-gray-500/10 border border-gray-500/30 rounded-lg">
              <div className="text-2xl font-bold text-gray-400">
                {
                  selectedClass.absensi.filter((a) => a.status === "belum")
                    .length
                }
              </div>
              <div className={`${theme.text_default} text-xs`}>Belum Diisi</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">
                {Math.round(
                  (selectedClass.absensi.filter((a) => a.status === "sudah")
                    .length /
                    16) *
                    100
                )}
                %
              </div>
              <div className={`${theme.text_default} text-xs`}>
                Persentase Kehadiran
              </div>
            </div>
            <div className="text-center p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">
                {selectedClass.absensi.filter((a) => a.bukti !== null).length}
              </div>
              <div className={`${theme.text_default} text-xs`}>
                Ada Bukti Foto
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div
          className={`${theme.card_default} bg-blue-500/10 border-blue-400/30`}
        >
          <h4
            className={`${theme.text_default_blue} font-semibold mb-2 text-sm`}
          >
            Catatan untuk Admin:
          </h4>
          <ul
            className={`${theme.text_default} text-xs sm:text-sm space-y-1 list-disc list-inside`}
          >
            <li>
              Data absensi ditampilkan dalam mode read-only untuk monitoring
            </li>
            <li>
              Status &quot;Selesai&quot; menunjukkan asdos telah mengisi absensi
              untuk pertemuan tersebut
            </li>
            <li>
              Klik &quot;Lihat Bukti&quot; untuk melihat foto dokumentasi
              kehadiran
            </li>
            <li>
              Statistik menampilkan ringkasan persentase kehadiran dan
              kelengkapan data
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailAsdosAbsensiPage;
