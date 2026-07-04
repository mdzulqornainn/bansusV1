import { theme } from "@/lib/theme";
import Link from "next/link";
import React from "react";
import { UseFormSetValue, FieldError } from "react-hook-form";

interface FormFileUploadProps {
  label: string;
  name: string;
  link?: string;
  accept?: string;
  maxSize?: string;
  required?: boolean;
  error?: FieldError;
  setValue: UseFormSetValue<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  onFileChange?: (file: File | null, fileUrl: string | null) => void;
  previewUrl?: string | null;
  className?: string;
}

export const FormFileUpload = ({
  label,
  name,
  link,
  accept = ".pdf",
  maxSize = "5MB",
  required = false,
  error,
  setValue,
  onFileChange,
  previewUrl,
  className = "",
}: FormFileUploadProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setValue(name, file);
      onFileChange?.(file, fileUrl);
    } else {
      setValue(name, null);
      onFileChange?.(null, null);
    }
  };

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-white font-semibold mb-3">
        {label} {required && <span className={`${theme.text_title}`}>*</span>}
      </label>
      <div
        className={`border-2 border-dashed p-8 text-center rounded-xl bg-black/20 transition-colors ${
          error 
          ? "border-red-400" 
          : "border-white hover:border-sky-400"
        }`}
      >
        <div className="mb-4">
          <div className={`text-4xl ${theme.text_title} mb-4`}>📄</div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Upload {label}
          </h3>
        </div>
        <input
          id={name}
          type="file"
          onChange={handleFileChange}
          accept={accept}
          // FILE DI EDIT DISINI TULISANNYA DAN LAINNYA. ( TERUTAMA STYLE NYA )
          className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-sky-400 file:text-black hover:file:bg-sky-500 file:cursor-pointer cursor-pointer"
        />
        <div className="mt-4 space-y-1">
          <p className={` text-sm text-white`}>
            Format: {accept.replace(".", "").toUpperCase()} • Maksimal:{" "}
            {maxSize}
          </p>
          {previewUrl && (
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-2">
                Preview Dokumen:
              </h4>
              <iframe
                src={previewUrl}
                title={`Preview ${label}`}
                className={`w-full h-96 rounded-xl border ${theme.border_outside}`}
              />
            </div>
          )}
          {error && (
            <p className="text-red-400 text-sm mt-1">{error.message}</p>
          )}
        </div>
      </div>
      {link && (
        <p className="text-white text-sm mt-4 text-center hover:underline hover:underline-offset-2">
          <Link href={link}>Download Surat Pernyataan disini!</Link>
        </p>
      )}
    </div>
  );
};
