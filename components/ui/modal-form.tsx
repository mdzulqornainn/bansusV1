"use client";

import { Save, X } from "lucide-react";
import { useState } from "react";
import { FormMessage } from "./form/message";
import ModalConfirm from "./modal-confirm";
import { theme } from "@/lib/theme";

interface ModalFormProps {
  children: React.ReactNode;
  showModalForm: boolean;
  closeModalForm: () => void;
  handleSubmit: () => void;
  title: string;
  error: string;
  isFormValid: boolean;
  isLoading?: boolean;
}

const ModalForm = ({
  children,
  showModalForm,
  closeModalForm,
  handleSubmit,
  title,
  error,
  isFormValid,
  isLoading,
}: ModalFormProps) => {
  const [errorForm, setErrorForm] = useState<string>(error);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleCancel = () => {
    setModalOpen(false);
  };
  if (showModalForm) {
    return (
      <>
        <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className={`w-full max-w-xl ${theme.card_modal} border border-white/10 shadow-xl rounded-3xl p-6 sm:p-10 relative`}>
            <button
              className={`absolute top-2 right-2 ${theme.text_default} hover:text-red-400`}
              onClick={closeModalForm}
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className={`text-lg font-bold ${theme.text_title} mb-4`}>
              {title}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isFormValid) {
                  setModalOpen(true);
                } else {
                  setErrorForm("Mohon lengkapi semua field yang wajib diisi");
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
            >
              {children}
              {/* Error Message */}
              {errorForm && (
                <FormMessage
                  message={errorForm}
                  type="error"
                  className="col-span-2"
                />
              )}

              {/* Submit Button */}
              <div className="col-span-2 flex justify-end gap-3 mt-6 w-full">
                <button
                  // className="inline-flex items-center gap-1 rounded-lg border border-red-400 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-400/10"
                  className={`${theme.button_cancel}`}
                  onClick={closeModalForm}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  // className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-amber-400 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
                  className={`${theme.button_save}`}
                >
                  <Save className="h-4 w-4" /> Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
        <ModalConfirm
          handleClose={handleCancel}
          handleConfirm={() => {
            handleSubmit();
            if (!isLoading) setModalOpen(false);
          }}
          message="Apakah anda yakin ingin menyimpan perubahan?"
          title="Simpan Perubahan"
          isOpen={modalOpen}
          loading={isLoading}
        />
      </>
    );
  }
};

export default ModalForm;
