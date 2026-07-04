"use client";

import { updateClassJadwal } from "@/data/class";
import { TGetClass } from "@/lib/types";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { FormMessage } from "../ui/form/message";
import { theme } from "@/lib/theme";

interface EditAsdosKelasPageProps {
  dataClass: TGetClass;
}

interface JadwalPraktikumForm {
  hari: string;
  mulai: string;
  selesai: string;
  ruangan: string;
}

interface FormData {
  jadwalPraktikum: JadwalPraktikumForm;
}

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
  className?: string;
}

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

// Reusable Components
const FormField = ({
  label,
  children,
  required = false,
  error,
  className = "",
}: FormFieldProps) => (
  <div className="space-y-2">
    <label
      className={`block text-sm font-medium ${theme.text_title} ${className}`}
    >
      {label}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
    {children}
    {error && <p className="text-red-400 text-xs">{error}</p>}
  </div>
);

const Input = ({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  className = "",
}: InputProps) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    disabled={disabled}
    className={`${theme.highlight_filter} ${theme.hover_default_no_scale_bg} ${className}`}
  />
);

const Select = ({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
}: SelectProps) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    disabled={disabled}
    className={`${theme.highlight_filter}`}
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => (
  <div className="mb-6">
    <h2 className={`text-xl font-bold ${theme.text_title}`}>
      {title}
    </h2>
    {subtitle && <p className={`text-sm ${theme.text_default} mt-1`}>{subtitle}</p>}
  </div>
);

const LoadingView = () => (
  <div className="min-h-screen p-4 sm:p-6 lg:ml-48">
    <div className="max-w-4xl mx-auto">
      <div className={`${theme.card_default}`}>
        <div className={`border-b ${theme.border_outside}`}>
          <h1 className={`text-3xl font-bold ${theme.text_title}`}>
            Edit Kelas
          </h1>
          <p className={`text-sm ${theme.text_default_blue} mb-6 mt-3`}>Data tidak ditemukan</p>
        </div>
      </div>
    </div>
  </div>
);

const HARI_OPTIONS = [
  { value: "senin", label: "Senin" },
  { value: "selasa", label: "Selasa" },
  { value: "rabu", label: "Rabu" },
  { value: "kamis", label: "Kamis" },
  { value: "jumat", label: "Jumat" },
  { value: "sabtu", label: "Sabtu" },
  { value: "minggu", label: "Minggu" },
];

