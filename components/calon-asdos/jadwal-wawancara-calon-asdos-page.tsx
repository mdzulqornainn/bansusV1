import { Hourglass } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const isUrl = (string: string): boolean => {
  if (!string) return false;
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
};

function CardItem({
  iconColor,
  title,
  value,
  titleColor,
  bgColor,
  borderColor,
}: {
  iconColor: string;
  title: string;
  value: string;
  titleColor: string;
  bgColor: string;
  borderColor: string;
}) {
  return (
    <div
      className={`group flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-2xl bg-gradient-to-r ${bgColor} hover:from-white/60 hover:to-white/50 transition-all duration-300 border ${borderColor}`}
    >
      <div
        className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r ${iconColor} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <h3
          className={`text-xs md:text-sm font-medium ${titleColor} uppercase tracking-wide`}
        >
          {title}
        </h3>
        {isUrl(value) ? (
          <Link
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-lg font-semibold text-blue-600 hover:underline truncate block"
          >
            {value.replace(/^(https?:\/\/)/, "")}
          </Link>
        ) : (
          <p className="text-sm md:text-lg font-semibold text-gray-800 truncate">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

export default function JadwalWawancaraCalonAsdosPage() {
  const interviewData = {
    // get NPM / cocokin NPM untuk get datanya
    name: "Ahmad Rizky Pratama", // lom ada di database
    hari: "Senin, 28 Juli 2025", // lom ada di database
    jam: "10:00 WIB", // lom ada di database
    lokasi: "", //"Lab R1, Lt. 3", // <== Kalo Kosong -> JadwalTersedia jadi FALSE
    wawancara: "offline", // Meskipun lokasi KOSONG, tapi kalo ini 'Online' => QR CODE + LINK
  };

  if (interviewData.wawancara === "online") {
    interviewData.lokasi = "https://meet.google.com/bss-xjct-dfx";
  }

  const jadwalTersedia =
    interviewData.hari && interviewData.jam && interviewData.lokasi;

  return (
    <div className="min-h-screen px-3 md:px-6 lg:px-8 py-6 text-sm md:text-base">
      <div className="space-y-6 lg:ml-62 ">
        <div className="relative backdrop-blur-lg bg-white/5 border border-white/30 shadow-xl rounded-3xl p-4 md:p-6">
          <h1 className="text-3xl font-semibold bg-gradient-to-r text-center pb-6 from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Jadwal Wawancara
          </h1>

          <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-yellow-200/30 to-amber-300/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-tr from-yellow-100/40 to-orange-200/40 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {jadwalTersedia ? (
                <>
                  <CardItem
                    iconColor="from-emerald-400 to-teal-500"
                    title="Nama Lengkap"
                    value={interviewData.name}
                    titleColor="text-emerald-700"
                    bgColor="from-emerald-50/50 to-teal-50/50"
                    borderColor="border-emerald-100/50"
                  />
                  <CardItem
                    iconColor="from-pink-400 to-rose-500"
                    title="Hari"
                    value={interviewData.hari}
                    titleColor="text-pink-700"
                    bgColor="from-pink-50/50 to-rose-50/50"
                    borderColor="border-pink-100/50"
                  />
                  <CardItem
                    iconColor="from-orange-400 to-red-500"
                    title="Jam Wawancara"
                    value={interviewData.jam}
                    titleColor="text-orange-700"
                    bgColor="from-orange-50/50 to-red-50/50"
                    borderColor="border-orange-100/50"
                  />
                  <CardItem
                    iconColor="from-purple-400 to-indigo-500"
                    title="Lokasi"
                    value={interviewData.lokasi}
                    titleColor="text-purple-700"
                    bgColor="from-purple-50/50 to-indigo-50/50"
                    borderColor="border-purple-100/50"
                  />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center md:col-span-2">
                  <div className="relative w-full h-full overflow-hidden min-h-[150px] rounded-3xl shadow-2xl border border-amber-400/30 backdrop-blur-xl bg-gradient-to-r from-amber-500/20 via-yellow-400/20 to-orange-500/20">
                    {/* Background Decoration */}
                    <div className="absolute inset-0 z-0">
                      <div className="w-full h-full bg-gradient-to-r from-amber-500/5 to-yellow-400/5"></div>
                      <div className="absolute opacity-10 w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 blur-3xl top-[-2rem] right-[-2rem]"></div>
                      <div className="absolute opacity-20 w-24 h-24 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full blur-2xl bottom-[-1rem] left-[1rem]"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full p-4 pr-12 md:pr-16">
                      <p className="text-gray-300 text-md md:text-lg text-justify">
                        Jadwal wawancara Anda sedang kami susun dan akan segera
                        diinformasikan di halaman ini. Proses wawancara akan
                        dijadwalkan dalam periode 28 Juli - 2 Agustus 2025.
                        Mohon pastikan Anda dapat meluangkan waktu pada rentang
                        tanggal tersebut.
                      </p>
                    </div>

                    {/* Hourglass di pojok kanan bawah */}
                    <div className="absolute bottom-4 right-4 z-10">
                      <Hourglass className="w-5 h-5 md:w-6 md:h-6 text-amber-400 animate-flip-and-pause" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {jadwalTersedia && (
          <div className="bg-white/50 backdrop-blur-sm border border-yellow-300/50 rounded-2xl shadow-lg p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6">
              <div className="flex-1 mb-4 md:mb-0">
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center shadow">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-semibold text-amber-800 mb-1">
                      Catatan Penting
                    </h4>
                    <p className="text-xs md:text-sm text-amber-700 leading-relaxed">
                      Harap datang 15 menit sebelum waktu wawancara
                      {interviewData.wawancara === "Online"
                        ? " dan pastikan koneksi internet Anda stabil."
                        : " dan persiapkan diri Anda"}
                    </p>
                  </div>
                </div>
              </div>

              {interviewData.wawancara === "Online" && (
                <div className="flex-shrink-0 text-center">
                  <h5 className="text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Scan untuk bergabung
                  </h5>
                  <div className="bg-white p-2 rounded-lg shadow-inner border border-gray-200">
                    <Image
                      src="/qr/qr-oprec.png"
                      alt="QR Code Google Meet"
                      width={128}
                      height={128}
                      className="w-28 h-28 md:w-36 md:h-36"
                    />
                  </div>
                  <p className="text-xs text-gray-700 mt-2">
                    Atau klik tautan di atas
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
