"use client";

import { login } from "@/actions/login";
import { theme } from "@/lib/theme";
import { TSignInSchema } from "@/lib/types";
import { signInSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const [message, setMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      // rememberMe: false,
    },
  });

  const onSubmit = async (data: TSignInSchema) => {
    setMessage("");

    const validateField = signInSchema.safeParse(data);
    if (!validateField.success) {
      setMessage("Mohon isi form dengan benar!");
      return;
    }

    try {
      await login(data).then((data) => {
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
    <div className="max-w-4xl mx-auto pt-32 pb-20  flex flex-col min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full">
        <div className={`bg-black/40 backdrop-blur-sm border ${theme.border_outside} rounded-2xl p-8 shadow-2xl`}>
          {/* Login Header */}
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold ${theme.text_title} brightness-105 mb-2`}>
              Masuk ke Akun
            </h1>
            <p className={`text-white`}>
              Silakan masuk untuk mengakses dashboard Anda
            </p>
            <div className={`w-16 h-1 bg-sky-400 mx-auto mt-4`}></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-white font-semibold mb-3"
              >
                Email <span className={`${theme.text_title}`}>*</span>
              </label>
              <div className="relative">
                <input
                  {...register("email")}
                  type="email"
                  className={`w-full px-4 py-3 pl-12 bg-black/50 border rounded-lg focus:outline-none text-white placeholder-gray-300 transition-all duration-200 ${errors.email?.message
                    ? "border-red-400"
                    : `${theme.highlight_focus}`
                    }`}
                  placeholder="contoh@email.com"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300">
                  <Mail />
                </div>
              </div>
              <p className="text-red-400 text-sm mt-1">
                {errors.email?.message || ""}
              </p>
            </div>

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
                  className={`w-full px-4 py-3 pl-12 pr-12 bg-black/50 border rounded-lg focus:outline-none text-white placeholder-gray-300 transition-all duration-200 ${errors.password?.message
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
                  {showPassword ? <Eye/> : <EyeClosed/>}
                </button>
              </div>
              <p className="text-red-400 text-sm mt-1">
                {errors.password?.message || ""}
              </p>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  // {...register("rememberMe")}
                  type="checkbox"
                  id="rememberMe"
                  className="h-4 w-4 accent-sky-400 cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className={`text-sm cursor-pointer text-white transition-colors`}
                >
                  Ingat saya
                </label>
              </div>
              <Link
                href="/forgot-password"
                className={`text-white text-sm hover:${theme.text_title} transition-colors underline`}
              >
                Lupa password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              // className="w-full bg-yellow-400 hover:bg-yellow-500 cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed text-black py-3 px-6 text-lg font-bold rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              className={`w-full ${theme.card_shadow} ${theme.button_pressed_blue} cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed py-3 px-6 font-bold rounded-lg  transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl`}
              >
              {isSubmitting ? "MASUK..." : "MASUK"}
            </button>

            {/* Message Display */}
            {message && (
              <div
                className={`p-3 rounded-lg text-center text-sm ${message.includes("Error") || message.includes("gagal")
                    ? "bg-red-800/20 text-red-600 border border-red-600"
                    : "bg-green-800/20 text-green-600 border border-green-600"
                  }`}
              >
                {message}
              </div>
            )}

            {/* Register Link */}
            <div className="text-center pt-4 border-t border-gray-700">
              <p className={`text-white text-sm`}>
                Belum punya akun?{" "}
                <Link
                  href="/oprec/daftar"
                  className={`hover:${theme.text_title} text-white transition-colors font-semibold underline`}
                >
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className={`${theme.text_default} text-xs`}>
            Dengan masuk, Anda menyetujui{" "}
            <Link
              href="/terms"
              className={`${theme.text_title} hover:text-gray-400 underline`}
            >
              Syarat & Ketentuan
            </Link>{" "}
            dan{" "}
            <Link
              href="/privacy"
              className={`${theme.text_title} hover:text-gray-400 underline`}
            >
              Kebijakan Privasi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
