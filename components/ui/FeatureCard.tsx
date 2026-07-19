// components/ui/FeatureCard.tsx
import { theme } from "@/lib/theme";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

export const FeatureCard = ({ icon, title, description, href }: FeatureCardProps) => {
  const CardContent = () => (
    <div className={`${theme.card_landing} h-full`}>
      <div>
        <div className={theme.card_landing_icon_wrapper}>
          <div className={theme.card_landing_icon_inner}>{icon}</div>
        </div>
        <h3 className={theme.card_landing_title}>{title}</h3>
        <p className={theme.card_landing_description}>{description}</p>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{CardContent()}</a>;
  }
  return <CardContent />;
};
