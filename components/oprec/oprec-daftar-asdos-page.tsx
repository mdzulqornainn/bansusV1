"use client";

import { signUpAsdos } from "@/actions/register";
import CardWrapper from "@/components/ui/card/card-wrapper";
import { FormButton } from "@/components/ui/form/button";
import { FormCheckbox } from "@/components/ui/form/check-box";
import { FormFileUpload } from "@/components/ui/form/file-upload";
import { FormInput } from "@/components/ui/form/input";
import { FormMessage } from "@/components/ui/form/message";
import { FormSection } from "@/components/ui/form/section";
import { FormSelect } from "@/components/ui/form/select";
import { FormTextarea } from "@/components/ui/form/text-area";
import { theme } from "@/lib/theme";
import { TGetCourses, TSignUpAsdosSchema } from "@/lib/types";
import { signUpAsdosSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Filter } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

interface OprecDaftarAsdosPageProps {
  dataCoures: TGetCourses;
}

const OprecDaftarAsdosPage = ({ dataCoures }: OprecDaftarAsdosPageProps) => {
  const [message, setMessage] = useState<string>("");
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<TSignUpAsdosSchema>({
    resolver: zodResolver(signUpAsdosSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      npm: "",
      whatsapp: "",
      domisili: "",
      matkul1: "",
      matkul2: "",
      wawancara: "offline",
      alasanOnline: "",
      alasan: "",
      bersediaDuaMatkul: false,
      pengalamanAsdos: false,
      bersediaDitempatkanLain: false,
      suratPernyataan: null,
    },
  });

  const watchedValues = watch();
  const alasanText = watchedValues.alasan || "";
  const alasanOnlineText = watchedValues.alasanOnline || "";

  // Memoize available mata kuliah options for better performance
  const availableMatkul2Options =
    useMemo(() => {
      return dataCoures
        ?.filter((mk) => mk.status === "aktif" && mk.id !== watchedValues.matkul1)
        .map((mk) => ({
          id: mk.id,
          label: `Semester ${mk.semester.semesterNumber} - ${mk.semester.prodi.name} - ${mk.name}`,
          value: mk.id,
        }));
    }, [watchedValues.matkul1, dataCoures]) ?? [];

  const matkulOptions =
    useMemo(() => {
      return dataCoures?.filter((mk) => mk.status === "aktif").map((mk) => ({
        id: mk.id,
        label: `Semester ${mk.semester.semesterNumber} - ${mk.semester.prodi.name} - ${mk.name}`,
        value: mk.id,
      }));
    }, [dataCoures]) ?? [];

  const wawancaraOptions = [
    { id: "on", label: "Online", value: "online" },
    { id: "off", label: "Offline", value: "offline" },
  ];

  const onSubmit = async (data: TSignUpAsdosSchema) => {
    setMessage("");

    if (!data.suratPernyataan) {
      setMessage("Error: Mohon unggah file surat pernyataan.");
      return;
    }
    // await new Promise((resolve) =>
    //   setTimeout(() => {
    //     console.log(data);
    //     setMessage("Pendaftaran berhasil!");
    //     reset();
    //     resolve;
    //   }, 1000)
    // );

    try {
      const result = await signUpAsdos(data);
      if (result.success) {
        setMessage(result.success || "Pendaftaran berhasil!");
        setTimeout(() => {
          redirect("/oprec/link-wa");
        }, 50);
        reset();
      } else {
        setMessage(
          `Error: ${result.error || "Terjadi kesalahan saat pendaftaran."}`
        );
        console.error("Server Action Error:", result.error);
      }
    } catch (error) {
      setMessage(
        `Terjadi kesalahan jaringan atau server: ${error || "Kesalahan tidak diketahui."}`
      );
      console.error("Frontend error calling Server Action:", error);
    }
  };

  const handleFileChange = (file: File | null, fileUrl: string | null) => {
    setPdfPreviewUrl(fileUrl);
  };

  const getMessageType = (message: string): "success" | "error" => {
    return message.includes("Error") || message.includes("gagal")
      ? "error"
      : "success";
  };

  const checkboxOptions = [
    {
      name: "bersediaDuaMatkul" as const,
      label: "Fleksibilitas Penempatan",
      description:
        "Apakah Anda bersedia untuk menjadi Asdos di 2 mata kuliah? (ceklist jika ya!)",
    },
    {
      name: "pengalamanAsdos" as const,
      label: "Pengalaman Sebelumnya",
      description: "Apakah Anda sudah pernah menjadi Asdos? (ceklist jika ya!)",
    },
    {
      name: "bersediaDitempatkanLain" as const,
      label: "Penempatan Alternatif",
      description:
        "Apakah Anda bersedia ditempatkan pada mata kuliah selain yang dipilih? (ceklist jika ya!)",
    },
  ];

  return (
    <CardWrapper title="Form Pendaftaran Asisten Dosen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Account Info Section */}
        <FormSection title="DATA AKUN" stepNumber={1}>
          <div className="space-y-6">
            <FormInput
              label="Nama Lengkap"
              name="name"
              placeholder="Masukkan nama lengkap Anda"
              required
              register={register}
              error={errors.name}
            />

            <FormInput
              label="Email"
              name="email"
              type="email"
              placeholder="contoh@email.com"
              required
              register={register}
              error={errors.email}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                label="Password"
                name="password"
                type="password"
                placeholder="Masukkan password"
                required
                register={register}
                error={errors.password}
              />

              <FormInput
                label="Konfirmasi Password"
                name="confirmPassword"
                type="password"
                placeholder="Konfirmasi password"
                required
                register={register}
                error={errors.confirmPassword}
              />
            </div>
          </div>
        </FormSection>

        {/* Personal Info Section */}
        <FormSection title="DATA PERSONAL" stepNumber={2}>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
            <FormInput
              label="NPM"
              name="npm"
              placeholder="2317051080"
              required
              register={register}
              error={errors.npm}
            />

            <FormInput
              label="Nomor WhatsApp"
              name="whatsapp"
              placeholder="08xxxxxxxxxx"
              required
              register={register}
              error={errors.whatsapp}
            />

            <FormInput
              label="Domisili  (untuk pertimbangan jadwal wawancara)"
              name="domisili"
              placeholder="Masukkan domisili Anda"
              required
              className="lg:col-span-2"
              register={register}
              error={errors.domisili}
            />
          </div>
        </FormSection>

        {/* Mata Kuliah Section */}
        <FormSection title="PILIHAN MATA KULIAH" stepNumber={3}>
          <div className="grid md:grid-cols-2 gap-6">
            <FormSelect
              label="Mata Kuliah Pilihan 1"
              name="matkul1"
              options={matkulOptions}
              placeholder="Pilih mata kuliah..."
              required
              register={register}
              error={errors.matkul1}
            />

            <FormSelect
              label="Mata Kuliah Pilihan 2"
              name="matkul2"
              options={availableMatkul2Options}
              placeholder={
                watchedValues.matkul1
                  ? "Pilih mata kuliah..."
                  : "Pilih mata kuliah 1 terlebih dahulu"
              }
              required
              register={register}
              error={errors.matkul2}
              disabled={!watchedValues.matkul1}
            />
          </div>
        </FormSection>

        {/* Motivation Section */}
        <FormSection title="MOTIVASI & ALASAN" stepNumber={4}>
          <FormTextarea
            label="Alasan Menjadi Asdos & Mengambil Mata Kuliah Tersebut"
            name="alasan"
            placeholder="Jelaskan motivasi dan alasan Anda ingin menjadi asisten dosen untuk mata kuliah yang dipilih. Ceritakan pengalaman relevan, minat, dan kontribusi yang dapat Anda berikan..."
            required
            register={register}
            error={errors.alasan}
            rows={6}
            maxLength={1000}
            minLength={50}
            currentLength={alasanText.length}
          />
        </FormSection>

        {/* Preferences Section */}
        <FormSection title="PREFERENSI & PENGALAMAN" stepNumber={5}>
          <div className="space-y-4">
            {checkboxOptions.map((option) => (
              <FormCheckbox
                key={option.name}
                name={option.name}
                label={option.label}
                description={option.description}
                register={register}
              />
            ))}
          </div>
        </FormSection>

        {/* Wawancara Section */}
        <FormSection title="TEKNIS WAWANCARA" stepNumber={6}>
          <div className="grid md:grid-cols-2 gap-6">
            <FormSelect
              label="Opsi Wawancara (Khusus Angkatan 23 & Prodi MI Angkatan 24)"
              name="wawancara"
              options={wawancaraOptions}
              placeholder="Pilih opsi wawancara..."
              required
              className="col-span-2"
              register={register}
              error={errors.wawancara}
            />
            <FormTextarea
              label="Jika memilih online, sertakan alasannya..."
              name="alasanOnline"
              placeholder="Jelaskan kenapa Anda memilih wawancara online..."
              register={register}
              error={errors.alasanOnline}
              rows={6}
              className="col-span-2"
              maxLength={1000}
              currentLength={alasanOnlineText.length}
            />
          </div>
        </FormSection>

        {/* File Upload Section */}
        <FormSection title="DOKUMEN PENDUKUNG" stepNumber={7}>
          <FormFileUpload
            label="Surat Pernyataan"
            name="suratPernyataan"
            link="/files/surat-pernyataan.docx"
            accept=".pdf"
            maxSize="5MB"
            required
            error={errors.suratPernyataan}
            setValue={setValue}
            onFileChange={handleFileChange}
            previewUrl={pdfPreviewUrl}
          />
        </FormSection>

        {/* Submit Section */}
        <div className="pt-8">
          <FormButton
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            loading={isSubmitting}
            loadingText="MENGIRIM..."
            className="w-full cursor-pointer"
          >
            DAFTAR SEKARANG
          </FormButton>

          {message && (
            <FormMessage message={message} type={getMessageType(message)} />
          )}

          <div className="text-center mt-6">
            <p className={`text-white text-sm`}>
              Dengan mendaftar, Anda menyetujui untuk mengikuti seluruh proses
              seleksi
            </p>
          </div>

          {/* Login Link */}
          <div
            className={`text-center pt-4 border-t ${theme.border_table_default} mt-5`}
          >
            <p className={`text-white text-sm`}>
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className={`${theme.text_title} brightness-110 transition-colors font-semibold underline`}
              >
                Masuk sekarang
              </Link>
            </p>
          </div>
        </div>
      </form>
    </CardWrapper>
  );
};

export default OprecDaftarAsdosPage;
