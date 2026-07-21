// components/ui/HeroSection.tsx
import { theme } from "@/lib/theme";
import { ScrollDownIndicator } from "@/components/ui/ScrollDownIndicator";

interface HeroProps {
  badgeText: React.ReactNode;
  badgeIcon?: React.ReactNode;
  title: React.ReactNode;
  description: string;
  showScrollDown?: boolean;
  scrollTargetId?: string;
  children?: React.ReactNode;
}

export const HeroSection = ({
  badgeText,
  badgeIcon,
  title,
  description,
  showScrollDown = false,
  scrollTargetId = "modules",
  children
}: HeroProps) => (
  <section className="lg:min-h-screen flex flex-col justify-between pt-16 lg:pt-20 pb-4 px-4 sm:px-6 lg:px-8 text-center relative z-10 overflow-hidden">
    <div className="max-w-4xl mx-auto my-auto">

      {/* Badge dengan Warna Gradient */}
      <div className={theme.hero_badge}>
        {badgeIcon && (
          <div className="w-5 h-5 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
            {badgeIcon}
          </div>
        )}
        <span className="text-white text-sm font-bold tracking-wide">
          {badgeText}
        </span>
      </div>

      {/* Heading */}
      <h1 className={theme.hero_heading}>
        {title}
      </h1>

      {/* Description */}
      <p className={theme.hero_description}>
        {description}
      </p>
    </div>

    {/* Stat Card / Children di dalam Hero Section */}
    {children && (
      <div className="w-full max-w-5xl mx-auto my-4 relative z-10">
        {children}
      </div>
    )}

    {/* Scroll Down Indicator */}
    {showScrollDown && (
      <div className="mt-2">
        <ScrollDownIndicator text="Scroll Down" targetId={scrollTargetId} />
      </div>
    )}
  </section>
);
