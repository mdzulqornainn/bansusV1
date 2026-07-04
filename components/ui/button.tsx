import { theme } from "@/lib/theme";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  href?: string;
  download?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  href,
  download,
  loading = false,
  onClick,
  className = "",
}: ButtonProps) => {
  const baseClasses =
    "group flex items-center justify-center rounded-md font-semibold transition-all duration-300 cursor-pointer disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 hover:brightness-110 transition-all duration-300",
    secondary: 
      `${theme.hover_glow_light} px-8 py-4 text-lg rounded-full ${theme.table_highlight} text-sky-400`, // text biru, bg white
    outline:
      "border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10",
    danger: "text-white border border-red-500/30 hover:bg-red-500/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} download={download} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} disabled={loading}>
      {children}
    </button>
  );
};
