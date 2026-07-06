import { TimelineItem } from "@/components/oprec/type";
import { Clock, CheckCircle2 } from "lucide-react";

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
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-4">
            {title.split(" ")[0]}{" "}
            <span className="bg-gradient-to-r from-[#0B5EA8] to-cyan-600 bg-clip-text text-transparent">
              {title.split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-slate-500 font-medium">{subtitle}</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 md:-ml-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0B5EA8] to-cyan-500 opacity-30"></div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div key={index} className="relative flex flex-col md:flex-row items-start md:justify-between">
                
                {/* Timeline Dot */}
                <div
                  className={`absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-4 bg-white z-20 transition-all duration-300 ${
                    item.status === "active"
                      ? "border-[#0B5EA8] scale-125 shadow-[0_0_12px_rgba(11,94,168,0.5)]"
                      : item.status === "completed"
                        ? "border-green-500"
                        : "border-slate-300"
                  }`}
                ></div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[45%] ${index % 2 === 0 ? "md:text-right md:ml-auto" : "md:mr-auto"}`}>
                  <div className={`bg-white/70 backdrop-blur-md border rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300 ${
                    item.status === "active" ? "border-[#0B5EA8]/40 shadow-[0_8px_30px_rgba(11,94,168,0.06)] bg-white/90" : "border-white/60"
                  }`}>
                    <div className={`text-xs font-bold mb-1.5 tracking-wider uppercase ${
                      item.status === "active" ? "text-[#0B5EA8]" : item.status === "completed" ? "text-green-600" : "text-slate-400"
                    }`}>
                      {item.date}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.description}</p>
                    
                    {item.status === "active" && (
                      <div className="mt-4 inline-flex items-center text-xs font-bold text-[#0B5EA8] bg-[#0B5EA8]/5 px-2.5 py-1 rounded-full animate-pulse">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        <span>Sedang Berlangsung</span>
                      </div>
                    )}
                    {item.status === "completed" && (
                      <div className="mt-4 inline-flex items-center text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                        <span>Selesai</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};