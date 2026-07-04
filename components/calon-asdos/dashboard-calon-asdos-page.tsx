// Updated DashboardCalonAsdosPage with style similar to DashboardAsdosPage

"use client";

import { timeline } from "@/data/static-data";
import { theme } from "@/lib/theme";
import { TCurrentUser } from "@/lib/types";
import { CheckCircle } from "lucide-react";

interface DashboardCalonAsdosPageProps {
  user: TCurrentUser;
}

const DashboardCalonAsdosPage = ({ user }: DashboardCalonAsdosPageProps) => {
  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="lg:ml-64">
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className={`${theme.card_blue} ${theme.card_shadow} p-8`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-2">
              <h1 className={`text-3xl font-bold ${theme.text_title}`}>
                Dashboard Calon Asisten Dosen
              </h1>
              <p className={`${theme.text_default_light} text-lg`}>
                Selamat datang kembali,{" "}
                <span className={theme.text_title}>{user?.name}</span>
              </p>
              <p className={`${theme.text_default_light} text-sm`}>
                Pantau proses pendaftaran Anda
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

        {/* Status */}
        <div className={`${theme.card_green} ${theme.card_shadow} p-6`}>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-400/20 rounded-full">
              <CheckCircle className="text-green-400 w-8 h-8" />
            </div>
            <div className="flex-1">
              <h2 className={`text-2xl font-bold text-green-400 mb-2`}>
                Pendaftaran Berhasil Diterima
              </h2>
              <p className={`${theme.text_default_light} leading-relaxed mb-4`}>
                Terima kasih sudah mendaftar sebagai{" "}
                <span className="font-semibold text-green-400">
                  Asisten Dosen
                </span>
                . Tim sedang mengevaluasi semua aplikasi.
              </p>
              <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-4">
                <p className="text-green-400 text-sm font-medium">
                  Tips. Pastikan Anda rutin memantau informasi terbaru
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className={`${theme.card_purple} ${theme.card_shadow} p-6`}>
          <h3 className={`text-xl font-bold text-purple-400 mb-4`}>
            Langkah Berikutnya
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-400 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">
                  {step}
                </div>
                <div>
                  {step === 1 && (
                    <>
                      <h4 className={`font-semibold text-purple-400 mb-1`}>
                        Monitor Akun
                      </h4>
                      <p className={`${theme.text_default_light} text-sm`}>
                        Cek aplikasi secara berkala
                      </p>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <h4 className={`font-semibold text-purple-400 mb-1`}>
                        Siapkan Mental
                      </h4>
                      <p className={`${theme.text_default_light} text-sm`}>
                        Persiapkan diri untuk wawancara
                      </p>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <h4 className={`font-semibold text-purple-400 mb-1`}>
                        Tunggu Pengumuman
                      </h4>
                      <p className={`${theme.text_default_light} text-sm`}>
                        Pengumuman pada tanggal {timeline[3].date}
                      </p>
                    </>
                  )}

                  {step === 4 && (
                    <>
                      <h4 className={`font-semibold text-purple-400 mb-1`}>
                        Hubungi Admin
                      </h4>
                      <p className={`${theme.text_default_light} text-sm`}>
                        Jika butuh bantuan. Kontak admin.
                        <br />
                        Raris Anggustianto. badankhusus26@gmail.com (0821-8110-0679)
                         {/* <br />
                        Wildan Mukmin. wildan.cooliah@gmail.com (0895640025480)
                        <br />
                        Rizky Kurnia Antasari. rizkypro27.co@gmail.com
                        (085768103057)// */}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCalonAsdosPage;
