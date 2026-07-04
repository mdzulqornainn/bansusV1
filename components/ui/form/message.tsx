import React from "react";

interface FormMessageProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  className?: string;
}

export const FormMessage = ({
  message,
  type = "info",
  className = "",
}: FormMessageProps) => {
  const typeClasses = {
    success: "bg-green-800/20 text-green-400 border border-green-600",
    error: "bg-red-800/20 text-red-400 border border-red-600",
    info: "bg-blue-800/20 text-blue-400 border border-blue-600",
    warning: "bg-yellow-800/20 text-yellow-400 border border-yellow-600",
  };

  return (
    <p
      className={`mt-4 p-3 rounded-lg text-center ${typeClasses[type]} ${className}`}
    >
      {message}
    </p>
  );
};
