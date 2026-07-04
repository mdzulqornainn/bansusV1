import { theme } from "@/lib/theme";
import React from "react";

interface FormButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const FormButton = ({
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  loadingText = "Loading...",
  onClick,
  children,
  className = "",
}: FormButtonProps) => {
  const baseClasses =
    "font-bold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl";

  const variantClasses = {
    primary: 
      // "bg-yellow-400 hover:bg-yellow-500 text-black",
      `${theme.button_square_pressed_blue}`,
    secondary: 
      "bg-gray-600 hover:bg-gray-700 text-white",
    danger: 
      "bg-red-600 hover:bg-red-700 text-white",
  };

  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-xl",
  };

  const disabledClasses =
    "disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none";

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {loading ? loadingText : children}
    </button>
  );
};
