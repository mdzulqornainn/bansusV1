"use client";

import { updateCourse } from "@/data/courses";
import { FormDataUpdateMatkul } from "@/lib/interfaces";
import { TGetCourse, TGetSemestersByProdiId } from "@/lib/types";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ModalConfirm from "@/components/ui/modal-confirm";
import { FormMessage } from "@/components/ui/form/message";
import { theme } from "@/lib/theme";

interface EditMatkulPageProps {
  dataCourse: TGetCourse;
  dataSemesters: TGetSemestersByProdiId;
}

const EditMatkulPage = ({ dataCourse, dataSemesters }: EditMatkulPageProps) => {
  const [form, setForm] = useState<FormDataUpdateMatkul>({
    code: dataCourse?.code,
    name: dataCourse?.name,
    semesterNumber: dataCourse?.semester.semesterNumber,
    status: dataCourse?.status || "aktif",
    sks: Number(dataCourse?.sks),
    kuota: Number(dataCourse?.kuota),
  });

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSave = async (data: FormDataUpdateMatkul) => {
    setLoading(true);
    await updateCourse(
      dataCourse?.id || "",
      dataCourse?.semester.prodi.id || "",
      data
    )
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else if (res.success) {
          router.push("/admin/matakuliah");
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
        setModalOpen(false);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
    setLoading(false);
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  if (!dataCourse || !dataSemesters) {
    return (
      <div className="min-h-screen p-6 lg:ml-48">
        <div className="max-w-4xl mx-auto">
          <div className={`${theme.card_default}`}>
            <div className={`border-b ${theme.border_outside}`}>
              <h1 className={`text-3xl font-bold ${theme.text_title}`}>
                Detail Mata Kuliah
              </h1>
              <p className={`text-sm ${theme.text_default_blue} mb-6 mt-3`}>Data tidak ditemukan</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen p-6 lg:ml-48">
        {/* Tombol Kembali */}
        <Link
          href="/admin/matakuliah"
          className={`${theme.icon_link}`}
        >
          <ArrowLeft className={`${theme.icon_arrow_left}`} />
          <span>Kembali ke Daftar Mata Kuliah</span>
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
              Edit Mata Kuliah
            </h1>
            <p className={`text-sm ${theme.text_default} mt-1`}>
              {dataCourse.semester.prodiId} - {dataCourse.semester.prodi.name}
            </p>

            <div className="mt-4 mb-2">
              <hr className={`border-t ${theme.border_table_default} rounded-full`} />
            </div>

            <div className="pt-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                {/* Kode Mata Kuliah */}
                <div>
                  <label className={`text-sm font-medium ${theme.text_title}`}>
                    Kode Mata Kuliah
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    className={`${theme.highlight_filter}`}
                  />
                </div>

                {/* Nama Mata Kuliah */}
                <div>
                  <label className={`text-sm font-medium ${theme.text_title}`}>
                    Nama Mata Kuliah
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`${theme.highlight_filter}`}
                  />
                </div>

                {/* Semester */}
                <div>
                  <label className={`text-sm font-medium ${theme.text_title}`}>
                    Semester
                  </label>
                  <select
                    name="semesterNumber"
                    value={form.semesterNumber}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        semesterNumber: Number(e.target.value),
                      })
                    }
                    className={`${theme.highlight_filter}`}
                  >
                    {dataSemesters.map((semster) => (
                      <option key={semster.id} value={semster.semesterNumber}>
                        Semester {semster.semesterNumber}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className={`text-sm font-medium ${theme.text_title}`}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={form.status || "aktif"}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className={`${theme.highlight_filter}`}
                  >
                    <option value="aktif">Aktif</option>
                    <option value="non-aktif">Non-Aktif</option>
                  </select>
                </div>

                {/* SKS */}
                <div>
                  <label className={`text-sm font-medium ${theme.text_title}`}>
                    SKS
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    name="sks"
                    value={form.sks || 0}
                    onChange={(e) =>
                      setForm({ ...form, sks: Number(e.target.value) })
                    }
                    className={`${theme.highlight_filter} appearance-none`}
                  />
                </div>

                {/* Kuota */}
                <div>
                  <label className={`text-sm font-medium ${theme.text_title}`}>
                    Kuota
                  </label>
                  <input
                    type="number"
                    min="1"
                    name="kuota"
                    value={form.kuota || 0}
                    onChange={(e) =>
                      setForm({ ...form, kuota: Number(e.target.value) })
                    }
                    className={`${theme.highlight_filter} appearance-none`}
                  />
                </div>
              </div>

              {/* Data Kelas (Read‑only) */}
              <div className="mt-10">
                <h2 className={`text-lg font-semibold ${theme.text_title} mb-2`}>
                  Data Kelas
                </h2>
                <div className="overflow-x-auto w-full rounded-md">
                  <table className={`min-w-full text-sm ${theme.text_title} text-center`}>
                    <thead className={`${theme.text_title} ${theme.table_header} `}>
                      <tr>
                        <th className="px-4 py-2 font-medium">ID</th>
                        <th className="px-4 py-2 font-medium">Nama Kelas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataCourse.class.map((cls) => (
                        <tr key={cls.id} className={`${theme.text_default} border-b ${theme.border_table_default} ${theme.table_highlight}`}>
                          <td className="px-4 py-2">{cls.id}</td>
                          <td className="px-4 py-2">{cls.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={`mt-2 text-xs ${theme.text_default} italic`}>
                  Data kelas bersifat read-only dan diambil langsung dari
                  database.
                </p>
              </div>
            </div>

            {error && (
              <FormMessage
                message={error}
                type="error"
                className="col-span-2"
              />
            )}

            <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-8">
              <Link
                href={`/admin/matakuliah`}
                className={`${theme.button_cancel}`}
              >
                <X className="h-4 w-4" /> Batal
              </Link>
              <button
                type="submit"
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
        handleConfirm={() => handleSave(form)}
        message="Apakah anda yakin ingin menyimpan perubahan?"
        title="Simpan Perubahan"
        isOpen={modalOpen}
        loading={loading}
      />
    </>
  );

};

export default EditMatkulPage;
