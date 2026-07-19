// components/ui/InfoCard.tsx
import { theme } from "@/lib/theme";

interface InfoCardProps {
  icon: string;
  text: string;
  href?: string;
}

export const InfoCard = ({ icon, text, href }: InfoCardProps) => {
  const content = (
    <div className={`${theme.table_highlight} ${theme.hover_glow_light} px-6 py-3 rounded-full flex items-center justify-center gap-2 ${theme.text_title} transition-all`}>
      <span>{icon}</span> <span>{text}</span>
    </div>
  );

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
  }
  return <div>{content}</div>;
};
