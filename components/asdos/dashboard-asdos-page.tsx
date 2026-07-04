"use client";

import { theme } from "@/lib/theme"; // Adjust import path as needed
import { TCurrentUser, TGetAsdosByUserId } from "@/lib/types";
import {
  Activity,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Users,
} from "lucide-react";

interface DashboardAsdosPageProps {
  user: TCurrentUser;
  dataAsdos: TGetAsdosByUserId;
}

const DashboardAsdosPage = ({ user, dataAsdos }: DashboardAsdosPageProps) => {
  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="lg:ml-64">
      <div className="p-6 space-y-8">
        {/* Header Section */}
        <div className={`${theme.card_blue} ${theme.card_shadow} p-8`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-2">
              <h1 className={`text-3xl font-bold ${theme.text_title}`}
              >
                Dashboard Asisten Dosen
              </h1>
              <p className={`${theme.text_default_light} text-lg`}>
                Selamat datang kembali,{" "}
                <span className={theme.text_title}>{user?.name}</span>!
              </p>
            </div>
            <div className="text-left lg:text-right">
              <p className={`text-sm ${theme.text_default} opacity-70`}>
                Hari ini
              </p>
              <p className={`text-xl font-semibold ${theme.text_title}`}>
                {currentDate}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Mata Kuliah Card */}
          <div className={`${theme.card_blue} ${theme.card_shadow}`}>
            <div className="flex items-center">
              <div
                className={`p-3 ${theme.text_title} ${theme.logo_background} rounded-xl`}
              >
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme.text_title}`}>
                  Mata Kuliah
                </p>
                <p className={`text-2xl font-bold ${theme.text_title}`}>
                  {dataAsdos?.classAsdos.length || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Absensi Hadir Card */}
          <div className={`${theme.card_green} ${theme.card_shadow}`}>
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-green-400">
                  Absensi Hadir
                </p>
                <p className="text-2xl font-bold text-green-400">
                  {dataAsdos?.classAsdos.reduce(
                    (acc, classAsdos) => acc + classAsdos.absensi.length,
                    0
                  )}
                  /
                  {16 * (dataAsdos?.classAsdos?.length || 1)}
                </p>
              </div>
            </div>
          </div>

          {/* Persentase Kehadiran Card */}
          <div className={`${theme.card_purple} ${theme.card_shadow}`}>
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-600">
                  Kehadiran
                </p>
                <p className="text-2xl font-bold text-purple-400">
                  {(
                    ((dataAsdos?.classAsdos?.reduce(
                      (acc, classAsdos) => acc + classAsdos.absensi.length,
                      0
                    ) ?? 0) /
                      (16 * (dataAsdos?.classAsdos?.length || 1))) *
                    100
                  ).toFixed(2)}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mata Kuliah Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className={`text-2xl font-bold ${theme.text_title}`}>
              Mata Kuliah yang Diampu
            </h2>

            {/* Kartu Kecil */}
            <div
              className={`flex items-center px-3 py-1 rounded-lg ${theme.background_guest_small_card}`}
            >
              <Users className={`w-4 h-4 mr-2 ${theme.text_default}`} />
              <span className={`text-sm ${theme.text_default_light}`}>
                {dataAsdos?.classAsdos.length || 0} Kelas
              </span>
            </div>
          </div>

          {/* Mata Kuliah Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dataAsdos?.classAsdos && dataAsdos?.classAsdos.length > 0 ? (
              dataAsdos?.classAsdos.map((mk) => (
                <div
                  key={mk.id}
                  className={`${theme.card_default} ${theme.hover_default_no_scale_bg} group cursor-pointer`}
                >
                  <div className="space-y-4">
                    {/* Header dengan badges */}
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex flex-wrap gap-2">
                        {/* <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium"> */}
                        <span className={`px-3 py-1.5 ${theme.status_processing} border border-blue-400/30 rounded-full text-sm font-medium`}>
                          {mk.class.course?.code || "N/A"}
                        </span>
                        {/* <span className="px-3 py-1.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 text-green-300  rounded-full text-sm font-medium"> */}
                        <span className={`px-3 py-1.5 ${theme.status_accepted} rounded-full text-sm font-medium`}>
                          Kelas {mk.class.name || "N/A"}
                        </span>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-xs ${theme.text_default} opacity-50`}
                        >
                          Semester
                        </p>
                        <p className={`text-lg font-bold ${theme.text_title}`}>
                          {mk.class.course?.semester?.semesterNumber || "-"}
                        </p>
                      </div>
                    </div>

                    {/* Course Name */}
                    <div>
                      <h3
                        className={`text-lg font-bold ${theme.text_title} mb-1 group-hover:${theme.text_default_blue} transition-colors`}
                      >
                        {mk.class.course?.name ||
                          "Nama mata kuliah tidak tersedia"}
                      </h3>
                    </div>

                    {/* Schedule Information */}
                    {mk.class.jadwalPraktikum && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-400" />
                            <span className={`text-sm ${theme.text_default}`}>
                              {mk.class.jadwalPraktikum.hari || "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-green-400" />
                            <span className={`text-sm ${theme.text_default}`}>
                              {mk.class.jadwalPraktikum.mulai || "N/A"} -{" "}
                              {mk.class.jadwalPraktikum.selesai || "N/A"}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-purple-400" />
                            <span className={`text-sm ${theme.text_default}`}>
                              {mk.class.jadwalPraktikum.ruangan || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div
                className={`${theme.card_default} col-span-full text-center py-12`}
              >
                <BookOpen className={`w-16 h-16 mx-auto ${theme.text_default_light} mb-4`} />
                <p className={`text-lg ${theme.text_default} mb-2`}>
                  Belum ada mata kuliah yang diampu
                </p>
                <p className={`text-sm ${theme.text_default_light} opacity-80`}>
                  Hubungi koordinator untuk penugasan mata kuliah
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAsdosPage;
