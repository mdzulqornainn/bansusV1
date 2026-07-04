import { theme } from "@/lib/theme";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface FormCheckboxProps {
  name: string;
  label: string;
  description?: string;
  register: UseFormRegister<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  className?: string;
}

export const FormCheckbox = ({
  name,
  label,
  description,
  register,
  className = "",
}: FormCheckboxProps) => {
  return (
    <div
      className={`flex items-start space-x-4 p-4 bg-black/30 rounded-lg border border-gray-700 ${theme.hover_default_no_scale_bg} transition-colors ${className}`}
    >
      <input
        {...register(name)}
        type="checkbox"
        id={name}
        className={`mt-1 h-5 w-5 accent-sky-400 cursor-pointer`}
      />
      <div>
        <label
          htmlFor={name}
          className="text-white font-semibold cursor-pointer"
        >
          {label}
        </label>
        {description && (
          <p className={`${theme.text_title} text-sm mt-1`}>{description}</p>
        )}
      </div>
    </div>
  );
};
