"use client";

import ModalConfirm from "@/components/ui/modal-confirm";
import { theme } from "@/lib/theme";
import { TGetUserById } from "@/lib/types";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface EditUserPageProps {
  user: TGetUserById;
}

const EditUserPage = ({ user }: EditUserPageProps) => {
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
  });
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async (data: typeof form) => {
    setLoading(true);
    try {
      setError("fitur ini belum ada");
    } catch (error) {
      let message = "An unknown error has occurred.";
      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as { message: unknown }).message === "string"
      ) {
        // Kita harus melakukan type assertion di sini
        message = (error as { message: string }).message;
      }
      setError(message);
    } finally {
      setLoading(false);
      setModalOpen(false);
    }
  };

  return (
    <>
      <div className="min-h-screen p-6 lg:ml-48">
        {/* Tombol Kembali */}
        <Link href="/admin/users" className={`${theme.icon_link}`}>
          <ArrowLeft className={`${theme.icon_arrow_left}`} />
          <span>Kembali ke Daftar User</span>
        </Link>

        <div className={`${theme.card_max_4}`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setModalOpen(true);
            }}
            className={`${theme.card_default}`}
          >
            <h1 className={`text-3xl font-bold ${theme.text_title}`}>
              Edit User
            </h1>
            <p className={`text-sm  ${theme.text_default} mt-1`}>
              User ID - {user?.id}
            </p>

            {/* Garis Biasa Horizontal */}
            <div className="mt-4 mb-2">
              <hr
                className={`border-t ${theme.border_table_default} rounded-full`}
              />
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                {/* Nama */}
                <div>
                  <label className={`text-sm font-medium ${theme.text_title}`}>
                    Nama
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`${theme.highlight_filter} w-full px-4 py-2`}
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className={`text-sm font-medium ${theme.text_title}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className={`${theme.highlight_filter} w-full px-4 py-2`}
                    required
                  />
                </div>

                {/* Role */}
                <div className="sm:col-span-2">
                  <label className={`text-sm font-medium ${theme.text_title}`}>
                    Role
                  </label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className={`${theme.highlight_filter} w-full px-4 py-2`}
                    required
                  >
                    <option value="">Pilih Role</option>
                    <option value="ADMIN">Admin</option>
                    <option value="LABORAN">Laboran</option>
                    <option value="DOSEN">Dosen</option>
                    <option value="GUEST">Guest</option>
                    <option value="CALON_ASDOS">Calon Asisten Dosen</option>
                    <option value="ASDOS">Asisten Dosen</option>
                  </select>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <p className="text-sm mt-4 text-red-400 font-medium">{error}</p>
              )}

              {/* Tombol aksi */}
              <div className="sm:col-span-2 flex justify-end gap-3 mt-8">
                <Link
                  href={`/admin/users`}
                  className={`${theme.button_cancel}`}
                >
                  <X className="h-4 w-4" /> Batal
                </Link>
                <button
                  type="submit"
                  className={`cursor-pointer inline-flex items-center gap-1 rounded-lg border ${theme.table_highlight} ${theme.text_default_blue} px-4 py-2 text-sm font-semibold `}
                >
                  <Save className="h-4 w-4" /> Simpan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Modal Konfirmasi */}
      <ModalConfirm
        handleClose={() => setModalOpen(false)}
        handleConfirm={() => handleSave(form)}
        message="Apakah Anda yakin ingin menyimpan perubahan?"
        title="Simpan Perubahan"
        isOpen={modalOpen}
        loading={loading}
      />
    </>
  );
};

export default EditUserPage;
