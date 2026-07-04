import { Zap, ChevronRight, Download } from "lucide-react";
import { InformationHero, TimelineOprec } from "@/components/oprec/type";
import { Badge } from "@/components/ui/badge";
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
    <section className="pt-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="warning" className="mb-8">
            <Zap className="w-4 h-4 mr-2" />
            <span className="text-sm">
              Periode Pendaftaran: {timelineOprec.start} - {timelineOprec.end}
            </span>
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              {title}
            </span>
            <br />
            Asisten Dosen {year}
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              href={registrationLink}
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              Daftar Sekarang
              <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href={guideDownloadLink}
              download
            >
              <Download className="w-5 h-5 mr-2" />
              Download Surat Pernyataan
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {informationHero.map((item, index) => (
            <div className="text-center" key={index}>
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                {item.value}
              </div>
              <div className="text-gray-300">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
