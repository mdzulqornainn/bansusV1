"use client";

import { theme } from "@/lib/theme";

interface ScrollDownProps {
  text?: string;
  targetId?: string; // ID elemen tujuan saat diklik (opsional, untuk smooth scroll)
}

export const ScrollDownIndicator = ({ text = "Scroll Down", targetId = "modules" }: ScrollDownProps) => {
  const handleScroll = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      onClick={handleScroll}
      className="flex flex-col items-center justify-center cursor-pointer pointer-events-auto select-none animate-bounce [animation-duration:1.5s] py-4 mx-auto w-fit"
    >
      {/* Bentuk Mouse/Kapsul */}
      <div className="w-6 h-10 border-2 border-[#0B5EA8]/30 rounded-full flex justify-center p-1 bg-white/60 backdrop-blur-sm shadow-[0_4px_12px_rgba(11,94,168,0.04)] hover:border-[#0B5EA8]/60 transition-colors">
        <div className="w-1.5 h-2 bg-[#0B5EA8]/70 rounded-full mt-1 animate-pulse"></div>
      </div>

      {/* Teks dengan Gradient */}
      <span className="mt-2 text-[10px] font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[#0B5EA8] to-cyan-600 bg-clip-text text-transparent opacity-90">
        {text}
      </span>
    </div>
  );
};
