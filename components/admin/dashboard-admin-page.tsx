"use client";

import { refresh } from "@/lib/authenticate";
import { theme } from "@/lib/theme";
import {
  TCurrentUser,
  TGetAsdoss,
  TGetCourses,
  TGetDosens,
  TGetUsers,
} from "@/lib/types";
import {
  Activity,
  BookOpen,
  GraduationCap,
  RefreshCw,
  RotateCcw,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DashboardAdminPageProps {
  user: TCurrentUser;
  dataCourses: TGetCourses;
  dataAsdoss: TGetAsdoss;
  dataUsers: TGetUsers;
  dataDosens: TGetDosens;
}

/* =========================
   Reusable Stat Card
========================= */
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
}

const StatCard = ({ title, value, icon, gradient, delay }: StatCardProps) => (
  <div
    className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${theme.card_shadow}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Background decoration */}
    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5 blur-2xl transition-all duration-500 group-hover:scale-150" />

    <div className="relative flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-white/80 uppercase tracking-wider mb-2">
          {title}
        </p>
        <p className="text-4xl font-bold text-white mb-1 transition-all duration-300 group-hover:scale-110">
          {value}
        </p>
      </div>

      <div className="flex-shrink-0 p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg transition-all duration-300 group-hover:rotate-12 group-hover:bg-white/20">
        {icon}
      </div>
    </div>

    {/* Shine effect on hover */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
  </div>
);

/* =========================
   Main Page
========================= */
const DashboardAdminPage = ({
  user,
  dataCourses,
  dataAsdoss,
  dataUsers,
  dataDosens,
}: DashboardAdminPageProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  const handleRefreshCache = async () => {
    try {
      setIsRefreshing(true);
      await refresh();
      // Optional: Add toast notification for success
    } catch (error) {
      console.error("Failed to refresh cache:", error);
      // Optional: Add toast notification for error
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleRefreshToken = async () => {
    try {
      setIsRefreshing(true);
      router.push("/api/oauth");
      setTimeout(() => {
        setIsRefreshing(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to refresh token:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const stats = [
    {
      title: "Mata Kuliah",
      value: dataCourses?.length || 0,
      icon: <BookOpen className="h-7 w-7 text-white" />,
      gradient: "from-blue-500 via-blue-600 to-blue-700",
      delay: 0,
    },
    {
      title: "Asisten Dosen",
      value: dataAsdoss?.length || 0,
      icon: <GraduationCap className="h-7 w-7 text-white" />,
      gradient: "from-emerald-500 via-emerald-600 to-teal-600",
      delay: 100,
    },
    {
      title: "Dosen",
      value: dataDosens?.length || 0,
      icon: <Users className="h-7 w-7 text-white" />,
      gradient: "from-purple-500 via-purple-600 to-indigo-600",
      delay: 200,
    },
    {
      title: "Pengguna",
      value: dataUsers?.length || 0,
      icon: <Activity className="h-7 w-7 text-white" />,
      gradient: "from-orange-500 via-orange-600 to-red-600",
      delay: 300,
    },
  ];

  return (
    <div className="lg:ml-64 min-h-screen">
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <div
            className={`relative overflow-hidden bg-gradient-to-br from-sky-400/10 via-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-sky-400/20 rounded-3xl p-8 ${theme.card_shadow} transition-all duration-300 hover:shadow-xl`}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-400/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-3xl" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm text-green-400 font-medium">
                    Online
                  </span>
                </div>
                <h1
                  className={`text-4xl md:text-5xl font-bold ${theme.text_title} mb-3 tracking-tight`}
                >
                  Dashboard Admin
                </h1>
                <p
                  className={`${theme.text_default_light} text-lg flex flex-wrap items-center gap-2`}
                >
                  Selamat datang kembali,
                  <span
                    className={`font-semibold ${theme.text_title} px-3 py-1 bg-white/10 rounded-lg backdrop-blur-sm`}
                  >
                    {user?.name || "Admin"}
                  </span>
                </p>
              </div>

              <div className="text-left md:text-right bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <p
                  className={`text-sm ${theme.text_default_light} uppercase tracking-wider mb-1`}
                >
                  Hari ini
                </p>
                <p
                  className={`text-lg md:text-xl font-semibold ${theme.text_title}`}
                >
                  {today}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              gradient={stat.gradient}
              delay={stat.delay}
            />
          ))}
        </div>

        {/* Action Section */}
        <div
          className="flex flex-col gap-6 p-6
  bg-gradient-to-r from-slate-50 to-slate-100
  dark:from-slate-800/50 dark:to-slate-900/50
  rounded-2xl border border-slate-200 dark:border-slate-700
  sm:flex-row sm:items-center sm:justify-between
"
        >
          {/* Text */}
          <div>
            <h3 className={`text-lg font-semibold ${theme.text_title}`}>
              Cache Management
            </h3>
            <p className={`text-sm ${theme.text_default_light}`}>
              Perbarui cache sistem untuk memuat data terbaru
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={handleRefreshCache}
              disabled={isRefreshing}
              className="
        group relative inline-flex items-center gap-3
        px-6 py-3.5
        bg-gradient-to-r from-sky-500 to-blue-600
        hover:from-sky-600 hover:to-blue-700
        text-white font-semibold rounded-xl
        shadow-lg hover:shadow-xl
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:scale-105 active:scale-95
      "
            >
              <RefreshCw
                className={`h-5 w-5 transition-transform duration-500 ${
                  isRefreshing ? "animate-spin" : "group-hover:rotate-180"
                }`}
              />
              <span>{isRefreshing ? "Memperbarui..." : "Refresh Cache"}</span>

              <div
                className="absolute inset-0 rounded-xl
        bg-gradient-to-r from-transparent via-white/20 to-transparent
        -translate-x-full group-hover:translate-x-full
        transition-transform duration-1000
      "
              />
            </button>

            <button
              onClick={handleRefreshToken}
              disabled={isRefreshing}
              className="
        group relative inline-flex items-center gap-3
        px-6 py-3.5
        bg-slate-200 dark:bg-slate-700
        text-slate-700 dark:text-slate-200
        font-semibold rounded-xl
        hover:bg-slate-300 dark:hover:bg-slate-600
        transition-all duration-300
        disabled:opacity-50
      "
            >
              <RotateCcw
                className={`h-5 w-5 transition-transform duration-500 ${
                  isRefreshing ? "animate-spin" : "group-hover:rotate-180"
                }`}
              />
              <span>{isRefreshing ? "Memperbarui..." : "Refresh Token"}</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className={`p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/30 border border-blue-200 dark:border-blue-800 ${theme.card_shadow}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <h4 className={`font-semibold ${theme.text_title}`}>Akademik</h4>
            </div>
            <p className={`text-sm ${theme.text_default_light}`}>
              Total {dataCourses?.length || 0} mata kuliah aktif dalam sistem
            </p>
          </div>

          <div
            className={`p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800 ${theme.card_shadow}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-emerald-500 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <h4 className={`font-semibold ${theme.text_title}`}>
                Staf Pengajar
              </h4>
            </div>
            <p className={`text-sm ${theme.text_default_light}`}>
              {(dataAsdoss?.length || 0) + (dataDosens?.length || 0)} total
              dosen dan asisten dosen
            </p>
          </div>

          <div
            className={`p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border border-orange-200 dark:border-orange-800 ${theme.card_shadow}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <h4 className={`font-semibold ${theme.text_title}`}>Aktivitas</h4>
            </div>
            <p className={`text-sm ${theme.text_default_light}`}>
              {dataUsers?.length || 0} pengguna terdaftar di platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminPage;
