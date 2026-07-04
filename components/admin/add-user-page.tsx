"use client";

import { signUp } from "@/actions/register";
import CardWrapper from "@/components/ui/card/card-wrapper";
import { FormButton } from "@/components/ui/form/button";
import { FormInput } from "@/components/ui/form/input";
import { FormMessage } from "@/components/ui/form/message";
import { FormSection } from "@/components/ui/form/section";
import { FormSelect } from "@/components/ui/form/select";
import { TSignUpSchema } from "@/lib/types";
import { signUpSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const AddUserPage = () => {
  const [message, setMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      npm: "",
      nip: "",
    },
  });

  const watchedValues = watch();
  const selectedRole = watchedValues.role;

  const roles = [
    { id: "laboran", label: "Laboran", value: "LABORAN" },
    { id: "asdos", label: "Asisten Dosen", value: "ASDOS" },
    { id: "dosen", label: "Dosen", value: "DOSEN" },
  ];

  useEffect(() => {
    if (selectedRole && selectedRole !== "ASDOS") {
      setValue("npm", "");
    }
    if (selectedRole && selectedRole !== "DOSEN") {
      setValue("nip", "");
    }
  }, [selectedRole, setValue]);

  const onSubmit = async (data: TSignUpSchema) => {
    setMessage("");

    try {
      const result = await signUp(data);

      if (result.success) {
        setMessage(result.success || "Pendaftaran berhasil!");
        if (data.role === "DOSEN") {
          setTimeout(() => {
            redirect("/admin/dosen");
          }, 50);
        } else {
          setTimeout(() => {
            redirect("/admin/users");
          }, 50);
          reset();
        }
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

  const getMessageType = (message: string): "success" | "error" => {
    return message.includes("Error") || message.includes("gagal")
      ? "error"
      : "success";
  };

  return (
    <div className="ml-2 md:ml-64">
      <CardWrapper title="Form Penambahan Users">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          {/* Account Info Section */}
          <FormSection title="DATA AKUN" stepNumber={1}>
            <div className="space-y-6">
              <FormInput
                label="Nama Lengkap"
                name="name"
                placeholder="Masukkan nama lengkap"
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

              <FormSelect
                label="Role"
                name="role"
                options={roles}
                placeholder="Pilih Role .."
                required
                className="col-span-2"
                register={register}
                error={errors.role}
              />

              {selectedRole === "ASDOS" && (
                <FormInput
                  label="NPM"
                  name="npm"
                  placeholder="2317051080"
                  required
                  register={register}
                  error={errors.npm}
                />
              )}
              {selectedRole === "DOSEN" && (
                <FormInput
                  label="NIP"
                  name="nip"
                  placeholder="1000289372812"
                  required
                  register={register}
                  error={errors.nip}
                />
              )}
            </div>
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
              Tambah User
            </FormButton>

            {message && (
              <FormMessage message={message} type={getMessageType(message)} />
            )}
          </div>
        </form>
      </CardWrapper>
    </div>
  );
};

export default AddUserPage;
