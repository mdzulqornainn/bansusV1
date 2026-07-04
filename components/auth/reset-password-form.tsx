"use client";

import { changePassword } from "@/actions/change-password";
import { theme } from "@/lib/theme";
import { TResetPasswordSchema } from "@/lib/types";
import { resetPasswordSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Lock } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ResetPasswordForm = () => {
  const [message, setMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const token = useSearchParams().get("token");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: TResetPasswordSchema) => {
    setMessage("");

    const validateField = resetPasswordSchema.safeParse(data);
    if (!validateField.success) {
      setMessage("Mohon isi form dengan benar!");
      return;
    }

    try {
      await changePassword(data, token).then((data) => {
        if (data?.success) {
          setMessage(data.success || "Login berhasil!");
          reset();
        } else {
          setMessage(
            `Error: ${data?.error || "Terjadi kesalahan saat login."}`
          );
          console.error("Server Action Error:", data?.error);
        }
      });
    } catch (e) {
      setMessage(
        `Terjadi kesalahan jaringan atau server: ${e || "Kesalahan tidak diketahui."}`
      );
    } finally {
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };
  return (
    <div className="max-w-4xl mx-auto pt-32 pb-20  flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full">
        <div className={`bg-black/40 backdrop-blur-sm border ${theme.border_outside} rounded-2xl p-8 shadow-2xl`}>
          {/* Login Header */}
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold ${theme.text_title} brightness-105 mb-2`}>
              Reset Password
            </h1>
            <p className="text-white">Abis ini jangan lupa lagi ya...</p>
            <div className="w-16 h-1 bg-sky-400 mx-auto mt-4"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-white font-semibold mb-3"
              >
                Password <span className={`${theme.text_title}`}>*</span>
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className={`w-full px-4 py-3 pl-12 bg-black/50 border rounded-lg focus:outline-none text-white placeholder-gray-300 transition-all duration-200 ${errors.password?.message
                      ? "border-red-400"
                      : `${theme.highlight_focus}`
                    }`}
                  placeholder="Masukkan password Anda"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300">
                  <Lock />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>
              </div>
              <p className="text-red-400 text-sm mt-1">
                {errors.password?.message || ""}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${theme.card_shadow} ${theme.button_pressed_blue} cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed py-3 px-6 font-bold rounded-lg  transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl`}
            >
              {isSubmitting ? "RESET PASSWORD..." : "RESET PASSWORD"}
            </button>

            {/* Message Display */}
            {message && (
              <div
                className={`p-3 rounded-lg text-center text-sm ${message.includes("Error") || message.includes("gagal")
                    ? "bg-red-800/20 text-red-400 border border-red-600"
                    : "bg-green-800/20 text-green-400 border border-green-600"
                  }`}
              >
                {message}
              </div>
            )}

            {/* Register Link */}
            <div className="text-center pt-4 border-t border-gray-700">
              <p className="text-white text-sm">
                Udah Reset Passwordnya?{" "}
                <Link
                  href="/login"
                  className={`text-white transition-colors font-semibold underline`}
                >
                  Masuk Sekarang
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
