"use client";

import ButtonIcon from "@/components/ui/button-icon";
import { addCourseClass } from "@/data/courses";
import { theme } from "@/lib/theme";
import { TGetCourse } from "@/lib/types";
import { ArrowLeft, Eye, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ModalForm from "../ui/modal-form";
import ModalConfirm from "../ui/modal-confirm";
import { deleteClass } from "@/data/class";

// Helper component untuk menampilkan informasi (tidak ada perubahan)
const Info = ({ title, value }: { title: string; value: React.ReactNode }) => (
  <div className="flex flex-col gap-1">
    <dt className={`text-sm font-medium ${theme.text_title}`}>{title}</dt>
    <dd className={`text-sm ${theme.text_default}`}>{value}</dd>
  </div>
);

interface DetailMatkulPageProps {
  dataCourse: TGetCourse;
  id: string;
}

export default function DetailMatkulPage({
  dataCourse,
  id,
}: DetailMatkulPageProps) {
  const [formData, setFormData] = useState({
    courseId: id,
    name: "",
  });
  const [showModalAddClass, setShowModalAddClass] = useState(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);
  const [selectedField, setSelectedField] = useState({
    id: "",
    name: "",
    jumlah: 0,
  });
  console.log(message);
  const [daftarClass, setDaftarClass] = useState(
    dataCourse?.class?.map((item) => ({
      id: item.id,
      name: item.name,
      jumlah: item.classAsdos.length || 0,
    })) || []
  );

  const handleSubmit = async (data: typeof formData) => {
    setLoading(true);
    try {
      await addCourseClass(data.courseId, data.name)
        .then((res) => {
          if (res.success) {
            setFormData({ courseId: id, name: "" });
            setShowModalAddClass(false);
            setDaftarClass([
              ...daftarClass,
              { id: res.id, name: res.name, jumlah: 0 },
            ]);
            router.refresh();
          } else if (res.error) {
            setError(res.error);
          }
        })
        .catch(() => {
          setError("Terjadi kesalahan");
        })
        .finally(() => {
          setLoading(false);
          setShowModalAddClass(false);
          setTimeout(() => {
            setError("");
          }, 5000);
        });
    } catch (err) {
      setError(`Terjadi kesalahan: ${err}`);
    }
  };

  const handleDeleteClass = async (classId: string) => {
    setLoading(true);
    await deleteClass(classId, id)
      .then((res) => {
        if (res.error) {
          setMessage(res.error);
        } else if (res.success) {
          setMessage(res.success);
          setDaftarClass(daftarClass.filter((item) => item.id !== classId));
        }
      })
      .catch((err) => {
        setMessage(err.message);
      })
      .finally(() => {
        setModalDeleteOpen(false);
        setLoading(false);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });
  };

  // Penanganan jika data tidak ditemukan
  if (!dataCourse) {
    return (
      <div className="min-h-screen p-6 lg:ml-48">
        <div className="max-w-4xl mx-auto">
          <div className={`${theme.card_default}`}>
            <div className={`border-b ${theme.border_outside}`}>
              <h1 className={`text-3xl font-bold ${theme.text_title}`}>
                Detail Mata Kuliah
              </h1>
              <p className={`text-sm ${theme.text_default_blue} mb-6 mt-3`}>
                Data tidak ditemukan
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tampilan utama komponen
  return (
    <>
      <div className="min-h-screen p-6 lg:ml-48">
        {/* Tombol Kembali */}
        <Link href="/admin/matakuliah" className={`${theme.icon_link}`}>
          <ArrowLeft className={`${theme.icon_arrow_left}`} />
          <span>Kembali ke Daftar Mata Kuliah</span>
        </Link>

        {/* Card Detail Mata Kuliah */}
        <div className={`${theme.card_max_4}`}>
          <div className={`${theme.card_default}`}>
            <h1 className={`text-3xl font-bold ${theme.text_title} pb-3 mb-4`}>
              Detail Mata Kuliah
            </h1>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Info title="Kode Mata Kuliah" value={dataCourse.code} />
              <Info title="Nama Mata Kuliah" value={dataCourse.name} />
              <Info
                title="Program Studi"
                value={dataCourse.semester.prodi.name}
              />
              <Info
                title="Semester"
                value={dataCourse.semester.semesterNumber}
              />
              <Info title="SKS" value={dataCourse.sks || "-"} />
              <Info title="Kuota" value={dataCourse.kuota || "-"} />
              <Info
                title="Status"
                value={dataCourse.status === "aktif" ? "Aktif" : "Non-Aktif"}
              />
              <Info
                title="Dibuat"
                value={
                  dataCourse.createdAt
                    ? new Date(dataCourse.createdAt).toLocaleString("id-ID")
                    : "-"
                }
              />
              <Info
                title="Diperbarui"
                value={
                  dataCourse.updatedAt
                    ? new Date(dataCourse.updatedAt).toLocaleString("id-ID")
                    : "-"
                }
              />
            </dl>
          </div>
        </div>

        {/* Card Data Kelas */}
        <div className={`${theme.card_max_4} mt-6`}>
          <div
            className={`bg-white/5 border ${theme.border_outside} rounded-xl overflow-hidden`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`text-xl font-bold ${theme.text_title} pb-3 mb-4 pt-6 pl-6`}
              >
                Data Kelas
              </h2>
              <button
                onClick={() => setShowModalAddClass(true)}
                className={`${theme.button_add}`}
              >
                <Plus />
                Tambah Kelas
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto p-1">
              <table
                className={`min-w-full text-sm text-left ${theme.text_default} border-separate border-spacing-y-1`}
              >
                <thead className={`uppercase ${theme.text_title}`}>
                  <tr>
                    <th
                      className={`px-4 py-3 border-b ${theme.border_table_default}`}
                    >
                      ID
                    </th>
                    <th
                      className={`px-4 py-3 border-b ${theme.border_table_default} text-center`}
                    >
                      Nama Kelas
                    </th>
                    <th
                      className={`px-4 py-3 border-b ${theme.border_table_default} text-center`}
                    >
                      Jumlah Asisten
                    </th>
                    <th
                      className={`px-4 py-3 text-center border-b ${theme.border_table_default}`}
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {daftarClass.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className={`text-center py-4 ${theme.text_default}`}
                      >
                        Belum ada kelas yang terdaftar.
                      </td>
                    </tr>
                  ) : (
                    daftarClass
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((cls) => (
                        <tr
                          key={cls.id}
                          className={`${theme.table_highlight} border ${theme.border_table_default} rounded-md`}
                        >
                          <td
                            className={`px-4 py-3 border-b ${theme.border_table_default}`}
                          >
                            {cls.id}
                          </td>
                          <td
                            className={`px-4 py-3 border-b ${theme.border_table_default} text-center`}
                          >
                            {cls.name}
                          </td>
                          <td
                            className={`px-4 py-3 border-b ${theme.border_table_default} text-center`}
                          >
                            {cls.jumlah || "0"}
                          </td>
                          <td
                            className={`px-4 py-2 text-center space-x-2 border-b whitespace-nowrap overflow-hidden ${theme.border_table_default}`}
                          >
                            <Link href={`/admin/asdos/kelas/detail/${cls.id}`}>
                              <ButtonIcon
                                title="Pantau"
                                className={`${theme.icon_set} hover:${theme.text_default_blue}`}
                                icon={<Eye size={18} />}
                              />
                            </Link>
                            <ButtonIcon
                              title="Hapus"
                              className="hover:text-red-500"
                              onClick={() => {
                                setModalDeleteOpen(true);
                                setSelectedField({
                                  id: cls.id,
                                  name: cls.name,
                                  jumlah: cls.jumlah,
                                });
                              }}
                              icon={<Trash2 size={18} />}
                            />
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalForm
        handleSubmit={() => handleSubmit(formData)}
        showModalForm={showModalAddClass}
        closeModalForm={() => setShowModalAddClass(false)}
        title="Tambah Kelas Matkul"
        isLoading={loading}
        error={error}
        isFormValid={
          formData.courseId !== undefined && formData.name !== undefined
        }
      >
        <div>
          <label
            className={`block text-sm font-medium ${theme.text_title} mb-1`}
          >
            Nama Kelas <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Masukan Nama Kelas"
              required
              name="kelas"
              className={`${theme.highlight_filter}`}
            />
          </div>
        </div>
      </ModalForm>

      <ModalConfirm
        handleClose={() => setModalDeleteOpen(false)}
        handleConfirm={() => handleDeleteClass(selectedField.id)}
        isOpen={modalDeleteOpen}
        loading={loading}
        title="Hapus matakuliah ini?"
        message={`Apakah Anda yakin ingin menghapus ${selectedField.name}?`}
      />
    </>
  );
}
