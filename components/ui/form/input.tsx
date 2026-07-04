import { theme } from "@/lib/theme";
import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  error?: FieldError;
  className?: string;
  disabled?: boolean;
  isAdmin?: boolean;
}

export const FormInput = ({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  register,
  error,
  className = "",
  disabled = false,
  isAdmin = false,
}: FormInputProps) => {
  if (isAdmin)
    return (
      <div className={className}>
        <label className={`block mb-1 text-sm font-medium ${theme.text_title}`}>
          {label} {required && <span className={`${theme.text_title}`}>*</span>}
        </label>
        <input
          {...register(name)}
          type={type}
          id={name}
          disabled={disabled}
          className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2  ${
            error?.message
              ? "border-red-400"
              : `${theme.highlight_filter}`
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          placeholder={placeholder}
        />
        {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
      </div>
    );
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-white font-semibold mb-3">
        {label} {required && <span className={`${theme.text_title}`}>*</span>}
      </label>
      <input
        {...register(name)}
        type={type}
        id={name}
        disabled={disabled}
        className={`w-full px-4 py-3 bg-black/50 border rounded-lg focus:outline-none text-white focus:placeholder-white transition-all duration-200 ${
          error?.message
            ? "border-red-400"
            : `${theme.highlight_filter}`
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
