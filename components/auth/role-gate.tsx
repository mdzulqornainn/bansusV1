import { currentUserCached } from "@/lib/authenticate";
import { Role } from "@prisma/client";
import { Globe, Shield, Zap } from "lucide-react";
import Link from "next/link";

interface RoleGateProps {
  children: React.ReactNode;
  accessRole: Role;
}

const RoleGate = async ({ children, accessRole }: RoleGateProps) => {
  const user = await currentUserCached();
  if (user?.role !== accessRole) {
    return (
      <>
        <div className="z-1002 h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-red-950 to-black p-4 relative overflow-hidden">
          {/* ... Background dan Orbs tidak berubah ... */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
          <div className="absolute top-20 left-20 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-40 h-40 bg-orange-500/15 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-10 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>

          <div className="max-w-lg w-full relative z-10">
            {/* Main Danger Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-red-900/90 via-red-800/80 to-red-950/90 backdrop-blur-2xl border-2 border-red-500/30 rounded-3xl shadow-2xl shadow-red-900/50">
              {/* ... Elemen dekoratif kartu tidak berubah ... */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-500/5 via-transparent to-red-500/5 opacity-50"></div>
              <div className="absolute top-0 right-0 w-4 h-full bg-gradient-to-b from-yellow-400/20 to-red-600/20 transform skew-x-12"></div>
              <div className="absolute top-6 left-8 w-3 h-3 bg-yellow-400/60 rounded-full animate-bounce delay-100 shadow-lg shadow-yellow-400/50"></div>
              <div className="absolute top-12 right-12 w-2 h-2 bg-red-400/80 rounded-full animate-bounce delay-300 shadow-lg shadow-red-400/50"></div>
              <div className="absolute bottom-8 left-12 w-2.5 h-2.5 bg-orange-400/70 rounded-full animate-bounce delay-500 shadow-lg shadow-orange-400/50"></div>
              <div className="absolute bottom-16 right-8 w-1.5 h-1.5 bg-yellow-300/60 rounded-full animate-bounce delay-700"></div>

              {/* Content */}
              <div className="relative z-20 p-10 text-center">
                {/* Warning Icons Cluster */}
                {/* PERBAIKAN: Menambahkan padding (px-8) untuk memberi ruang bagi ikon absolut */}
                <div className="mb-8 relative px-8">
                  {/* Main Shield Icon */}
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-red-500/30 rounded-full animate-ping scale-150"></div>
                    <div className="absolute inset-0 bg-yellow-500/20 rounded-full animate-ping scale-125 delay-300"></div>
                    <div className="relative bg-gradient-to-br from-red-600 to-red-800 p-5 rounded-full shadow-2xl shadow-red-600/50 border-2 border-yellow-400/30 animate-pulse ">
                      <Shield className="w-10 h-10 text-yellow-300 animate-pulse" />
                    </div>
                  </div>

                  {/* Side Warning Icons */}
                  <div className="absolute top-0 left-0 transform -rotate-12 animate-spin delay-150">
                    <div className="relative  p-2 rounded-lg ">
                      <Globe className="w-5 h-5 text-orange-400 drop-shadow-lg" />
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 transform rotate-12 animate-pulse delay-450">
                    <div className="relative  p-2 rounded-lg">
                      <Zap className="w-5 h-5 text-orange-400 drop-shadow-lg" />
                    </div>
                  </div>
                </div>

                {/* Danger Title */}
                <div className="mb-4">
                  {/* PERBAIKAN: Memisahkan emoji dari teks yang diberi gradient */}
                  <h1 className="text-4xl font-black transform transition-all duration-500 drop-shadow-lg flex items-center justify-center gap-x-2">
                    <span className="text-yellow-300 animate-pulse">⚠️</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-300 to-red-400">
                      AKSES DITOLAK
                    </span>
                    <span className="text-yellow-300 animate-pulse">⚠️</span>
                  </h1>
                </div>

                {/* Warning Message */}
                <div className="mb-6 p-4 bg-black/30 rounded-xl border border-red-500/20 backdrop-blur-sm">
                  <p className="text-red-200 text-lg font-semibold leading-relaxed">
                    🚫 Zona Terbatas Terdeteksi
                  </p>
                  <p className="text-red-300/80 text-sm mt-2">
                    Kredensial keamanan Anda tidak memiliki clearance untuk
                    mengakses area ini.
                    <Link
                      href="/dashboard"
                      className={
                        "text-white hover:text-yellow-300 text-sm transition-colors "
                      }
                    >
                      {" "}
                      Beranda
                    </Link>
                  </p>
                </div>
              </div>

              {/* Bottom Danger Glow */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-transparent via-red-500/70 to-transparent blur-sm"></div>
            </div>

            {/* ... Indikator tidak berubah ... */}
            <div className="mt-4 flex justify-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-150 shadow-lg shadow-yellow-500/50"></div>
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse delay-300 shadow-lg shadow-orange-500/50"></div>
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse delay-450 shadow-lg shadow-red-600/50"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return <>{children}</>;
};
export default RoleGate;
