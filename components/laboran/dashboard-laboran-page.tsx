"use client";

import { refresh } from "@/lib/authenticate";
import { theme } from "@/lib/theme";
import { TCurrentUser } from "@/lib/types";
import { Activity, BookOpen, CheckCircle, ClipboardList } from "lucide-react";

interface DashboardLaboranPageProps {
  user: TCurrentUser;
}

const DashboardLaboranPage = ({ user }: DashboardLaboranPageProps) => {
  const handleClick = async () => {
    await refresh();
  };

  return (
    <div className="lg:ml-64">
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className={`bg-gradient-to-r from-sky-400/10 to-sky-500/10 backdrop-blur-xl border border-sky-400/20 rounded-2xl p-8 ${theme.card_shadow} lg:mb-3 mb-6`}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`text-3xl font-bold ${theme.text_title}`}>
                  Dashboard Laboran
                </h1>
                <p className={`${theme.text_default_light} mt-2 text-lg`}>
                  Selamat datang kembali! {user?.name}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-sm ${theme.text_default_light}`}>Hari ini</p>
                <p className={`text-xl font-semibold ${theme.text_title}`}
                >
                  {new Date().toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Mata Kuliah */}
          <div className={`${theme.card_blue} ${theme.card_shadow}`}>
            <div className="flex items-center">
              <div className={`p-3 ${theme.text_title} ${theme.logo_background} rounded-xl shadow-lg`}>
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${theme.text_title} `}>
                  Mata Kuliah
                </p>
                <p className={`text-2xl font-bold ${theme.text_title}`}>{24}</p>
              </div>
            </div>
          </div>

          {/* Asisten Dosen */}
          <div className={`${theme.card_green} ${theme.card_shadow}`}>
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-green-400">
                  Asisten Dosen
                </p>
                <p className="text-2xl font-bold text-green-400">80</p>
                <p className="text-xs text-green-400 mt-1">
                  20 aktif, 60 cadangan
                </p>
              </div>
            </div>
          </div>

          {/* Kehadiran */}
          <div className={`${theme.card_purple} ${theme.card_shadow}`}>
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 w-full">
                <p className="text-sm font-medium text-purple-600">
                  Kehadiran
                </p>
                <div className="w-full bg-purple-500/10 rounded-full h-2.5 mt-1 mb-2">
                  <div
                    className="bg-purple-400 h-2.5 rounded-full"
                    style={{ width: "90%" }}
                  ></div>
                </div>
                <p className="text-sm text-purple-400 font-semibold">90%</p>
              </div>
            </div>
          </div>

          {/* Pengajuan Asdos */}
          <div className="bg-gradient-to-br from-orange-400/10 to-amber-600/10 backdrop-blur-xl border border-orange-400/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl shadow-lg">
                <ClipboardList className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-orange-400">
                  Cooming Soon
                </p>
                <p className="text-2xl font-bold text-orange-400">
                  Cooming Soon
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`bg-gradient-to-r from-sky-400/10 to-sky-500/10 backdrop-blur-xl border border-sky-400/20 rounded-2xl p-8 ${theme.card_shadow} lg:mb-3 mb-6`}>
          <h2 className={`text-lg font-semibold ${theme.text_title} mb-4`}>
            Aktivitas Terbaru
          </h2>
          <ul className={`space-y-3 ${theme.text_default_light} text-sm list-disc list-inside`}>
            <li>Cooming Soon</li>
            <li>Cooming Soon</li>
            <li>Cooming Soon</li>
          </ul>
        </div>

        {/* Refresh button */}
        <div className="flex justify-end my-6">
          <button
            className={`${theme.button_square_pressed_blue}`}
            onClick={handleClick}
          >
            Refresh Cache
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardLaboranPage;
