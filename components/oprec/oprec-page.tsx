import {
  benefits,
  requirements,
  timeline,
  timelineOprec
} from "@/data/static-data";

import { HeroSection } from "@/components/oprec/hero";
import { RequirementsSection } from "@/components/oprec/requirement";
import { MatkulSection } from "@/components/oprec/subject";
import { TimelineSection } from "@/components/oprec/timeline";
import { TGetProdis } from "@/lib/types";

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
      value: `${count_matkul}`,
      description: "Mata Kuliah",
    },
    {
      value: "16",
      description: "Pertemuan/Semester",
    },
  ];
  return (
    <div className="min-h-screen relative isolate overflow-x-hidden bg-slate-50/40">
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
      <div className="absolute top-[-5%] left-[-5%] w-[650px] h-[650px] neon-glow opacity-60 pointer-events-none z-[-1] animate-pulse [animation-duration:12s]"></div>
      <div className="absolute top-[25%] right-[-10%] w-[650px] h-[650px] neon-glow opacity-50 pointer-events-none z-[-1] animate-pulse [animation-duration:16s]"></div>
      <div className="absolute top-[60%] left-[-10%] w-[650px] h-[650px] neon-glow opacity-50 pointer-events-none z-[-1] animate-pulse [animation-duration:16s]"></div>
      <div className="absolute top-[80%] right-[-10%] w-[650px] h-[650px] neon-glow opacity-50 pointer-events-none z-[-1] animate-pulse [animation-duration:16s]"></div>

      <div className="relative z-10">
        <HeroSection 
          timelineOprec={timelineOprec}
          informationHero={informationHero}
          title="Open Recruitment"
          subtitle="Bergabunglah dengan tim asdos terbaik! Kesempatan emas untuk mengembangkan kemampuan mengajar sambil mendapat penghasilan yang kompetitif."
          year={new Date().getFullYear()}
          registrationLink="/oprec/daftar"
          guideDownloadLink="/files/surat-pernyataan.docx"
        />

        <TimelineSection timeline={[...timeline]} />

        <RequirementsSection requirements={requirements} benefits={benefits} />

        <MatkulSection dataProdis={dataProdis} />
      </div>
    </div>
  );
};

export default OprecPage;