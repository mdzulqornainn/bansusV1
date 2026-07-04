"use client";
import { TGetClass } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface DetailAsdosKelasPageProps {
  dataClass: TGetClass;
}

const DetailAsdosKelasPage = ({ dataClass }: DetailAsdosKelasPageProps) => {
  const dataClassAsdos = dataClass?.classAsdos;
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:ml-64">
      <button
        type="button"
        onClick={() => window.history.back()}
        className="group mb-6 inline-flex items-center gap-2 text-sm text-yellow-300 hover:text-yellow-100"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        <span>Kembali ke Detail Matkul</span>
      </button>

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-6">
        Detail Kelas
      </h1>

      {/* Card Kontainer */}
      <div className="border border-white/10 rounded-2xl shadow-xl p-4 sm:p-6 mb-6 bg-white/5">
        {/* Tabel Info Kelas */}
        <div className="w-full mb-6">
          {/* Mobile Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-white md:hidden">
            <div className="font-semibold text-yellow-300">Prodi</div>
            <div>{dataClass?.course?.semester.prodi.name}</div>

            <div className="font-semibold text-yellow-300">Mata Kuliah</div>
            <div className="truncate">{dataClass?.course?.name}</div>

            <div className="font-semibold text-yellow-300">Semester</div>
            <div>{dataClass?.course?.semester.semesterNumber}</div>

            <div className="font-semibold text-yellow-300">Kelas</div>
            <div>{dataClass?.name}</div>
          </div>

          {/* Desktop Table */}
          <div className="overflow-x-auto hidden md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="text-yellow-300 text-sm">
                  <th className="py-2 px-3">Prodi</th>
                  <th className="py-2 px-3">Mata Kuliah</th>
                  <th className="py-2 px-3">Semester</th>
                  <th className="py-2 px-3">Kelas</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-white text-sm">
                  <td className="py-2 px-3 whitespace-nowrap">
                    {dataClass?.course?.semester.prodi.name}
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap truncate max-w-xs">
                    {dataClass?.course?.name}
                  </td>
                  <td className="py-2 px-3">
                    {dataClass?.course?.semester.semesterNumber}
                  </td>
                  <td className="py-2 px-3">{dataClass?.name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabel Data Asdos */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-white/10 text-xs sm:text-sm">
            <thead>
              <tr className="bg-yellow-500/10 text-yellow-300">
                <th className="p-2 border">No</th>
                <th className="p-2 border">NPM</th>
                <th className="p-2 border">Nama</th>
                <th className="p-2 border">WhatsApp</th>
                <th className="p-2 border">Absensi</th>
              </tr>
            </thead>
            <tbody>
              {dataClassAsdos &&
                dataClassAsdos.map((clsAsdos, index) => (
                  <tr
                    key={clsAsdos.id}
                    className="text-white border-t hover:bg-yellow-500/20 border-white/10 text-center"
                  >
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{clsAsdos.asdos.npm}</td>
                    <td className="p-2">{clsAsdos.asdos.user.name}</td>
                    <td className="p-2">
                      <Link
                        href={`https://wa.me/${clsAsdos?.asdos?.whatsapp?.replace(/^0/, "62")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {clsAsdos.asdos.whatsapp}
                      </Link>
                    </td>
                    <td className="p-2">{clsAsdos.absensi?.length || 0}/16</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailAsdosKelasPage;
