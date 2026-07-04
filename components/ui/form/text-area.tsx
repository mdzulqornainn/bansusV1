import { theme } from "@/lib/theme";
import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface FormTextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  error?: FieldError;
  rows?: number;
  maxLength?: number;
  minLength?: number;
  currentLength?: number;
  className?: string;
}

export const FormTextarea = ({
  label,
  name,
  placeholder,
  required = false,
  register,
  error,
  rows = 6,
  maxLength,
  minLength,
  currentLength = 0,
  className = "",
}: FormTextareaProps) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-white font-semibold mb-3">
        {label} {required && <span className={`${theme.text_title}`}>*</span>}
      </label>
      <textarea
        {...register(name)}
        id={name}
        rows={rows}
        className={`w-full px-4 py-3 bg-black/50 border rounded-lg focus:outline-none text-white focus:placeholder-white resize-none transition-all duration-200 ${
          error?.message
            ? "border-red-400"
            : `${theme.highlight_filter}`
        }`}
        placeholder={placeholder}
      />
      <div className="flex justify-between mt-2">
        <div>
          {minLength && (
            <p className={`${theme.text_title} text-sm`}>
              Minimal {minLength} karakter
            </p>
          )}
          {error && (
            <p className="text-red-400 text-sm mt-1">{error.message}</p>
          )}
        </div>
        {maxLength && (
          <p
            className={`text-sm ${
              currentLength > maxLength ? "text-red-400" : `${theme.text_title}`
            }`}
          >
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};
