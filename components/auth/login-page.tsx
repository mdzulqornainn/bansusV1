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
    <div className={`min-h-screen relative isolate overflow-x-hidden ${theme.root_background} flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-20`}>
      <style>{`
         .unila-dot-matrix {
           background-image: radial-gradient(rgba(11, 94, 168, 0.18) 2px, transparent 2px);
           background-size: 2.5rem 2.5rem;
         }
         .neon-glow {
           background-image: radial-gradient(circle, rgba(11, 94, 168, 0.35) 100%, transparent 100%);
           filter: blur(100px);
         }
       `}</style>
     
       <div className="absolute inset-0 unila-dot-matrix pointer-events-none z-[-1]"></div>
       <div className="absolute top-[-5%] left-[-5%] w-[650px] h-[650px] neon-glow opacity-50 pointer-events-none z-[-1] animate-pulse [animation-duration:12s]"></div>
       <div className="absolute top-[30%] right-[-10%] w-[650px] h-[650px] neon-glow opacity-50 pointer-events-none z-[-1] animate-pulse [animation-duration:12s]"></div>

       <div className="max-w-md w-full relative z-10">
               <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(11,94,168,0.08)]">
                 
                 {/* Login Header */}
                 <div className="text-center mb-8">
                   <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
                     Masuk ke Akun
                   </h1>
                   <p className="text-sm text-slate-500 font-medium">
                     Silakan masuk untuk mengakses dashboard Anda
                   </p>
                   <div className="w-12 h-1 bg-[#0B5EA8] rounded-full mx-auto mt-4 opacity-80"></div>
                 </div>
       
                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                   {/* Email Field */}
                   <div>
                     <label
                       htmlFor="email"
                       className="block text-sm text-slate-700 font-semibold mb-2"
                     >
                       Email <span className="text-red-500">*</span>
                     </label>
                     <div className="relative">
                       <input
                         {...register("email")}
                         type="email"
                         className={`w-full px-4 py-3 pl-11 bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0B5EA8] focus:ring-2 focus:ring-[#0B5EA8]/20 text-slate-800 placeholder-slate-400 transition-all duration-200 ${
                           errors.email?.message ? "border-red-400 focus:ring-red-100 focus:border-red-400" : ""
                         }`}
                         placeholder="contoh@email.com"
                       />
                       <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5">
                         <Mail className="w-full h-full" />
                       </div>
                     </div>
                     <p className="text-red-500 text-xs mt-1.5 font-medium">
                       {errors.email?.message || ""}
                     </p>
                   </div>
       
                   {/* Password Field */}
                   <div>
                     <label
                       htmlFor="password"
                       className="block text-sm text-slate-700 font-semibold mb-2"
                     >
                       Password <span className="text-red-500">*</span>
                     </label>
                     <div className="relative">
                       <input
                         {...register("password")}
                         type={showPassword ? "text" : "password"}
                         className={`w-full px-4 py-3 pl-11 pr-11 bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0B5EA8] focus:ring-2 focus:ring-[#0B5EA8]/20 text-slate-800 placeholder-slate-400 transition-all duration-200 ${
                           errors.password?.message ? "border-red-400 focus:ring-red-100 focus:border-red-400" : ""
                         }`}
                         placeholder="Masukkan password Anda"
                       />
                       <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5">
                         <Lock className="w-full h-full" />
                       </div>
                       <button
                         type="button"
                         onClick={() => setShowPassword(!showPassword)}
                         className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                       >
                         {showPassword ? <Eye className="w-5 h-5" /> : <EyeClosed className="w-5 h-5" />}
                       </button>
                     </div>
                     <p className="text-red-500 text-xs mt-1.5 font-medium">
                       {errors.password?.message || ""}
                     </p>
                   </div>
       
                   {/* Remember Me & Forgot Password */}
                   <div className="flex items-center justify-between pt-1">
                     <div className="flex items-center space-x-2">
                       <input
                         type="checkbox"
                         id="rememberMe"
                         className="h-4 w-4 rounded border-slate-300 text-[#0B5EA8] focus:ring-[#0B5EA8]/20 accent-[#0B5EA8] cursor-pointer"
                       />
                       <label
                         htmlFor="rememberMe"
                         className="text-xs font-semibold text-slate-600 cursor-pointer select-none"
                       >
                         Ingat saya
                       </label>
                     </div>
                     <Link
                       href="/forgot-password"
                       className="text-xs font-bold text-[#0B5EA8] hover:underline transition-all"
                     >
                       Lupa password?
                     </Link>
                   </div>
       
                   {/* Submit Button */}
                   <button
                     type="submit"
                     disabled={isSubmitting}
                     className="w-full mt-2 bg-[#0B5EA8] hover:bg-[#094d8a] text-white py-3 px-6 font-bold rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 disabled:bg-slate-400 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 text-sm tracking-wide"
                   >
                     {isSubmitting ? "MEMPROSES..." : "MASUK"}
                   </button>
       
                   {/* Message Display */}
                   {message && (
                     <div
                       className={`p-3 rounded-xl text-center text-xs font-semibold ${
                         message.includes("Error") || message.includes("gagal")
                           ? "bg-red-50 text-red-600 border border-red-200"
                           : "bg-green-50 text-green-600 border border-green-200"
                       }`}
                     >
                       {message}
                     </div>
                   )}
       
                   {/* Register Link */}
                   <div className="text-center pt-5 border-t border-slate-100 mt-4">
                     <p className="text-xs text-slate-500 font-medium">
                       Belum punya akun?{" "}
                       <Link
                         href="/oprec/daftar"
                         className="text-[#0B5EA8] hover:underline font-bold"
                       >
                         Daftar sekarang
                       </Link>
                     </p>
                   </div>
                 </form>
               </div>
       
               {/* Additional Info */}
               <div className="text-center mt-6">
                 <p className="text-slate-400 text-[11px] font-medium">
                   Dengan masuk, Anda menyetujui{" "}
                   <Link href="/terms" className="text-slate-500 hover:text-[#0B5EA8] underline">
                     Syarat & Ketentuan
                   </Link>{" "}
                   dan{" "}
                   <Link href="/privacy" className="text-slate-500 hover:text-[#0B5EA8] underline">
                     Kebijakan Privasi
                   </Link>
                 </p>
               </div>
             </div>
    </div>
  );
};

export default LoginPage;