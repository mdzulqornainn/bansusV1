import { TimelineItem } from "@/components/oprec/type";
import { Card } from "@/components/ui/card/card";
import { theme } from "@/lib/theme";
import { Clock } from "lucide-react";

interface TimelineSectionProps {
  timeline: TimelineItem[];
  title?: string;
  subtitle?: string;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  timeline,
  title = "Timeline Seleksi",
  subtitle = "Ikuti setiap tahapan seleksi dengan baik untuk memastikan peluang terbaik Anda",
}) => {
  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold ${theme.text_title} mb-6`}>
            {title.split(" ")[0]}{" "}
            <span className="">
              {title.split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p className={`text-xl ${theme.text_default} max-w-3xl mx-auto`}>{subtitle}</p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 md:-ml-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-400 to-sky-600"></div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-4 md:left-1/2 md:-ml-3 w-6 h-6 rounded-full border-4 ${
                    item.status === "active"
                      ? "bg-sky-400 border-sky-300"
                      : item.status === "completed"
                        ? "bg-green-400 border-green-300"
                        : "bg-gray-600 border-gray-500" // garis bulet di timeliene
                  }`}
                ></div>

                {/* Content */}
                <div
                  className={`ml-16 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? "md:mr-8 md:text-right" : "md:ml-8"
                  }`}
                >
                  <Card
                    variant={item.status === "active" ? "active" : "default"}
                  >
                    <div className={`${theme.text_title} font-semibold mb-2`}>
                      {item.date}
                    </div>
                    <h3 className={`text-xl font-bold ${theme.text_default} mb-3`}>
                      {item.title}
                    </h3>
                    <p className={`${theme.text_default}`}>{item.description}</p>
                    {item.status === "active" && (
                      <div className={`mt-4 flex items-center ${theme.text_title}`}>
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">Sedang Berlangsung</span>
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
