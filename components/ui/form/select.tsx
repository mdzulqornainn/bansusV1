import { theme } from "@/lib/theme";
import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface SelectOption {
  id: string | null;
  label: string;
  value: string | null;
}

interface FormSelectProps {
  label: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  error?: FieldError;
  disabled?: boolean;
  className?: string;
  isAdmin?: boolean;
  value?: string;
}

export const FormSelect = ({
  label,
  name,
  options,
  placeholder = "Pilih opsi...",
  required = false,
  register,
  error,
  disabled = false,
  className = "",
  value = "",
  isAdmin = false,
}: FormSelectProps) => {
  if (isAdmin) {
    return (
      <div className={className}>
        <label
          htmlFor={name}
          className={`block mb-1 text-sm font-medium ${theme.text_title}`}
        >
          {label} {required && <span className={`${theme.text_title}`}>*</span>}
        </label>
        <select
          {...register(name)}
          id={name}
          disabled={disabled}
          className={`w-full px-4 py-2 rounded-lg hover:bg-yellow-700/30 border border-yellow-700 focus:bg-yellow-600/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:text-white ${
            error?.message
              ? "border-red-400"
              : `${theme.highlight_filter}`
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <option value={value} className="bg-black">
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.id}
              value={option.value || ""}
              className="bg-black"
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
      </div>
    );
  }
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-white font-semibold mb-3">
        {label} {required && <span className={`${theme.text_title}`}>*</span>}
      </label>
      <select
        {...register(name)}
        id={name}
        disabled={disabled}
        className={`w-full px-4 py-3 bg-black/50 border rounded-lg focus:outline-none text-white transition-all duration-200 ${
          error?.message
            ? "border-red-400"
            : `${theme.highlight_filter}`
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <option value="" className="bg-black">
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.id}
            value={option.value || ""}
            className="bg-black"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
