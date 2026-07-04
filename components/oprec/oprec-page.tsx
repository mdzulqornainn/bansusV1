import { Button } from "@/components/ui/button";
import {
  benefits,
  requirements,
  timeline,
  timelineOprec
} from "@/data/static-data";
import { ChevronRight, Download, Zap } from "lucide-react";

import { RequirementsSection } from "@/components/oprec/requirement";
import { MatkulSection } from "@/components/oprec/subject";
import { TimelineSection } from "@/components/oprec/timeline";
import { theme } from "@/lib/theme";
import { TGetProdis, TGetCourses } from "@/lib/types";

interface OprecPageProps {
  dataProdis: TGetProdis;
}

const OprecPage = ({ dataProdis }: OprecPageProps) => {
  const count_matkul =
    dataProdis?.reduce((total, prodi) => {
      return (
        total +
        prodi.semester.reduce((semesterTotal, semester) => {
          const activeCourses = semester.courses.filter(
            (course) => course.status === "aktif" 
          );
          return semesterTotal + activeCourses.length;
        }, 0)
      );
    }, 0) || 0;
  //   const matkulPerProdi = dataProdis?.map((prodi) => {
  //   const count = prodi.semester.reduce((sum, semester) => sum + semester.courses.length, 0);
  //   return {
  //     prodiId: prodi.id,
  //     prodiName: prodi.name,
  //     totalCourses: count,
  //   };
  // });
  const informationHero = [
    {
      value: `${count_matkul * 2}+`,
      description: "Posisi Tersedia",
    },
    {
      value: count_matkul,
      description: "Mata Kuliah",
    },
    {
      value: "16",
      description: "Pertemuan/Semester",
    },
  ];
  return (
    <>
      <section className="pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center bg-white/10 border ${theme.hover_glow_light} rounded-full px-6 py-2 mb-8 backdrop-blur`}>
              <Zap className={`w-4 h-4 ${theme.text_title} mr-2`} />
              <span className={`${theme.text_title} text-sm`}>
                Periode Pendaftaran: {timelineOprec.start} - {timelineOprec.end}
              </span>
            </div>
            <h1 className={`text-5xl md:text-7xl font-bold ${theme.text_gradasi_cyan_sky} mb-8 leading-tight`}>
              <span className="">
                Open Recruitment
              </span>
              <br />
              Asisten Dosen {new Date().getFullYear()}
            </h1>

            <p className={`text-xl ${theme.text_default} mb-12 max-w-3xl mx-auto leading-relaxed`}>
              Bergabunglah dengan tim asdos terbaik! Kesempatan emas untuk
              mengembangkan kemampuan mengajar sambil mendapat penghasilan yang
              kompetitif.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

              {/* Oprec Ditutup */}
              
              {/* <h3 className={`text-l md:text-2xl font-bold ${theme.status_warning} hover:bg-red-500 transition-all duration-300 ease-in-out transform mb-8 leading-tight`}>Oprec Belum Dibuka</h3> */}


              {/* Tombol Daftar */}

              <Button // INI ADA KELASNYA SENDIRI DI button.tsx
                href="/oprec/daftar"
                size="lg"
                className={``}
              >
                Daftar Sekarang
                <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>



              {/* Surat Pernyataan disini */}

              <Button
                variant="secondary"
                size="lg"
                href="/files/surat-pernyataan.docx"
                download
              >
                <Download className={`w-5 h-5 mr-2`} />
                Download Surat Pernyataan
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {informationHero.map((item, index) => (
              <div className="text-center" key={index}>
                <div className={`text-4xl md:text-5xl font-bold ${theme.text_title} mb-2`}>
                  {item.value}
                </div>
                <div className={`${theme.text_default}`}>{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TimelineSection timeline={[...timeline]} />

      <RequirementsSection requirements={requirements} benefits={benefits} />

      <MatkulSection dataProdis={dataProdis} />
    </>
  );
};

export default OprecPage;
