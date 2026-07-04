import { Benefit, Requirement } from "@/components/oprec/type";
import { Card } from "@/components/ui/card/card";
import { theme } from "@/lib/theme";
import { CheckCircle } from "lucide-react";

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
    <section id="syarat" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold ${theme.text_title} mb-6`}>
            {title.split(" &")[0]} &{" "}
            <span className="">
              {title.split("& ")[1]}
            </span>
          </h2>
          <p className={`text-xl ${theme.text_default} max-w-3xl mx-auto`}>{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 w-full max-w-3xl mx-auto gap-8 mb-16">
          {/* Requirements */}
          <Card
            variant="default">
            <h3 className={`text-2xl font-bold ${theme.text_title} mb-6 flex items-center`}>
              <CheckCircle className={`w-6 h-6 ${theme.text_title} mr-3`}/>
              Persyaratan
            </h3>
            <div className="space-y-4">
              {requirements.map((req, index) => (
                <div key={index} className={`flex items-center ${theme.text_default}`}>
                  <div className={`${theme.text_title} mr-3`}>{req.icon}</div>
                  <span>{req.text}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Benefits */}
        <Card variant="active" className={`p-12`}>
          <h3 className={`text-3xl font-bold ${theme.text_title} text-center mb-12`}>
            Keuntungan Menjadi Asdos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className={`${theme.text_title} mb-4 flex justify-center`}>
                  {benefit.icon}
                </div>
                <h4 className={`text-xl font-bold ${theme.text_title} mb-2`}>
                  {benefit.title}
                </h4>
                <p className={`${theme.text_default}`}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};
