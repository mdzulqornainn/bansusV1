"use client";

import { newVerification } from "@/actions/new-verification";
import { theme } from "@/lib/theme";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing Token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something Went Wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <div className="max-w-4xl mx-auto pt-32 pb-20  flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full">
        <div className={`bg-black/40 backdrop-blur-sm border ${theme.border_outside} rounded-2xl p-8 shadow-2xl`}>
          {/* Login Header */}
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold ${theme.text_title} mb-2 brightness-105`}>
              Verifikasi Email
            </h1>
            <div className="w-16 h-1 bg-sky-400 mx-auto mt-4"></div>
          </div>
          <div className="flex flex-col items-center w-full justify-center">
            {error && (
              <p
                className={`mt-4 p-3 rounded-lg text-center bg-red-800/20 text-red-600 border border-red-600`}
              >
                {error}
              </p>
            )}
            {success && (
              <p
                className={`mt-4 p-3 rounded-lg text-center bg-green-800/20 text-green-600 border border-green-600`}
              >
                {success}
              </p>
            )}
            {isLoading && (
              <p className="text-white">Mohon Tunggu Sebentar ...</p>
            )}
            {!error && !success && (
              <Loader
                size={30}
                color={"#FFFFFF"}
                className="my-4 animate-spin"
              />
            )}
          </div>
          {/* Login Link */}
          <div className="text-center pt-4 border-t border-white mt-5">
            <p className={`text-white text-sm`}>
              Sudah verifikasi akun?{" "}
              <Link
                href="/login"
                className={`brightness-110  font-semibold hover:underline ${theme.text_title}`}
              >
                Masuk sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVerificationForm;