const EditAsdosKelasPage = ({ dataClass }: EditAsdosKelasPageProps) => {
  const [formData, setFormData] = useState<FormData>({
    jadwalPraktikum: {
      hari: dataClass?.jadwalPraktikum?.hari || "",
      mulai: dataClass?.jadwalPraktikum?.mulai || "",
      selesai: dataClass?.jadwalPraktikum?.selesai || "",
      ruangan: dataClass?.jadwalPraktikum?.ruangan || "",
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const updateJadwalField = useCallback(
    (field: keyof JadwalPraktikumForm, value: string) => {
      setFormData((prev) => ({
        ...prev,
        jadwalPraktikum: {
          ...prev.jadwalPraktikum,
          [field]: value,
        },
      }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.jadwalPraktikum.mulai) {
      newErrors.jam = "Jam mulai harus diisi";
    }

    if (!formData.jadwalPraktikum.selesai) {
      newErrors.jam = "Jam selesai harus diisi";
    }

    if (!formData.jadwalPraktikum.hari) {
      newErrors.hari = "Hari harus dipilih";
    }

    if (!formData.jadwalPraktikum.ruangan.trim()) {
      newErrors.ruangan = "Ruangan harus diisi";
    }

    // Validate time format if both times are provided
    if (
      formData.jadwalPraktikum.hari &&
      formData.jadwalPraktikum.ruangan &&
      formData.jadwalPraktikum.mulai >= formData.jadwalPraktikum.selesai
    ) {
      newErrors.jamSelesai = "Jam selesai harus lebih besar dari jam mulai";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSave = useCallback(async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await updateClassJadwal(
        formData.jadwalPraktikum,
        dataClass?.id || "",
        dataClass?.jadwalPraktikumId || ""
      )
        .then((res) => {
          if (res.success) {
            setSuccessMessage(res.success);
          }
          if (res.error) {
            setErrorMessage(res.error);
          }
        })
        .catch((err) => {
          setErrorMessage(err.message);
        })
        .finally(() => {
          setIsLoading(false);
          setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
          }, 5000);
        });
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm, dataClass?.id, dataClass?.jadwalPraktikumId]);

  // Early return for missing data
  if (!dataClass) {
    return <LoadingView />;
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="min-h-screen p-6 lg:ml-48">
      {/* Navigation and Actions */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/admin/asdos/kelas/" 
          className={`${theme.icon_link}`}>
          <ArrowLeft className={`${theme.icon_arrow_left}`} />
          <span>Kembali ke Daftar</span>
        </Link>
      </div>

      {/* Error / Success Messages */}
      {hasErrors && (
        <div className="mb-6">
          <FormMessage
            message={Object.values(errors).join(", ")}
            type="error"
          />
        </div>
      )}
      {successMessage && (
        <div className="mb-6">
          <FormMessage message={successMessage} type="success" />
        </div>
      )}
      {errorMessage && (
        <div className="mb-6">
          <FormMessage message={errorMessage} type="error" />
        </div>
      )}

      <div className={`${theme.card_max_4_fit}`}>
        {/* Header Card */}
        <div className={`${theme.card_default}`}>
          <div className="flex items-center justify-between mb-4">
            <h1 className={`text-3xl font-bold ${theme.text_title}`}>
              Edit Kelas
            </h1>

            <button
              onClick={handleSave}
              disabled={isLoading}
              className={`${theme.button_save}`}
            >
              <Save className="h-4 w-4" />
              {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>

          <div
            className={`flex flex-wrap items-center gap-2 text-sm ${theme.text_default_light}`}
          >
            <span className={`${theme.card_background} px-3 py-1`}>
              {dataClass.course?.semester.prodi.name}
            </span>
            <span className={`${theme.text_default}`}>•</span>
            <span>
              Semester {dataClass.course?.semester.semesterNumber}
            </span>
            <span className={`${theme.text_default}`}>•</span>
            <span>{dataClass.course?.name}</span>
          </div>
        </div>


        {/* Schedule Information */}
        <div className={`${theme.card_default}`}>
          <SectionHeader
            title="Jadwal Praktikum"
            subtitle="Edit jadwal praktikum"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FormField label="Jam Mulai" required error={errors.jam}>
              <Input
                value={formData.jadwalPraktikum.mulai}
                onChange={(value) => updateJadwalField("mulai", value)}
                placeholder="08:00"
                type="time"
              />
            </FormField>

            <FormField label="Jam Selesai" error={errors.jamSelesai}>
              <Input
                value={formData.jadwalPraktikum.selesai}
                onChange={(value) => updateJadwalField("selesai", value)}
                placeholder="10:00"
                type="time"
              />
            </FormField>

            <FormField label="Hari" required error={errors.hari}>
              <Select
                value={formData.jadwalPraktikum.hari}
                onChange={(value) => updateJadwalField("hari", value)}
                options={HARI_OPTIONS}
                placeholder="Pilih hari"
              />
            </FormField>

            <FormField label="Ruangan" required error={errors.ruangan}>
              <Input
                value={formData.jadwalPraktikum.ruangan}
                onChange={(value) => updateJadwalField("ruangan", value)}
                placeholder="Lab A1"
              />
            </FormField>
          </div>
        </div>

        {/* Basic Information */}
        <div className={`${theme.card_default}`}>
          <SectionHeader
            title="Informasi Dasar"
            subtitle="Informasi dasar kelas yang tidak dapat diubah"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField label="ID Kelas">
              <Input
                value={dataClass.id || ""}
                onChange={() => { }}
                disabled={true}
              />
            </FormField>

            <FormField label="Program Studi">
              <Input
                value={dataClass.course?.semester.prodi.name || ""}
                onChange={() => { }}
                disabled={true}
              />
            </FormField>

            <FormField label="Semester">
              <Input
                value={
                  dataClass.course?.semester.semesterNumber?.toString() || ""
                }
                onChange={() => { }}
                disabled={true}
              />
            </FormField>

            <FormField label="Nama Kelas">
              <Input
                value={dataClass.name || ""}
                onChange={() => { }}
                disabled={true}
              />
            </FormField>

            <FormField label="Mata Kuliah" className="md:col-span-2">
              <Input
                value={`${dataClass.course?.name || ""} 
                  }`}
                onChange={() => { }}
                disabled={true}
              />
            </FormField>
            
            <FormField label="Kode Mata Kuliah" className="md:col-span-2">
              <Input
                value={` ${dataClass.course?.code ? `(${dataClass.course.code})` : ""
                  }`}
                onChange={() => { }}
                disabled={true}
              />
            </FormField>
          </div>
        </div>
      </div>
    </div>
  );

};

export default EditAsdosKelasPage;
