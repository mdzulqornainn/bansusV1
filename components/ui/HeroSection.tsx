// components/ui/HeroSection.tsx
import { theme } from "@/lib/theme";

interface HeroProps {
  badgeText: string;
  badgeIcon: React.ReactNode; // Tambahkan prop ini
  title: React.ReactNode;
  description: string;
}

export const HeroSection = ({ badgeText, badgeIcon, title, description }: HeroProps) => (
  <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-center relative z-10">
    <div className="max-w-4xl mx-auto">
      <div className={theme.hero_badge}>
        <div className={`mr-2 ${theme.text_fmipa}`}>{badgeIcon}</div>
        <span className="text-slate-700 font-semibold text-xs tracking-wide">
          {badgeText} {new Date().getFullYear()}
        </span>
      </div>
      <h1 className={theme.hero_heading}>{title}</h1>
      <p className={theme.hero_description}>{description}</p>
    </div>
  </section>
);
