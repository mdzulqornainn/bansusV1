import { theme } from "@/lib/theme";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "warning" | "success";
  className?: string;
}

export const Badge = ({
  children,
  variant = "default",
  className = "",
}: BadgeProps) => {
  const variants = {
    default: `${theme.background_guest_small_card}`,
    warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-300",
    success: "bg-green-500/10 border-green-500/20 text-green-300",
  };

  return (
    <div
      className={`inline-flex items-center border rounded-full px-6 py-2 ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
};
