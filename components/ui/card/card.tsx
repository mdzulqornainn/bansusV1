import { theme } from "@/lib/theme";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "active" | "gradient";
  className?: string;
}

export const Card = ({
  children,
  variant = "default",
  className = "",
}: CardProps) => {
  const variants = {
    default:
      `${theme.card_elegant} ${theme.card_shadow} backdrop-blur-sm border ${theme.hover_glow_light}}`,
    active:
      `${theme.hover_glow_light} ${theme.card_shadow}`,
    gradient:
      `${theme.card_modal} ${theme.card_shadow}`,
  };

  return (
    <div
      // className={`rounded-2xl p-6 hover:bg-gray-800/70 transition-all duration-300 ${variants[variant]} ${className}`}
      className={`rounded-2xl p-6 transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
};
