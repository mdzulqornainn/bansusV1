import { Zap, ChevronRight, Download } from "lucide-react";
import { InformationHero, TimelineOprec } from "@/components/oprec/type";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  timelineOprec: TimelineOprec;
  informationHero: InformationHero[];
  title: string;
  subtitle: string;
  year: number;
  registrationLink: string;
  guideDownloadLink: string;
}

export const HeroSection = ({
  timelineOprec,
  informationHero,
  title,
  subtitle,
  year,
  registrationLink,
  guideDownloadLink,
}: HeroSectionProps) => {
  return (
    <section className="pt-36 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/80 border border-slate-200/80 rounded-full px-5 py-1.5 mb-8 backdrop-blur shadow-sm hover:border-[#0B5EA8]/30 transition-all">
            <Zap className="w-4 h-4 text-[#0B5EA8] mr-2 animate-pulse" />
            <span className="text-slate-700 font-bold text-xs tracking-wide">
              Periode Pendaftaran: {timelineOprec.start} - {timelineOprec.end}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 tracking-tight mb-6 leading-[1.15]">
            <span className="bg-gradient-to-r from-[#0B5EA8] to-cyan-600 bg-clip-text text-transparent">
              {title}
            </span>
            <br />
            <span className="text-slate-700">Asisten Dosen {year}</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              href={registrationLink}
              size="lg"
              className="w-full sm:w-auto px-8 py-4 bg-[#0B5EA8] hover:bg-[#094d8a] text-white font-bold rounded-xl shadow-md transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] text-sm tracking-wide"
            >
              Daftar Sekarang
              <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href={guideDownloadLink}
              download
              className="w-full sm:w-auto px-8 py-4 bg-white/80 hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200/60 transition-all duration-200 text-sm tracking-wide shadow-sm"
            >
              <Download className="w-4 h-4 mr-2 text-slate-500" />
              Download Surat Pernyataan
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {informationHero.map((item, index) => (
            <div 
              key={index}
              className="bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-[0_4px_20px_rgba(11,94,168,0.03)] text-center group hover:border-[#0B5EA8]/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#0B5EA8] to-cyan-600 bg-clip-text text-transparent mb-2">
                {item.value}
              </div>
              <div className="text-xs md:text-sm font-bold text-slate-500 group-hover:text-slate-700 transition-colors tracking-wide uppercase">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};