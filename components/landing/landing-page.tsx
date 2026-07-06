import { theme } from "@/lib/theme";
import { BookOpen, Calendar, Clock, Database, Users } from "lucide-react";

const LabkomLanding = () => {
  const mainFeatures = [
    {
      icon: <Calendar className="w-8 h-8 text-blue-400" />,
      title: "Modul Jadwal Praktikum",
      description:
        "Pembuatan dan pengelolaan jadwal praktikum (CRUD), pencarian jadwal by dosen/mata kuliah, dan open recruitment asisten dosen",
    },
    {
      icon: <Database className="w-8 h-8 text-green-400" />,
      title: "Dataset Research Collection",
      description:
        "Upload data penelitian, organisasi dan kategorisasi data, pencarian dataset by topik/jenis/nama, serta unduh/akses data",
    },
    {
      icon: <Users className="w-8 h-8 text-purple-400" />,
      title: "Modul Layanan Lab",
      description:
        "Contact person, reservasi ruangan lab (pelatihan, etc.), peminjaman alat/perangkat, dan post berita/blog/modul",
    },
  ];

  return (
    <div className={`min-h-screen relative isolate overflow-x-hidden ${theme.root_background}`}>
       <style>{`
         .unila-dot-matrix {
           background-image: radial-gradient(rgba(11, 94, 168, 0.18) 2px, transparent 2px);
           background-size: 2.5rem 2.5rem;
         }
         .neon-glow {
           background-image: radial-gradient(circle, rgba(11, 94, 168, 0.35) 100%, transparent 100%);
           filter: blur(100px);
         }
       `}</style>
     
       <div className="absolute inset-0 unila-dot-matrix pointer-events-none z-[-1]"></div>
       <div className="absolute top-[-5%] left-[-5%] w-[650px] h-[650px] neon-glow opacity-50 pointer-events-none z-[-1] animate-pulse [animation-duration:12s]"></div>
       <div className="absolute top-[35%] right-[-10%] w-[650px] h-[650px] neon-glow opacity-50 pointer-events-none z-[-1] animate-pulse [animation-duration:12s]"></div>
       <div className="absolute top-[50%] left-[-5%] w-[650px] h-[650px] neon-glow opacity-50 pointer-events-none z-[-1] animate-pulse [animation-duration:12s]"></div>
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="hidden md:block h-12"></div>
      
        <div className="max-w-7xl mx-auto text-center grow flex flex-col justify-center items-center">
          <div className={`inline-flex items-center bg-[#0B5EA8]/5 border border-[#0B5EA8]/20 rounded-full px-6 py-2 mb-8 backdrop-blur-sm shadow-[0_2px_10px_rgba(11,94,168,0.03)]`}>
            <BookOpen className="w-4 h-4 text-[#0B5EA8] mr-2" />
            <span className="text-[#0B5EA8] font-semibold text-sm">
              Sistem Praktikum Digital {new Date().getFullYear()}
            </span>
          </div>
      
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 tracking-tight mb-6 leading-[1.15]">
            Web Labkom <br></br> <span className="bg-gradient-to-r from-[#0B5EA8] to-cyan-600 bg-clip-text text-transparent">Praktikum</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 mb-14 max-w-2xl mx-auto leading-relaxed font-medium">
            Platform terintegrasi untuk pengelolaan praktikum Jurusan Ilmu
            Komputer. Jadwal, dataset research, dan layanan laboratorium dalam
            satu sistem.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center pointer-events-none select-none animate-bounce [animation-duration:1.5s]">
          <div className="w-6 h-10 border-2 border-[#0B5EA8]/30 rounded-full flex justify-center p-1 bg-white/60 backdrop-blur-sm shadow-[0_4px_12px_rgba(11,94,168,0.04)]">
            <div className="w-1.5 h-2 bg-[#0B5EA8]/70 rounded-full mt-1"></div>
          </div>
          <span className="mt-2 text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 bg-linear-to-r from-[#0B5EA8] to-cyan-600 bg-clip-text  opacity-80">
            Scroll Down
          </span>
        </div>
      
      </section>

      {/* Main Features Section */}
      <section id="modules" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${theme.text_fmipa} mb-6`}>
              Modul <span className="">Utama</span>
            </h2>
            <p className={`text-xl ${theme.text_default} max-w-3xl mx-auto`}>
              Tiga modul inti yang dirancang khusus untuk kebutuhan praktikum
              dan penelitian
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                className={`${theme.card_background} ${theme.card_hover} rounded-2xl p-6 ${theme.card_shadow} transition-all duration-300 group`}
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className={`${theme.text_title} text-2xl`}>{feature.icon}</span>
                </div>

                {/* Title */}
                <h3 className={`text-xl font-semibold mb-2 text-left ${theme.text_card}`}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className={`${theme.text_card} text-justify leading-relaxed`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Status */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className={`${theme.card_modal} ${theme.card_shadow} border border-slate-700/50 rounded-2xl p-12 text-center`}
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 ${theme.card_background} rounded-full mb-6`}>
              <Clock className={`w-8 h-8 text-white}`} />
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold ${theme.text_fmipa} mb-6`}>
              Dalam Tahap Pengembangan
            </h2>
            <p className={`${theme.text_default} text-xl mb-8 max-w-2xl mx-auto`}>
              *untuk pengembangan selanjutnya - Sistem ini sedang dikembangkan
              untuk memenuhi kebutuhan praktikum yang lebih efisien dan
              terintegrasi
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabkomLanding;
