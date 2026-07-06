import { Benefit, Requirement } from "@/components/oprec/type";
import { CheckCircle2 } from "lucide-react";

interface RequirementsSectionProps {
  requirements: Requirement[];
  benefits: Benefit[];
  title?: string;
  subtitle?: string;
}

export const RequirementsSection = ({
  requirements,
  benefits,
  title = "Syarat & Ketentuan",
  subtitle = "Pastikan Anda memenuhi semua persyaratan berikut sebelum mendaftar",
}: RequirementsSectionProps) => {
  return (
    <section id="syarat" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-4">
            {title.split(" &")[0]} &{" "}
            <span className="bg-gradient-to-r from-[#0B5EA8] to-cyan-600 bg-clip-text text-transparent">
              {title.split("& ")[1]}
            </span>
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-slate-500 font-medium">{subtitle}</p>
        </div>

        {/* Requirements */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center tracking-tight">
              <CheckCircle2 className="w-5 h-5 text-[#0B5EA8] mr-3" />
              Kriteria Persyaratan Umum
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-start p-3 rounded-xl hover:bg-white/50 transition-colors">
                  <div className="text-[#0B5EA8] mt-0.5 mr-4 shrink-0 bg-[#0B5EA8]/5 p-1.5 rounded-lg">
                    {req.icon}
                  </div>
                  <span className="text-sm font-semibold text-slate-600 leading-relaxed pt-0.5">{req.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-b from-white/40 to-transparent border border-white/40 rounded-3xl p-10 md:p-12 shadow-sm">
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 text-center mb-12 tracking-tight">
            Keuntungan Menjadi Asisten Dosen
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(11,94,168,0.04)]">
                <div className="text-[#0B5EA8] mb-4 bg-[#0B5EA8]/5 w-12 h-12 flex items-center justify-center rounded-xl shadow-inner">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2 tracking-tight">
                  {benefit.title}
                </h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed text-justify">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};