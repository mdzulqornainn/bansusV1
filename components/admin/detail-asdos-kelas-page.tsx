"use client";

import { theme } from "@/lib/theme";
import { TGetClass } from "@/lib/types";
import {
  ArrowLeft,
  BookOpen,
  Building,
  Calendar,
  Phone,
  TvMinimal,
  User,
} from "lucide-react";
import Link from "next/link";

interface DetailAsdosKelasPageProps {
  dataClass: TGetClass;
}

const InfoCard = ({
  icon: Icon,
  title,
  value,
  className = "",
}: {
  icon?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  title: string;
  value: string;
  className?: string;
}) => (
  <div
    className={`
      ${theme.card_sub_background}
      ${className}`}
  >
    <div className="flex items-start gap-3">
      {Icon && (
        <div className={`p-2 ${theme.logo_background} rounded-lg shrink-0`}>
          <Icon className={`h-4 w-4 text-white`} />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <dt className={`text-sm font-medium ${theme.text_title}`}>{title}</dt>
        <dd className={`text-sm ${theme.text_default} break-words`}>{value}</dd>
      </div>
    </div>
  </div>
);

const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="mb-6">
    <h2 className={`text-xl font-bold ${theme.text_title}`}>{title}</h2>
    {subtitle && (
      <p className={`text-sm ${theme.text_default} mt-1`}>{subtitle}</p>
    )}
  </div>
);

const DetailAsdosKelasPage = ({ dataClass }: DetailAsdosKelasPageProps) => {
  if (!dataClass) {
    return (
      <div className="min-h-screen p-6 lg:ml-48">
        <div className="max-w-4xl mx-auto">
          <div className={`${theme.card_default}`}>
            <div className={`border-b ${theme.border_outside}`}>
              <h1 className={`text-3xl font-bold ${theme.text_title}`}>
                Detail Kelas
              </h1>
              <p className={`text-sm ${theme.text_default_blue} mb-6 mt-3`}>
                Data tidak ditemukan
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen p-6 lg:ml-48">
      {/* Back Button */}
      <Link href="/admin/asdos/kelas" className={`${theme.icon_link}`}>
        <ArrowLeft className={`${theme.icon_arrow_left}`} />
        <span>Kembali ke Daftar</span>
      </Link>

      <div className={`${theme.card_max_4_fit}`}>
        {/* Header Card */}
        <div className={`${theme.card_default}`}>
          <h1 className={`text-3xl font-bold ${theme.text_title} pb-3 mb-4`}>
            Kelas {dataClass?.name}
          </h1>
          <div
            className={`flex flex-wrap items-center gap-2 text-sm ${theme.text_default_light}`}
          >
            <span className={`${theme.card_background} px-3 py-1`}>
              {dataClass?.course?.semester.prodi.name}
            </span>
            <span className={`${theme.text_default}`}>•</span>
            <span>Semester {dataClass.course?.semester.semesterNumber}</span>
            <span className={`${theme.text_default}`}>•</span>
            <span>{dataClass?.course?.name}</span>
          </div>
        </div>

        <div className={`${theme.card_default}`}>
          <SectionHeader
            title="Informasi Mata Kuliah"
            subtitle="Detail informasi kelas dan mata kuliah"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoCard
              icon={Building}
              title="ID Kelas"
              value={dataClass?.id || "-"}
            />
            <InfoCard
              icon={TvMinimal}
              title="Program Studi"
              value={dataClass?.course?.semester.prodi.name || "-"}
            />
            <InfoCard
              icon={Calendar}
              title="Semester"
              value={
                dataClass?.course?.semester.semesterNumber?.toString() || "-"
              }
            />
            <InfoCard
              icon={BookOpen}
              title="Mata Kuliah"
              value={`${dataClass?.course?.name || ""} ${dataClass?.course?.code ? `(${dataClass.course.code})` : ""}`}
              className="md:col-span-2 lg:col-span-3"
            />
          </div>
        </div>

        <div className={`${theme.card_default}`}>
          <SectionHeader
            title="Jadwal Mata Kuliah"
            subtitle="Detail jadwal kelas dan mata kuliah"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoCard
              icon={Building}
              title="Jam"
              value={
                `${dataClass?.jadwalPraktikum?.mulai || "-"} - ${dataClass?.jadwalPraktikum?.selesai || "-"}` ||
                "-"
              }
            />
            <InfoCard
              icon={Building}
              title="Hari"
              value={dataClass?.jadwalPraktikum?.hari || "-"}
            />
            <InfoCard
              icon={Calendar}
              title="Ruangan"
              value={dataClass?.jadwalPraktikum?.ruangan || "-"}
            />
          </div>
        </div>

        {/* Assistant Information */}
        {dataClass.classAsdos && dataClass.classAsdos.length > 0 && (
          <div className={`${theme.card_default}`}>
            <SectionHeader
              title="Asisten Praktikum"
              subtitle={`${dataClass.classAsdos.length} asisten praktikum terdaftar`}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {dataClass.classAsdos.map((dataAsdos, index) => (
                <div key={index} className={`${theme.card_sub_background}`}>
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 ${theme.logo_background} rounded-lg shrink-0`}
                    >
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold ${theme.text_title} mb-1`}>
                        Asisten {index + 1}
                      </h3>
                      <p className={`text-sm ${theme.text_default} mb-2`}>
                        {dataAsdos.asdos.user.name || "-"}
                      </p>
                      <div className="space-y-1">
                        <div
                          className={`flex items-center gap-2 text-xs ${theme.text_default}`}
                        >
                          <span>NPM:</span>
                          <span className="font-medium">
                            {dataAsdos.asdos.npm || "-"}
                          </span>
                        </div>
                        {dataAsdos.asdos.whatsapp && (
                          <div
                            className={`flex items-center gap-2 text-xs ${theme.text_default}`}
                          >
                            <Phone className="h-3 w-3" />
                            <span>{dataAsdos.asdos.whatsapp}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lecturer Information */}
        <div className={`${theme.card_default}`}>
          <SectionHeader
            title="Dosen Pengampu"
            subtitle={
              dataClass.classDosen
                ? `${dataClass.classDosen.length} dosen terdaftar`
                : "Belum ada dosen terdaftar"
            }
          />

          {dataClass.classDosen && dataClass.classDosen.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {dataClass.classDosen.map((dataDosen, index) => (
                <div key={index} className={`${theme.card_sub_background}`}>
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 ${theme.logo_background} rounded-lg shrink-0`}
                    >
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold ${theme.text_title} mb-1`}>
                        Dosen {index + 1}
                      </h3>
                      <p className={`text-sm ${theme.text_default} mb-2`}>
                        {dataDosen.dosen.namaDosen || "-"}
                      </p>
                      <div
                        className={`flex items-center gap-2 text-xs ${theme.text_default}`}
                      >
                        <span>NIP:</span>
                        <span className="font-medium">
                          {dataDosen.dosen.nip || "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className={`${theme.card_sub_background} inline-block`}>
                <User
                  className={`h-8 w-8 ${theme.text_default_light} mx-auto mb-2`}
                />
                <p className={`${theme.text_default} text-sm`}>
                  Data dosen tidak ditemukan
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Timestamps */}
        <div className={`${theme.card_default}`}>
          <SectionHeader
            title="Informasi Waktu"
            subtitle="Riwayat pembuatan dan pembaruan data"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard
              icon={Calendar}
              title="Tanggal Dibuat"
              value={formatDate(dataClass?.createdAt ?? new Date())}
            />
            <InfoCard
              icon={Calendar}
              title="Terakhir Diperbarui"
              value={formatDate(
                dataClass?.updatedAt ?? dataClass?.createdAt ?? new Date()
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailAsdosKelasPage;
