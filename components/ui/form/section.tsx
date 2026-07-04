import { theme } from "@/lib/theme";
import React from "react";

interface FormSectionProps {
  title: string;
  stepNumber: number;
  children: React.ReactNode;
  className?: string;
}

export const FormSection = ({
  title,
  stepNumber,
  children,
  className = "",
}: FormSectionProps) => {
  return (
    <section
      className={`bg-black/30 rounded-xl p-6 border ${theme.border_outside} ${className}`}
    >
      <h2 className={`text-xl font-bold ${theme.text_title} mb-6 flex items-center`}>
        <span className={`${theme.logo_background} text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3`}>
          {stepNumber}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
};

export default FormSection;
