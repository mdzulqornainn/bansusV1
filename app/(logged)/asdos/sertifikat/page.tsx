import { Globe, Home, Zap } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 lg:ml-64">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-yellow-300 mb-10">
          Coming Soon
        </h1>
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Nantikan Fitur Selanjutnya
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Sepertinya Anda telah memasuki fitur yang masih dalam tahap
            pengembangan mohon nantikan perkembangan selanjut nya
          </p>
        </div>

        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2 text-yellow-300">
              <Zap className="w-5 h-5 animate-pulse" />
              <span>Mohon Bersabar</span>
            </div>
            <div className="flex items-center space-x-2 text-yellow-300">
              <Globe className="w-5 h-5 animate-spin" />
              <span>Dalam Pengembangan</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25"
          >
            <Home className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
            Kembali ke Rumah
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
